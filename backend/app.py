from flask import Flask, request, jsonify, make_response, redirect, session
from flask_cors import CORS
import os
from datetime import datetime
import uuid
import logging
from resume_analyzer import analyze_resume_and_job
from dotenv import load_dotenv
import json
from urllib.parse import urlencode
import requests

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
logger.debug(f"OPENAI_API_KEY loaded: {'OPENAI_API_KEY' in os.environ}")

app = Flask(__name__)
# Configure CORS to allow requests from frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Storage paths
STORAGE_PATH = os.path.join(os.path.dirname(__file__), 'storage')
CV_STORAGE = os.path.join(STORAGE_PATH, 'cv')
JOB_STORAGE = os.path.join(STORAGE_PATH, 'job')
HISTORY_STORAGE = os.path.join(STORAGE_PATH, 'history')  # New storage for CV history

# Ensure storage directories exist
os.makedirs(CV_STORAGE, exist_ok=True)
os.makedirs(JOB_STORAGE, exist_ok=True)
os.makedirs(HISTORY_STORAGE, exist_ok=True)  # Create history directory

def create_json_response(data, status_code=200):
    """Create a Flask response with JSON content type."""
    response = jsonify(data)
    response.status_code = status_code
    return response

def read_latest_files():
    """Read the most recent CV and job listing files."""
    try:
        # Get the most recent CV file
        cv_files = os.listdir(CV_STORAGE)
        cv_files.sort(reverse=True)
        cv_content = ""
        if cv_files:
            with open(os.path.join(CV_STORAGE, cv_files[0]), 'r') as f:
                cv_content = f.read()

        # Get the most recent job listing file
        job_files = os.listdir(JOB_STORAGE)
        job_files.sort(reverse=True)
        job_content = ""
        if job_files:
            with open(os.path.join(JOB_STORAGE, job_files[0]), 'r') as f:
                job_content = f.read()

        return cv_content, job_content
    except Exception as e:
        logger.error(f"Error reading files: {str(e)}")
        return "", ""

def save_text_data(text, storage_path):
    """Save text data to a file with timestamp and UUID."""
    try:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        file_id = str(uuid.uuid4())[:8]
        filename = f"{timestamp}_{file_id}.txt"
        file_path = os.path.join(storage_path, filename)
        
        logger.debug(f"Attempting to save file: {file_path}")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(text)
        
        logger.debug(f"Successfully saved file: {file_path}")
        return filename
    except Exception as e:
        logger.error(f"Error saving file: {str(e)}")
        raise

def save_cv_history(cv_data):
    """Save CV generation history."""
    try:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        history_id = str(uuid.uuid4())
        
        history_entry = {
            'id': history_id,
            'timestamp': datetime.now().isoformat(),
            'data': cv_data
        }
        
        filename = f"{timestamp}_{history_id[:8]}.json"
        file_path = os.path.join(HISTORY_STORAGE, filename)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(history_entry, f, indent=2)
            
        return history_entry
        
    except Exception as e:
        logger.error(f"Error saving CV history: {str(e)}")
        raise

