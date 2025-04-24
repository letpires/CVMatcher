from typing import Dict, List, Optional, TypedDict, Annotated
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langgraph.graph import StateGraph, END
import requests
import json
from datetime import datetime
import os

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4-turbo-preview")


# Uncomment the following lines to use Venice API
# llm = ChatOpenAI(
#     model="gpt-4-turbo-preview",
#     openai_api_key=os.getenv("VENICE_API_KEY"),
#     openai_api_base="https://api.venice.ai/v1"  # Venice endpoint
# )

# Define the state type
class ResumeState(TypedDict):
    resume: str
    job_description: str
    github_username: Optional[str]
    linkedin_url: Optional[str]
    github_data: Dict
    linkedin_data: Dict
    analysis: str
    tailored_resume: str
    recommendations: str
    version_history: List[Dict]
    ipfs_hash: str

def get_github_projects(state: ResumeState) -> ResumeState:
    """Fetch GitHub projects and contributions for a user."""
    if not state['github_username']:
        state['github_data'] = {}
        return state
    
    try:
        response = requests.get(f"https://api.github.com/users/{state['github_username']}/repos")
        if response.status_code == 200:
            repos = response.json()
            state['github_data'] = {
                "projects": [{
                    "name": repo["name"],
                    "description": repo["description"],
                    "language": repo["language"],
                    "stars": repo["stargazers_count"]
                } for repo in repos]
            }
        else:
            state['github_data'] = {"error": "Failed to fetch GitHub data"}
    except Exception as e:
        state['github_data'] = {"error": str(e)}
    
    return state

def summarize_linkedin_data(state: ResumeState) -> ResumeState:
    access_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    # bail out if no URL or no token
    if not state['linkedin_url'] or not access_token:
        state['linkedin_data'] = {}
        return state

    headers = {
        "Authorization": f"Bearer {access_token}",
        "X-Restli-Protocol-Version": "2.0.0"
    }

    # 1) Basic profile
    profile_resp = requests.get(
        "https://api.linkedin.com/v2/me",
        headers=headers
    )
    profile = profile_resp.json()

    # 2) Email address
    email_resp = requests.get(
        "https://api.linkedin.com/v2/emailAddress"
        "?q=members&projection=(elements*(handle~))",
        headers=headers
    )
    email = email_resp.json()

    # 3) (Optional) Positions / experience
    positions_resp = requests.get(
        "https://api.linkedin.com/v2/positions",
        headers=headers
    )
    positions = positions_resp.json()

    # 4) Education history
    edu_resp = requests.get(
        "https://api.linkedin.com/v2/educationHistory"
        "?q=members&projection=(elements*(schoolName,degree,fieldOfStudy,startDate,endDate))",
        headers=headers
    )
    educations = edu_resp.json()

    # 5) Skills
    skills_resp = requests.get(
        "https://api.linkedin.com/v2/skills"
        "?q=members&projection=(elements*(name,proficiency))",
        headers=headers
    )
    skills = skills_resp.json()

    # 6) Recommendations received
    recs_resp = requests.get(
        "https://api.linkedin.com/v2/recommendationsReceived"
        "?q=recipient&projection=(elements*(recommendationText,recommender~(firstName,lastName,profilePicture)))",
        headers=headers
    )
    recs = recs_resp.json()

    state['linkedin_data'] = {
        "id": profile.get("id"),
        "firstName": profile.get("localizedFirstName"),
        "lastName": profile.get("localizedLastName"),
        "headline": profile.get("headline"),
        "email": email["elements"][0]["handle~"]["emailAddress"],
        "positions": positions.get("elements", []),
        "education": educations.get("elements", []),
        "skills": skills.get("elements", []),
        "recommendations": recs.get("elements", []),
    }
    return state

