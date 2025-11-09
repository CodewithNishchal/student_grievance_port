import os
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set. Check your .env file!")

STORAGE_FILE = os.path.join(os.path.dirname(__file__), "complaints_store.json")

DEPARTMENTS = [
    "Drinking Water",
    "Network & IT",
    "Housekeeping",
    "Maintenance",
    "Transport",
    "Mess & Dining",
    "Accounts / Fee Office",
    "Academics / Registrar",
    "Library",
    "Hostel Office / Residence Life"
]

DEPARTMENT_CONTACTS = {
    "Drinking Water": "water@iiit-nagpur.ac.in",
    "Network & IT": "it@iiit-nagpur.ac.in",
    "Housekeeping": "housekeeping@iiit-nagpur.ac.in",
    "Maintenance": "maintenance@iiit-nagpur.ac.in",
    "Transport": "transport@iiit-nagpur.ac.in",
    "Mess & Dining": "mess@iiit-nagpur.ac.in",
    "Accounts / Fee Office": "accounts@iiit-nagpur.ac.in",
    "Academics / Registrar": "academics@iiit-nagpur.ac.in",
    "Library": "library@iiit-nagpur.ac.in",
    "Hostel Office / Residence Life": "hostel@iiit-nagpur.ac.in"
}
