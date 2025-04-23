from typing import Dict, List, Optional, TypedDict
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from datetime import datetime
import os
from dotenv import load_dotenv
import requests
import json

# Load environment variables
load_dotenv()

# Validate OpenAI API key
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.")

# Initialize the LLM
try:
    llm = ChatOpenAI(
        model="gpt-4-turbo-preview",
        api_key=api_key
    )
except Exception as e:
    raise ValueError(f"Failed to initialize ChatOpenAI: {str(e)}")

def get_sample_data() -> Dict:
    """Return sample resume and job description data for testing."""
    return {
        "resume": """
JOHN DOE
Software Engineer
email: john.doe@email.com
phone: (555) 123-4567

EXPERIENCE
Senior Software Engineer | Tech Corp (2020-Present)
- Led development of cloud-based applications using Python and React
- Implemented CI/CD pipelines reducing deployment time by 50%
- Mentored junior developers and conducted code reviews

Software Developer | StartUp Inc (2018-2020)
- Developed RESTful APIs using Flask and PostgreSQL
- Improved application performance by 40% through optimization
- Collaborated with cross-functional teams on Agile projects

SKILLS
- Languages: Python, JavaScript, SQL
- Frameworks: React, Flask, Django
- Tools: Git, Docker, AWS
- Soft Skills: Team Leadership, Problem Solving

EDUCATION
B.S. Computer Science | Tech University (2018)
        """,
        "job_description": """
Senior Full Stack Developer

We are seeking a skilled Senior Full Stack Developer to join our growing team. The ideal candidate will have:

Required Skills:
- 5+ years experience in web development
- Strong proficiency in Python and JavaScript
- Experience with React or similar frontend frameworks
- Database design and optimization experience
- Knowledge of cloud platforms (AWS/Azure/GCP)

Responsibilities:
- Develop and maintain web applications
- Lead technical projects and mentor junior developers
- Implement best practices for code quality and testing
- Collaborate with product and design teams

Nice to have:
- Experience with DevOps and CI/CD
- Knowledge of microservices architecture
- Agile development experience
        """,
        "github_username": "johndoe"
    }

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

def get_github_projects(github_username: Optional[str]) -> Dict:
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

def analyze_resume_and_job(resume: str = "", job_description: str = "", github_username: Optional[str] = None, linkedin_url: Optional[str] = None, use_sample_data: bool = False) -> Dict:
    """
    Analyze a resume against a job description and provide tailored feedback using LangChain.
    If use_sample_data is True, it will use hardcoded sample data for testing.
    """
    try:
        # Use sample data if specified
        if use_sample_data:
            sample_data = get_sample_data()
            resume = sample_data["resume"]
            job_description = sample_data["job_description"]
            github_username = sample_data["github_username"]

        # Ensure we have the required data
        if not resume or not job_description:
            raise ValueError("Resume and job description are required")

        # Fetch GitHub data if username provided
        github_data = get_github_projects(github_username)
        
        # Initialize state
        state = ResumeState(
            resume=resume,
            job_description=job_description,
            github_username=github_username,
            linkedin_url=linkedin_url,
            github_data=github_data,
            linkedin_data={},  # Placeholder for LinkedIn data
            analysis="",
            tailored_resume="",
            recommendations=""
        )

        # Step 1: Analyze the match
        analysis_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert resume analyzer. Analyze the resume and job description to identify:
            1. Key skills and experiences that match the job requirements
            2. Missing skills or experiences
            3. Overall match percentage
            4. Areas for improvement
            
            Consider any GitHub projects if available.
            Format your response with clear sections and bullet points."""),
            ("human", """Resume: {resume}
            Job Description: {job_description}
            GitHub Data: {github_data}""")
        ])
        
        analysis_chain = analysis_prompt | llm | StrOutputParser()
        state["analysis"] = analysis_chain.invoke({
            "resume": state["resume"],
            "job_description": state["job_description"],
            "github_data": json.dumps(state["github_data"], indent=2)
        })

        # Step 2: Generate tailored resume
        tailoring_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert resume writer. Create a tailored version of the resume that:
            1. Highlights relevant experiences and skills
            2. Uses keywords from the job description
            3. Quantifies achievements where possible
            4. Maintains professional formatting
            5. Emphasizes the most relevant qualifications
            
            Format the resume in a clean, professional style."""),
            ("human", """Original Resume: {resume}
            Job Description: {job_description}
            Analysis: {analysis}
            GitHub Data: {github_data}""")
        ])
        
        tailoring_chain = tailoring_prompt | llm | StrOutputParser()
        state["tailored_resume"] = tailoring_chain.invoke({
            "resume": state["resume"],
            "job_description": state["job_description"],
            "analysis": state["analysis"],
            "github_data": json.dumps(state["github_data"], indent=2)
        })

        # Step 3: Generate recommendations
        recommendations_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a career development advisor. Based on the analysis, provide:
            1. Specific skills to develop
            2. Certifications or courses that would be valuable
            3. Projects or experiences to pursue
            4. Tips for interview preparation
            5. Suggestions for resume improvement
            
            Make recommendations specific and actionable."""),
            ("human", """Resume: {resume}
            Job Description: {job_description}
            Analysis: {analysis}""")
        ])
        
        recommendations_chain = recommendations_prompt | llm | StrOutputParser()
        state["recommendations"] = recommendations_chain.invoke({
            "resume": state["resume"],
            "job_description": state["job_description"],
            "analysis": state["analysis"]
        })

        # Return the results
        return {
            "analysis": state["analysis"],
            "tailored_resume": state["tailored_resume"],
            "recommendations": state["recommendations"],
            "timestamp": datetime.now().isoformat(),
            "status": "success"
        }

    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        } 