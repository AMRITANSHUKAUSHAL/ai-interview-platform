import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { results } = location.state;

  const resultArray = Object.values(results);

  const totalScore = resultArray.reduce((acc, curr) => acc + curr.score, 0);

  const percentage = Math.floor((totalScore / (resultArray.length * 10)) * 100);

  const averageScore = (totalScore / resultArray.length).toFixed(1);

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;

      setAnimatedScore(start);

      if (start >= percentage) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [percentage]);

  let performance = "";
  let emoji = "";

  if (percentage >= 80) {
    performance = "Excellent Performance";
    emoji = "🏆";
  } else if (percentage >= 60) {
    performance = "Great Performance";
    emoji = "🚀";
  } else if (percentage >= 40) {
    performance = "Good Attempt";
    emoji = "⚡";
  } else {
    performance = "Needs Improvement";
    emoji = "📚";
  }

  return (
    <div className="container">
      {/* HERO SECTION */}

      <section className="hero-section">
        <div className="hero-bg"></div>

        <div className="hero-content">
          <h1>{emoji} Interview Completed</h1>

          <p>Your AI interview analysis is now ready</p>

          <div className="hero-score">
            <span>{animatedScore}%</span>
          </div>

          <h2>{performance}</h2>

          <button
            className="scroll-btn"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            View Detailed Analysis ↓
          </button>
        </div>
      </section>

      {/* SUMMARY SECTION */}

      <section className="summary-section">
        <div className="summary-card">
          <div className="stat-box">
            <h3>Total Score</h3>

            <p>{totalScore}</p>
          </div>

          <div className="stat-box">
            <h3>Average Score</h3>

            <p>{averageScore}/10</p>
          </div>

          <div className="stat-box">
            <h3>Total Questions</h3>

            <p>{resultArray.length}</p>
          </div>
        </div>
      </section>

      {/* RESULT CARDS */}

      <section className="result-section">
        {resultArray.map((result, index) => (
          <div className="result-card" key={index}>
            <div className="card-header">
              <h2>Question {index + 1}</h2>

              <div className="score-badge">{result.score}/10</div>
            </div>

            <div className="feedback-card">
              <h3>✅ Strengths</h3>

              <p>{result.Strengths}</p>
            </div>

            <div className="feedback-card">
              <h3>⚠ Weakness</h3>

              <p>{result.weakness}</p>
            </div>

            <div className="feedback-card">
              <h3>💡 Ideal Answer</h3>

              <p>{result.idealAnswer}</p>
            </div>
          </div>
        ))}
      </section>

      {/* BUTTONS */}

      <section className="button-section">
        <button className="retry-btn" onClick={() => navigate("/")}>
          🔄 Retry Interview
        </button>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          🚀 Go Dashboard
        </button>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          overflow-x: hidden;
        }

        .container {
          background:
            radial-gradient(circle at top left, #7c3aed, transparent 25%),
            radial-gradient(circle at bottom right, #06b6d4, transparent 25%),
            #050816;
          min-height: 100vh;
          color: white;
        }

        /* HERO SECTION */

        .hero-section {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .hero-bg {
          position: absolute;
          width: 700px;
          height: 700px;
          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );
          border-radius: 50%;
          filter: blur(180px);
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 80px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .hero-content p {
          color: rgba(255,255,255,0.7);
          font-size: 22px;
          margin-bottom: 40px;
        }

        .hero-score {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );
          font-size: 65px;
          font-weight: bold;
          box-shadow:
            0 0 60px rgba(124,58,237,0.5),
            0 0 120px rgba(6,182,212,0.25);
          animation: pulse 2s infinite;
        }

        .hero-content h2 {
          margin-top: 40px;
          font-size: 42px;
        }

        .scroll-btn {
          margin-top: 40px;
          padding: 18px 35px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            #06b6d4,
            #7c3aed
          );
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .scroll-btn:hover {
          transform: translateY(-4px);
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.05);
          }

          100% {
            transform: scale(1);
          }
        }

        /* SUMMARY */

        .summary-section {
          padding: 80px 20px 40px;
        }

        .summary-card {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .stat-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 40px;
          text-align: center;
          box-shadow:
            0 10px 30px rgba(0,0,0,0.3),
            inset 0 0 20px rgba(255,255,255,0.03);
        }

        .stat-box h3 {
          color: rgba(255,255,255,0.7);
          margin-bottom: 15px;
          font-size: 18px;
        }

        .stat-box p {
          font-size: 42px;
          font-weight: bold;
        }

        /* RESULT SECTION */

        .result-section {
          padding: 40px 20px 100px;
          max-width: 1300px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .result-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 35px;
          transition: 0.4s;
          box-shadow:
            0 10px 40px rgba(0,0,0,0.35),
            inset 0 0 20px rgba(255,255,255,0.03);
        }

        .result-card:hover {
          transform: translateY(-8px);
          border-color: rgba(6,182,212,0.35);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .card-header h2 {
          font-size: 34px;
        }

        .score-badge {
          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );
          padding: 14px 22px;
          border-radius: 16px;
          font-size: 20px;
          font-weight: bold;
        }

        .feedback-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 25px;
          margin-bottom: 22px;
        }

        .feedback-card h3 {
          margin-bottom: 15px;
          font-size: 24px;
        }

        .feedback-card p {
          color: rgba(255,255,255,0.75);
          line-height: 1.9;
          font-size: 16px;
        }

        /* BUTTONS */

        .button-section {
          display: flex;
          justify-content: center;
          gap: 25px;
          padding-bottom: 80px;
          flex-wrap: wrap;
        }

        .retry-btn,
        .dashboard-btn {
          padding: 18px 35px;
          border: none;
          border-radius: 18px;
          font-size: 18px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: 0.35s;
        }

        .retry-btn {
          background: linear-gradient(
            135deg,
            #7c3aed,
            #8b5cf6
          );
        }

        .dashboard-btn {
          background: linear-gradient(
            135deg,
            #06b6d4,
            #0891b2
          );
        }

        .retry-btn:hover,
        .dashboard-btn:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 12px 30px rgba(124,58,237,0.35);
        }

        /* RESPONSIVE */

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 45px;
          }

          .hero-content p {
            font-size: 18px;
          }

          .hero-score {
            width: 180px;
            height: 180px;
            font-size: 42px;
          }

          .hero-content h2 {
            font-size: 30px;
          }

          .card-header {
            flex-direction: column;
            gap: 15px;
          }

          .card-header h2 {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}

export default Result;
