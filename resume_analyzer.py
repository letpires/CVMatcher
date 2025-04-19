from typing import Dict, List, Optional
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import requests
import json
from datetime import datetime

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4-turbo-preview")

def get_github_projects(github_username: Optional[str] = None) -> Dict:
    """Fetch GitHub projects and contributions for a user."""
    if not github_username:
        return {}
    
    try:
        response = requests.get(f"https://api.github.com/users/{github_username}/repos")
        if response.status_code == 200:
            repos = response.json()
            return {
                "projects": [{
                    "name": repo["name"],
                    "description": repo["description"],
                    "language": repo["language"],
                    "stars": repo["stargazers_count"]
                } for repo in repos]
            }
        else:
            return {"error": "Failed to fetch GitHub data"}
    except Exception as e:
        return {"error": str(e)}

def analyze_resume(resume: str, job_description: str, github_data: Dict = None, linkedin_data: Dict = None) -> Dict:
    """Analyze resume and job description using LangChain."""
    
    # Analysis Chain
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
    
    analysis_chain = analysis_prompt | llm | StrOutputParser()
    
    # Tailored Resume Chain
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
    
    tailored_chain = tailored_prompt | llm | StrOutputParser()
    
    # Recommendations Chain
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
    
    recommendations_chain = recommendations_prompt | llm | StrOutputParser()
    
    # Execute chains
    analysis = analysis_chain.invoke({
        "resume": resume,
        "job_description": job_description,
        "github_data": json.dumps(github_data, indent=2) if github_data else "No GitHub data provided",
        "linkedin_data": json.dumps(linkedin_data, indent=2) if linkedin_data else "No LinkedIn data provided"
    })
    
    tailored_resume = tailored_chain.invoke({
        "resume": resume,
        "job_description": job_description,
        "analysis": analysis,
        "github_data": json.dumps(github_data, indent=2) if github_data else "No GitHub data provided",
        "linkedin_data": json.dumps(linkedin_data, indent=2) if linkedin_data else "No LinkedIn data provided"
    })
    
    recommendations = recommendations_chain.invoke({
        "resume": resume,
        "job_description": job_description,
        "analysis": analysis
    })
    
    return {
        "analysis": analysis,
        "tailored_resume": tailored_resume,
        "recommendations": recommendations
    }

def summarize_linkedin_data(state: Dict) -> Dict:
    """Summarize LinkedIn profile data."""
    # Note: This is a placeholder. In a real implementation, you'd need LinkedIn API access
    state['linkedin_data'] = {
        "experience": "Senior Software Engineer at Company X",
        "skills": ["Python", "Machine Learning", "Data Science"],
        "education": "BS in Computer Science"
    }
    return state

def compare_resume_with_job(state: Dict) -> Dict:
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

def generate_tailored_resume(state: Dict) -> Dict:
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

def generate_recommendations(state: Dict) -> Dict:
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

def push_to_ipfs(state: Dict) -> Dict:
    """Push data to IPFS and return the hash."""
    # Note: This is a placeholder. In a real implementation, you'd need an IPFS client
    state['ipfs_hash'] = f"ipfs_hash_{datetime.now().timestamp()}"
    return state

def save_version_history(state: Dict) -> Dict:
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
def create_resume_analyzer_workflow() -> Dict:
    # Create the graph
    workflow = {
        "fetch_github": get_github_projects,
        "fetch_linkedin": summarize_linkedin_data,
        "analyze": compare_resume_with_job,
        "tailor": generate_tailored_resume,
        "recommend": generate_recommendations,
        "push_ipfs": push_to_ipfs,
        "save_history": save_version_history
    }

    # Set entry point
    entry_point = "fetch_github"

    return workflow, entry_point

# Create the workflow
workflow, entry_point = create_resume_analyzer_workflow()

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
    result = analyze_resume(resume, job_description, state['github_data'], state['linkedin_data'])

    return {
        "analysis": result["analysis"],
        "tailored_resume": result["tailored_resume"],
        "recommendations": result["recommendations"],
        "ipfs_hash": state['ipfs_hash'],
        "version_history": state['version_history']
    } 