import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions } = location.state;

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  // HISTORY STATE
  const [history, setHistory] = useState([]);
  console.log(history);
  // FETCH HISTORY
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (questionId, question) => {
    console.log(questionId);
    try {
      setLoadingId(questionId);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/interview/evaluate",
        {
          questionId,
          question,
          answer: answers[questionId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("AI RESPONSE:", res.data);

      setResults((prev) => ({
        ...prev,
        [questionId]: {
          score: res.data.score,

          strengths:
            res.data.strengths ||
            res.data.Strengths ||
            "No strengths available",

          weakness: res.data.weakness || "No weakness available",

          idealAnswer: res.data.idealAnswer || "No ideal answer available",
        },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  };

  const completedQuestions = Object.keys(results).length;

  return (
    <div className="container">
      <div className="bg-blur blur1"></div>
      <div className="bg-blur blur2"></div>

      {/* MAIN LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>Interview History</h2>

          {history.map((item) => (
            <div
              key={item.id}
              className="history-item"
              onClick={() => navigate(`/interview/${item.id}`)}
            >
              <h4>{item.role}</h4>

              <p>
                Score:{" "}
                {item.questions?.reduce((sum, q) => sum + (q.score || 0), 0)}
              </p>

              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <div className="header">
            <h1>⚡ AI Interview Arena</h1>

            <p>
              Face real-world AI interview questions and get instant intelligent
              feedback.
            </p>
          </div>

          <div className="question-wrapper">
            {questions.map((q, index) => (
              <div className="question-card" key={q.id}>
                <div className="question-top">
                  <span className="question-number">Question {index + 1}</span>

                  <span className="badge">AI Powered</span>
                </div>

                <h2>{q.question}</h2>

                <textarea
                  placeholder="Type your answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />

                <button
                  className="submit-btn"
                  onClick={() => handleSubmit(q.id, q.question)}
                >
                  {loadingId === q.id ? "Evaluating..." : "Submit Answer →"}
                </button>

                {results[q.id] && (
                  <div className="result-box">
                    <div className="score-box">
                      <h3>Score</h3>

                      <div className="score-circle">
                        {results[q.id].score}/10
                      </div>
                    </div>

                    <div className="feedback-section">
                      <div className="feedback-card">
                        <h4>✅ Strengths</h4>

                        <p>{results[q.id].strengths}</p>
                      </div>

                      <div className="feedback-card">
                        <h4>⚠ Weakness</h4>

                        <p>{results[q.id].weakness}</p>
                      </div>

                      <div className="feedback-card">
                        <h4>💡 Ideal Answer</h4>

                        <p>{results[q.id].idealAnswer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="finish-btn"
            disabled={completedQuestions !== questions.length}
            onClick={() =>
              navigate("/result", {
                state: {
                  results,
                },
              })
            }
          >
            🚀 Finish Interview
          </button>
        </div>
      </div>

      <style>{`
        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
          background: #050816;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .container {
          width: 100vw;
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, #7c3aed, transparent 25%),
            radial-gradient(circle at bottom right, #06b6d4, transparent 25%),
            #050816;

          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }

        .layout {
          display: flex;
          gap: 25px;
        }

        .sidebar {
          width: 280px;
          min-height: 100vh;

          background: rgba(255,255,255,0.05);

          border: 1px solid rgba(255,255,255,0.08);

          border-radius: 24px;

          padding: 20px;

          backdrop-filter: blur(20px);

          position: sticky;
          top: 10px;
        }

        .sidebar h2 {
          color: white;
          margin-bottom: 20px;
        }

        .history-item {
          background: rgba(255,255,255,0.06);

          padding: 16px;

          border-radius: 16px;

          margin-bottom: 14px;

          cursor: pointer;

          transition: 0.3s;
        }

        .history-item:hover {
          transform: translateY(-4px);

          background: rgba(124,58,237,0.25);
        }

        .history-item h4 {
          color: white;
          margin-bottom: 8px;
        }

        .history-item p,
        .history-item small {
          color: rgba(255,255,255,0.7);
        }

        .main-content {
          flex: 1;
        }

        .bg-blur {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.35;
        }

        .blur1 {
          background: #7c3aed;
          top: -100px;
          left: -100px;
        }

        .blur2 {
          background: #06b6d4;
          bottom: -100px;
          right: -100px;
        }

        .header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .header h1 {
          color: white;
          font-size: 70px;
          margin-bottom: 15px;
          font-weight: 800;
        }

        .header p {
          color: rgba(255,255,255,0.7);
          font-size: 20px;
        }

        .question-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 35px;
          position: relative;
          z-index: 2;
        }

        .question-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 40px;
        }

        .question-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .question-number {
          color: #06b6d4;
          font-weight: 600;
          font-size: 15px;
        }

        .badge {
          background: rgba(124,58,237,0.2);
          color: #c084fc;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
        }

        .question-card h2 {
          color: white;
          font-size: 34px;
          line-height: 1.5;
          margin-bottom: 30px;
        }

        textarea {
          width: 100%;
          min-height: 180px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: white;
          padding: 24px;
          font-size: 16px;
          outline: none;
        }

        .submit-btn {
          margin-top: 25px;
          border: none;
          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );
          color: white;
          padding: 18px 32px;
          border-radius: 18px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
        }

        .result-box {
          margin-top: 35px;
          background: rgba(0,0,0,0.2);
          border-radius: 28px;
          padding: 35px;
        }

        .score-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 35px;
        }

        .score-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );

          color: white;
          font-size: 34px;
          font-weight: bold;
        }

        .feedback-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feedback-card {
          background: rgba(255,255,255,0.05);
          padding: 24px;
          border-radius: 22px;
        }

        .feedback-card h4 {
          color: white;
          margin-bottom: 14px;
        }

        .feedback-card p {
          color: rgba(255,255,255,0.75);
          line-height: 1.9;
        }

        .finish-btn {
          display: block;
          margin: 70px auto 30px;

          padding: 20px 50px;

          border: none;
          border-radius: 20px;

          background: linear-gradient(
            135deg,
            #06b6d4,
            #7c3aed
          );

          color: white;

          font-size: 22px;
          font-weight: 700;

          cursor: pointer;
        }

        @media (max-width: 900px) {

          .layout {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            min-height: auto;
          }

          .header h1 {
            font-size: 42px;
          }

          .question-card h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default Interview;