def get_cv_history(limit=10):
    """Get the most recent CV generations."""
    try:
        history_files = os.listdir(HISTORY_STORAGE)
        history_files.sort(reverse=True)  # Sort by timestamp (newest first)
        
        history = []
        for filename in history_files[:limit]:
            file_path = os.path.join(HISTORY_STORAGE, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                history.append(json.load(f))
                
        return history
        
    except Exception as e:
        logger.error(f"Error reading CV history: {str(e)}")
        return []

@app.route('/api/cv', methods=['POST'])
def upload_cv():
    try:
        logger.debug(f"Received CV upload request. Form data: {request.form}")
        logger.debug(f"Files: {request.files}")
        
        if not request.form and not request.files:
            logger.error("No form data or files received")
            return create_json_response({'error': 'No content provided'}, 400)

        if 'text' in request.form:
            text = request.form['text']
            if not text.strip():
                return create_json_response({'error': 'Text content is empty'}, 400)
                
            logger.debug(f"Received CV text of length: {len(text)}")
            filename = save_text_data(text, CV_STORAGE)
            return create_json_response({
                'message': 'CV text saved successfully',
                'filename': filename
            })
        
        return create_json_response({'error': 'File upload not implemented yet'}, 501)

    except Exception as e:
        logger.error(f"Error in upload_cv: {str(e)}")
        return create_json_response({'error': str(e)}, 500)

@app.route('/api/job-listing', methods=['POST'])
def upload_job():
    try:
        logger.debug(f"Received job listing upload request. Form data: {request.form}")
        logger.debug(f"Files: {request.files}")
        
        if not request.form and not request.files:
            logger.error("No form data or files received")
            return create_json_response({'error': 'No content provided'}, 400)

        if 'text' in request.form:
            text = request.form['text']
            if not text.strip():
                return create_json_response({'error': 'Text content is empty'}, 400)
                
            logger.debug(f"Received job listing text of length: {len(text)}")
            filename = save_text_data(text, JOB_STORAGE)
            return create_json_response({
                'message': 'Job listing text saved successfully',
                'filename': filename
            })
        
        return create_json_response({'error': 'File upload not implemented yet'}, 501)

    except Exception as e:
        logger.error(f"Error in upload_job: {str(e)}")
        return create_json_response({'error': str(e)}, 500)

@app.route('/api/cv-history', methods=['GET'])
def get_history():
    """Endpoint to retrieve CV generation history."""
    try:
        limit = request.args.get('limit', default=10, type=int)
        history = get_cv_history(limit=limit)
        return create_json_response({
            'message': 'CV history retrieved successfully',
            'history': history
        })
    except Exception as e:
        logger.error(f"Error retrieving CV history: {str(e)}")
        return create_json_response({'error': str(e)}, 500)

@app.route('/api/analyze', methods=['POST'])
def analyze_cv():
    try:
        logger.debug("Received CV analysis request")
        
        # Check if OpenAI API key is set
        if not os.getenv('OPENAI_API_KEY'):
            logger.error("OpenAI API key not found")
            return create_json_response({
                'error': 'OpenAI API key not found. Please set up your API key in the .env file.'
            }, 500)
        
        # Get request data
        data = request.get_json() or {}
        use_sample_data = data.get('use_sample_data', False)
        
        if not use_sample_data:
            # Get the latest CV and job listing
            cv_content, job_content = read_latest_files()
            
            if not cv_content:
                return create_json_response({
                    'error': 'No CV found. Please upload a CV first.'
                }, 400)
            
            if not job_content:
                return create_json_response({
                    'error': 'No job listing found. Please upload a job listing first.'
                }, 400)
        
        # Get optional parameters
        github_username = data.get('github_username')
        linkedin_url = data.get('linkedin_url')

        # Generate the analysis using the resume analyzer
        try:
            result = analyze_resume_and_job(
                resume=cv_content if not use_sample_data else "",
                job_description=job_content if not use_sample_data else "",
                github_username=github_username,
                linkedin_url=linkedin_url,
                use_sample_data=use_sample_data
            )
            
            if result.get('status') == 'error':
                logger.error(f"Analysis error: {result.get('error')}")
                return create_json_response({
                    'error': result.get('error', 'Unknown error occurred during analysis')
                }, 500)

            # Save to history if analysis was successful
            history_entry = save_cv_history(result)
            
            return create_json_response({
                'message': 'Analysis completed successfully',
                'data': result,
                'history_id': history_entry['id']
            })

        except Exception as analysis_error:
            logger.error(f"Error in resume analysis: {str(analysis_error)}")
            return create_json_response({
                'error': f"Analysis failed: {str(analysis_error)}"
            }, 500)

    except Exception as e:
        logger.error(f"Error in analyze_cv: {str(e)}")
        return create_json_response({'error': str(e)}, 500)

@app.route("/api/linkedin/auth")
def linkedin_auth():
    """Redirect user to LinkedIn for OAuth2 authorization."""
    client_id = os.getenv("LINKEDIN_CLIENT_ID")
    redirect_uri = os.getenv("LINKEDIN_REDIRECT_URI")
    scope = "r_liteprofile r_emailaddress"
    state = str(uuid.uuid4())
    session["linkedin_oauth_state"] = state

    params = {
        "response_type": "code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "scope": scope,
        "state": state,
    }
    auth_url = "https://www.linkedin.com/oauth/v2/authorization?" + urlencode(params)
    return redirect(auth_url)

@app.route("/api/linkedin/callback")
def linkedin_callback():
    """Handle LinkedIn OAuth2 callback, exchange code for access token."""
    code = request.args.get("code")
    state = request.args.get("state")
    if state != session.get("linkedin_oauth_state"):
        return jsonify({"error": "Invalid state"}), 400

    token_url = "https://www.linkedin.com/oauth/v2/accessToken"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": os.getenv("LINKEDIN_REDIRECT_URI"),
        "client_id": os.getenv("LINKEDIN_CLIENT_ID"),
        "client_secret": os.getenv("LINKEDIN_CLIENT_SECRET"),
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    resp = requests.post(token_url, data=data, headers=headers)
    token_data = resp.json()
    access_token = token_data.get("access_token")

    # store in session or return to frontend
    session["LINKEDIN_ACCESS_TOKEN"] = access_token
    return jsonify({"access_token": access_token})

@app.after_request
def after_request(response):
    """Ensure all responses have the correct content type."""
    if not response.headers.get('Content-Type'):
        response.headers['Content-Type'] = 'application/json'
    logger.debug(f"Response status: {response.status}")
    logger.debug(f"Response headers: {dict(response.headers)}")
    logger.debug(f"Response data: {response.get_data(as_text=True)}")
    return response

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(debug=True, port=5001)