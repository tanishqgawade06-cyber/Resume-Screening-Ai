# TalentLens AI 🧠📄
**Semantic NLP Resume Screening Engine**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge&logo=vercel)](https://resume-screening-ai-ge5s.vercel.app/)
[![Frontend](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Backend](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](#)
[![Deployment](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](#)

TalentLens AI is a full-stack machine learning web application that uses Natural Language Processing (NLP) to semantically evaluate and score a candidate's resume against a target job description. 

This project was engineered to demonstrate applied ML logic, RESTful API architecture, and multi-cloud deployment constraints.

## 🚀 Live Demo
**Test the application here:** [TalentLens AI Live on Vercel](https://resume-screening-ai-ge5s.vercel.app/)

*(Note: The backend is hosted on a free Render tier and may take ~45 seconds to wake up for the first request. Subsequent requests are instant.)*

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
* **Framework:** React.js
* **Styling:** Tailwind CSS, Lucide Icons
* **Hosting:** Vercel
* **Features:** Asynchronous form data handling, responsive UI, real-time loading states.

### Backend (API Engine)
* **Framework:** Python / FastAPI
* **NLP & ML:** SpaCy (`en_core_web_sm`), PyTorch (CPU-Optimized)
* **Document Parsing:** PyPDF2
* **Hosting:** Render (via custom Docker container)
* **Features:** Custom CORS middleware, semantic similarity scoring, missing keyword extraction.

---

## 🧠 Engineering & DevOps Highlights
Taking this application from `localhost` to the cloud required solving several deployment and architectural challenges:

* **Cloud Memory Optimization:** To bypass Render's strict 512MB RAM free-tier limit, standard PyTorch/CUDA installations (1.5GB+) would crash the build. I engineered a custom Docker build to strictly install **CPU-only PyTorch binaries**, reducing the container footprint by over 70% and successfully deploying within memory constraints.
* **Cross-Origin Resource Sharing (CORS):** Implemented strict middleware protocols in FastAPI to allow secure preflight requests and data transfer specifically from the Vercel frontend.
* **Stateless Processing:** The API operates completely statelessly, processing PDF binary data in memory and returning JSON payloads without requiring persistent database storage.

---

## 💻 Local Setup & Installation

If you want to run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/Resume-Screening-Ai.git](https://github.com/tanishqgawade06-cyber/Resume-Screening-Ai.git)
cd Resume-Screening-Ai