def compare_resume_with_job(state: ResumeState) -> ResumeState:
    """Compare resume with job description and identify matches and gaps."""
    analysis_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert resume analyzer. Analyze the resume and job description to identify:
        1. Key skills and experiences that match the job requirements
        2. Missing skills or experiences
        3. Areas for improvement
        
        Consider any GitHub projects and LinkedIn data if available.
        Format your response with clear sections and bullet points.
        """),
        ("human", """Resume: {resume}
        Job Description: {job_description}
        GitHub Data: {github_data}
        LinkedIn Data: {linkedin_data}""")
    ])
    
    chain = analysis_prompt | llm | StrOutputParser()
    state['analysis'] = chain.invoke({
        "resume": state['resume'],
        "job_description": state['job_description'],
        "github_data": json.dumps(state['github_data'], indent=2),
        "linkedin_data": json.dumps(state['linkedin_data'], indent=2)
    })
    return state

def generate_tailored_resume(state: ResumeState) -> ResumeState:
    """Generate a tailored version of the resume incorporating all data sources."""
    tailored_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert resume writer. Create a tailored version of the resume that:
        1. Highlights relevant experiences and skills
        2. Uses keywords from the job description
        3. Maintains professional formatting
        4. Emphasizes achievements and quantifiable results
        5. Incorporates relevant projects and experiences
        
        Format the resume professionally with clear sections.
        """),
        ("human", """Original Resume: {resume}
        Job Description: {job_description}
        Analysis: {analysis}
        GitHub Data: {github_data}
        LinkedIn Data: {linkedin_data}""")
    ])
    
    chain = tailored_prompt | llm | StrOutputParser()
    state['tailored_resume'] = chain.invoke({
        "resume": state['resume'],
        "job_description": state['job_description'],
        "analysis": state['analysis'],
        "github_data": json.dumps(state['github_data'], indent=2),
        "linkedin_data": json.dumps(state['linkedin_data'], indent=2)
    })
    return state

def generate_recommendations(state: ResumeState) -> ResumeState:
    """Generate specific recommendations for improvement."""
    recommendations_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a career advisor. Based on the analysis, provide:
        1. Specific courses or certifications to pursue
        2. Technologies to learn
        3. Projects to undertake
        4. Skills to develop
        5. Other actionable recommendations
        
        Format your response with clear sections and bullet points.
        Be specific and provide links to resources where possible.
        """),
        ("human", """Resume: {resume}
        Job Description: {job_description}
        Analysis: {analysis}""")
    ])
    
    chain = recommendations_prompt | llm | StrOutputParser()
    state['recommendations'] = chain.invoke({
        "resume": state['resume'],
        "job_description": state['job_description'],
        "analysis": state['analysis']
    })
    return state

def push_to_ipfs(state: ResumeState) -> ResumeState:
    """Push data to IPFS and return the hash."""
    # Note: This is a placeholder. In a real implementation, you'd need an IPFS client
    state['ipfs_hash'] = f"ipfs_hash_{datetime.now().timestamp()}"
    return state

def save_version_history(state: ResumeState) -> ResumeState:
    """Save the current version to history."""
    state['version_history'].append({
        "timestamp": datetime.now().isoformat(),
        "resume": state['resume'],
        "job_description": state['job_description'],
        "analysis": state['analysis'],
        "ipfs_hash": state['ipfs_hash']
    })
    return state

# Define the workflow
def create_resume_analyzer_workflow() -> StateGraph:
    # Create the graph
    workflow = StateGraph(ResumeState)

    # Add nodes
    workflow.add_node("fetch_github", get_github_projects)
    workflow.add_node("fetch_linkedin", summarize_linkedin_data)
    workflow.add_node("analyze", compare_resume_with_job)
    workflow.add_node("tailor", generate_tailored_resume)
    workflow.add_node("recommend", generate_recommendations)
    workflow.add_node("push_ipfs", push_to_ipfs)
    workflow.add_node("save_history", save_version_history)

    # Add edges
    workflow.add_edge("fetch_github", "fetch_linkedin")
    workflow.add_edge("fetch_linkedin", "analyze")
    workflow.add_edge("analyze", "tailor")
    workflow.add_edge("tailor", "recommend")
    workflow.add_edge("recommend", "push_ipfs")
    workflow.add_edge("push_ipfs", "save_history")
    workflow.add_edge("save_history", END)

    # Set entry point
    workflow.set_entry_point("fetch_github")

    return workflow

# Create the workflow
workflow = create_resume_analyzer_workflow()
app = workflow.compile()

def analyze_resume_and_job(resume: str, job_description: str, github_username: str = None, linkedin_url: str = None) -> Dict:
    """Main function to analyze resume and job description."""
    # Initialize state
    state = {
        "resume": resume,
        "job_description": job_description,
        "github_username": github_username,
        "linkedin_url": linkedin_url,
        "github_data": {},
        "linkedin_data": {},
        "analysis": "",
        "tailored_resume": "",
        "recommendations": "",
        "version_history": [],
        "ipfs_hash": ""
    }

    # Run the workflow
    result = app.invoke(state)

    return {
        "analysis": result["analysis"],
        "tailored_resume": result["tailored_resume"],
        "recommendations": result["recommendations"],
        "ipfs_hash": result["ipfs_hash"],
        "version_history": result["version_history"]
    }