# 📝 CVMatcher: Smart and Decentralized Resume

The objective is to create an intelligent platform that generates a personalized resume tailored to a specific job, using artificial intelligence, user data (original resume, LinkedIn, GitHub, etc.), and decentralized technologies to ensure data security, autonomy, and permanence.

⸻

### How it works

#### Data Input
The user provides:
- Their original resume (via upload or guided form).
- A link or description of the job they’re applying for.
- (Optional) Connects accounts (via API or scraping):
- LinkedIn: to import experience, recommendations, certifications.
- GitHub: to import projects, contributions, technologies used.

### AI Processing
- An AI agent analyzes the resume and the job posting.
- Generates a customized version of the resume tailored to the role (highlighting keywords, most relevant experiences, etc.).
- Suggests improvements and/or missing fields (e.g., recommended courses, missing keywords).

### Extra Features
- Suggestions for projects or summaries to highlight based on GitHub data.
- Automatic import of relevant public information.
- Option to save multiple resume versions for different job types.

⸻

### Decentralized Layer – Blockchain Use

In traditional systems, user data (resumes, application history, adapted versions) is stored in the company’s database. If the company shuts down (like Orkut, MSN, etc.), the user loses all their data.

#### Proposed Solution: 
Use a public or private blockchain to store the most important information in a decentralized way, ensuring:
- Data Ownership: users remain the owners of their resumes and history.
- Guaranteed Access: even if the company/platform ceases to exist, the data remains accessible via the blockchain.
- Transparency & Trust: each resume update can be recorded, creating an immutable version history (which can even serve as a career portfolio).

#### Possibilities:
- Use IPFS + blockchain to store documents with metadata.
- Create an NFT as a professional identity (optional), pointing to the adapted and updated resume.
- Ensure privacy through encryption and user-controlled access.



# Features to add/improve

- Buttom to choose the language
- Check how to have input files with open ai (https://stackoverflow.com/questions/77469097/how-can-i-process-a-pdf-using-openais-apis-gpts)
- Response pdf to download
- Request to Github is not working yet
- Verify blockchain part IFPS

# Demo - version 1

![Demo](https://github.com/letpires/CVMatcher/blob/main/demo_version1.gif)
