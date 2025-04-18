from typing import Dict
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4-turbo-preview")

def analyze_resume_and_job(resume: str, job_description: str) -> Dict:
    """Analyze resume and job description using LangChain."""
    
    # Create analysis chain
    analysis_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert resume analyzer. Analyze the resume and job description to identify:
        1. Key skills and experiences that match the job requirements
        2. Missing skills or experiences
        3. Areas for improvement
        """),
        ("user", "Resume: {resume}\n\nJob Description: {job_description}")
    ])
    analysis_chain = analysis_prompt | llm | StrOutputParser()
    
    # Create tailored resume chain
    tailored_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert resume writer. Create a tailored version of the resume that:
        1. Highlights relevant experiences and skills
        2. Uses keywords from the job description
        3. Maintains professional formatting
        """),
        ("user", "Original Resume: {resume}\n\nJob Description: {job_description}")
    ])
    tailored_chain = tailored_prompt | llm | StrOutputParser()
    
    # Create recommendations chain
    recommendations_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a career advisor. Based on the analysis, provide:
        1. Specific courses or certifications to pursue
        2. Technologies to learn
        3. Projects to undertake
        4. Other actionable recommendations
        """),
        ("user", "Resume: {resume}\n\nJob Description: {job_description}")
    ])
    recommendations_chain = recommendations_prompt | llm | StrOutputParser()
    
    # Run all chains
    analysis = analysis_chain.invoke({"resume": resume, "job_description": job_description})
    tailored_resume = tailored_chain.invoke({"resume": resume, "job_description": job_description})
    recommendations = recommendations_chain.invoke({"resume": resume, "job_description": job_description})
    
    return {
        "analysis": analysis,
        "tailored_resume": tailored_resume,
        "recommendations": recommendations
    } 