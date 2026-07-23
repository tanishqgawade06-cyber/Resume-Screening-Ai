from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
from io import BytesIO
from nlp_engine import calculate_match, extract_missing_skills

app = FastAPI()

# Configured for production cross-origin resource sharing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows your future Vercel/Netlify URL to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/screen")
async def screen_resume(file: UploadFile = File(...), job_description: str = Form(...)):
    try:
        # Read the uploaded file into memory (no need to save to disk)
        file_bytes = await file.read()
        resume_text = ""
        
        # Extract text if it's a PDF
        if file.filename.lower().endswith(".pdf"):
            pdf_reader = PyPDF2.PdfReader(BytesIO(file_bytes))
            for page in pdf_reader.pages:
                extracted = page.extract_text()
                if extracted:
                    resume_text += extracted + " "
        else:
            # Fallback for plain text files
            resume_text = file_bytes.decode('utf-8', errors='ignore')
            
        # Execute Semantic NLP Pipeline
        match_score = calculate_match(resume_text, job_description)
        missing_skills = extract_missing_skills(resume_text, job_description)
        
        return {
            "filename": file.filename,
            "match_score": match_score,
            "missing_skills": missing_skills,
            "status": "Success"
        }
    except Exception as e:
        return {"error": str(e), "status": "Failed"}