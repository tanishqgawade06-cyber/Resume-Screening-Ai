import spacy
from sentence_transformers import SentenceTransformer, util

# Load lightweight transformer model for semantic matching
# (This understands context, e.g., "React.js" relates to "Frontend")
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

# Load spaCy for Natural Language Processing & entity parsing
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def calculate_match(resume_text: str, jd_text: str) -> float:
    """Calculates semantic similarity score between resume and job description using AI embeddings."""
    if not resume_text or not jd_text:
        return 0.0
    
    # Encode texts into vector embeddings
    emb1 = embed_model.encode(resume_text, convert_to_tensor=True)
    emb2 = embed_model.encode(jd_text, convert_to_tensor=True)
    
    # Compute cosine similarity
    score = util.cos_sim(emb1, emb2).item()
    
    # Convert to a clean 0-100 percentage
    percentage = round(score * 100, 2)
    return max(0.0, min(100.0, percentage))

def extract_missing_skills(resume_text: str, jd_text: str) -> list:
    """Extracts critical technical keywords present in the JD but missing from the resume."""
    if not jd_text or not resume_text:
        return []
        
    doc_jd = nlp(jd_text.lower())
    doc_resume = nlp(resume_text.lower())
    
    # Common tech whitelist or noun/PROPN extraction logic
    # Filter potential technical tokens
    stop_words = nlp.Defaults.stop_words
    
    jd_tokens = set([token.text for token in doc_jd if token.is_alpha and token.text not in stop_words and len(token.text) > 2])
    resume_tokens = set([token.text for token in doc_resume if token.is_alpha and token.text not in stop_words and len(token.text) > 2])
    
    # Find missing keywords
    missing = list(jd_tokens - resume_tokens)
    
    # Clean up and capitalize for the UI
    formatted_missing = [word.capitalize() for word in missing if len(word) > 2]
    
    # Return top 5 missing key terms, or a success message if perfectly matched
    return formatted_missing[:5] if formatted_missing else ["No major keywords missing"]