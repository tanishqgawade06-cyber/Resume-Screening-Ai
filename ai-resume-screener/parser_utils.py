import pypdf
import docx2txt
import os

def extract_text(file_path):
    """
    Detects file extension and extracts text accordingly.
    Supported: .pdf, .docx, .txt
    """
    # Get the file extension
    ext = os.path.splitext(file_path)[1].lower()

    try:
        if ext == '.pdf':
            text = ""
            with open(file_path, "rb") as f:
                reader = pypdf.PdfReader(f)
                # Loop through all pages and extract text
                for page in reader.pages:
                    text += page.extract_text() + "\n"
            return text
            
        elif ext == '.docx':
            # Uses docx2txt to handle Word XML structure
            return docx2txt.process(file_path)
            
        elif ext == '.txt':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
                
        else:
            return "Error: Unsupported file format."
            
    except Exception as e:
        return f"Error during extraction: {str(e)}"

# Quick Test (You can uncomment this to test with your own resume)
# if __name__ == "__main__":
#     print(extract_text("my_resume.pdf"))