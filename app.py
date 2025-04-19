import streamlit as st
from dotenv import load_dotenv
from resume_analyzer import analyze_resume, get_github_projects

# Load environment variables
load_dotenv()

# Streamlit UI
st.title("AI Resume Optimizer")
st.write("Upload your resume and job description to get personalized recommendations")

# Input fields
resume = st.text_area("Paste your resume here:", height=300)
job_description = st.text_area("Paste the job description here:", height=300)
github_username = st.text_input("GitHub Username (optional):")
linkedin_url = st.text_input("LinkedIn Profile URL (optional):")

if st.button("Analyze"):
    if resume and job_description:
        with st.spinner("Analyzing your resume and job description..."):
            # Get GitHub data if username provided
            github_data = get_github_projects(github_username) if github_username else None
            
            # For now, LinkedIn data is just a placeholder
            linkedin_data = {"url": linkedin_url} if linkedin_url else None
            
            # Analyze resume
            result = analyze_resume(
                resume=resume,
                job_description=job_description,
                github_data=github_data,
                linkedin_data=linkedin_data
            )
            
            # Display results in tabs
            tab1, tab2, tab3 = st.tabs([
                "Analysis", 
                "Tailored Resume", 
                "Recommendations"
            ])
            
            with tab1:
                st.subheader("Resume Analysis")
                st.write(result["analysis"])
            
            with tab2:
                st.subheader("Tailored Resume")
                st.write(result["tailored_resume"])
                
                # Add a download button for the tailored resume
                st.download_button(
                    label="Download Tailored Resume",
                    data=result["tailored_resume"],
                    file_name="tailored_resume.txt",
                    mime="text/plain"
                )
            
            with tab3:
                st.subheader("Career Development Recommendations")
                st.write(result["recommendations"])
    else:
        st.error("Please provide both your resume and job description.") 