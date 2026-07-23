import React, { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle, Loader2, Cpu, FileText } from 'lucide-react';

export default function ResumeScreener() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!file || !jd) return alert("Please upload a resume and paste a Job Description!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jd);

    try {
      // FIXED: Added /screen to the end of the URL
      const response = await fetch("https://resume-screening-ai-1-x02b.onrender.com/screen", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/30">
              <Cpu size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">TalentLens AI</h1>
              <p className="text-xs text-slate-400">Semantic NLP Resume Screening Engine</p>
            </div>
          </div>
          <span className="hidden md:inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-3 py-1 rounded-full font-medium">
            v2.0 Transformer Edition
          </span>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Target Job Requirements
              </h2>
              <textarea 
                className="w-full h-44 p-4 bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm resize-none mb-6"
                placeholder="Paste the target job description here..."
                onChange={(e) => setJd(e.target.value)}
              />

              <h2 className="text-lg font-bold mb-3">Candidate Document</h2>
              <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-950/50 rounded-2xl p-6 text-center transition cursor-pointer">
                <input type="file" id="resumeUpload" hidden accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
                <label htmlFor="resumeUpload" className="cursor-pointer block">
                  <Upload className="mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium text-slate-300">{file ? file.name : "Click to upload Resume (PDF/DOCX)"}</p>
                  <p className="text-xs text-slate-500 mt-1">Supports structured text documents</p>
                </label>
              </div>
            </div>

            <button 
              onClick={handleAnalysis}
              disabled={loading}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20 flex justify-center items-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Run Semantic AI Analysis"}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden">
            {!result ? (
              <div className="opacity-40 flex flex-col items-center">
                <Cpu size={56} className="mb-4 stroke-[1.5]" />
                <p className="text-sm font-medium">Upload a resume and evaluate against requirements</p>
              </div>
            ) : result.error ? (
              <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-6 rounded-2xl w-full">
                <AlertTriangle size={36} className="mx-auto mb-3" />
                <h3 className="font-bold mb-1">Analysis Interrupted</h3>
                <p className="text-xs font-mono">{result.error}</p>
              </div>
            ) : (
              <div className="w-full animate-in fade-in duration-500 flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Semantic Match Evaluation</span>
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-6">
                  {result.match_score}%
                </div>
                
                <div className="w-full bg-slate-950 border border-slate-800/60 p-6 rounded-2xl text-left mt-2">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    <CheckCircle size={14} className="text-emerald-400" />
                    Recommended Missing Keywords to Add
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missing_skills?.map((skill, i) => (
                      <span key={i} className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-blue-300 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}