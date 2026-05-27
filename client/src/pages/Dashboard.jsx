import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");

  const handleStartInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const res = await API.post(
        "/interview/generate",
        {
          role,
          experience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/interview", {
        state: {
          questions: res.data.questions,
          interviewId: res.data.interviewId,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="left-section">
          <h1>AI Interview Platform 🚀</h1>

          <p>
            Practice technical interviews with AI and prepare for your dream
            software engineering job.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="AI Interview"
          />
        </div>

        <div className="right-section">
          <h2>Start Your Interview</h2>

          <div className="input-group">
            <label>Select Role</label>

            <select onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>

              <option value="React Developer">React Developer</option>

              <option value="Node.js Developer">Node.js Developer</option>

              <option value="Java Developer">Java Developer</option>
            </select>
          </div>

          <div className="input-group">
            <label>Years of Experience</label>

            <input
              type="text"
              placeholder="Enter experience"
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <button onClick={handleStartInterview}>Start Interview</button>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .dashboard-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4);
          padding: 20px;
        }

        .dashboard-card {
          width: 1000px;
          min-height: 600px;
          background: white;
          border-radius: 25px;
          overflow: hidden;
          display: flex;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          animation: fadeIn 0.5s ease;
        }

        .left-section {
          flex: 1;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .left-section h1 {
          font-size: 42px;
          margin-bottom: 20px;
        }

        .left-section p {
          font-size: 18px;
          line-height: 1.7;
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .left-section img {
          width: 250px;
          animation: float 3s ease-in-out infinite;
        }

        .right-section {
          flex: 1;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .right-section h2 {
          font-size: 35px;
          margin-bottom: 35px;
          color: #222;
        }

        .input-group {
          margin-bottom: 25px;
        }

        .input-group label {
          display: block;
          margin-bottom: 10px;
          color: #555;
          font-weight: bold;
        }

        .input-group select,
        .input-group input {
          width: 100%;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 12px;
          outline: none;
          font-size: 16px;
          transition: 0.3s;
        }

        .input-group select:focus,
        .input-group input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.4);
        }

        button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        button:hover {
          transform: translateY(-3px);
          opacity: 0.95;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @media (max-width: 900px) {
          .dashboard-card {
            flex-direction: column;
            width: 100%;
          }

          .left-section,
          .right-section {
            padding: 30px;
          }

          .left-section h1 {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
