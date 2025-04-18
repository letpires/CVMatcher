import streamlit as st
from dotenv import load_dotenv
from resume_analyzer import analyze_resume_and_job

# Load environment variables
load_dotenv()

# Streamlit UI
st.title("AI Resume Optimizer")
st.write("Upload your resume and job description to get personalized recommendations")

# Input fields
resume = st.text_area("Paste your resume here:", height=300)
job_description = st.text_area("Paste the job description here:", height=300)

if st.button("Analyze"):
    if resume and job_description:
        with st.spinner("Analyzing your resume and job description..."):
            result = analyze_resume_and_job(resume, job_description)
            
            # Display results in tabs
            tab1, tab2, tab3 = st.tabs(["Analysis", "Tailored Resume", "Recommendations"])
            
            with tab1:
                st.subheader("Resume Analysis")
                st.write(result["analysis"])
            
            with tab2:
                st.subheader("Tailored Resume")
                st.write(result["tailored_resume"])
            
            with tab3:
                st.subheader("Recommendations")
                st.write(result["recommendations"])
    else:
        st.error("Please provide both your resume and job description.") 