# IIIT Nagpur Student Grievance Portal - Backend

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/CodewithNishchal/student_grievance_port.git
cd student_grievance_port/backend
```

### 2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Setup credentials
```bash
# Copy the example environment file
cp .env.example .env

# Add your credentials to .env:
# - GROQ_API_KEY (get from https://console.groq.com)
# - GOOGLE_APPLICATION_CREDENTIALS path

# Create credentials folder
mkdir -p credentials
# Place your service_account.json in credentials/ folder (NOT in git)
```

### 5. Run the server
```bash
python complain_safe.py
```

The server will start on `http://localhost:5000`

## API Endpoints

- `GET /` - Health check
- `GET /health` - Server status
- `POST /process` - Process complaint
- `GET /complaints` - List all complaints
- `GET /complaints/<id>` - Get specific complaint
- `POST /dialogflow/message` - Chatbot endpoint

## Important Security Notes

⚠️ **NEVER commit the following files:**
- `service_account.json` (contains private keys)
- `.env` (contains API keys)
- `config.py` (local configuration)
- `complain.py` (original file with hardcoded paths)

These files are listed in `.gitignore` and should be kept locally only.
