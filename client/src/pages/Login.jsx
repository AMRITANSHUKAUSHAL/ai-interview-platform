import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Welcome Back 👋</h1>
        <p className="subtitle">Login to continue your AI Interview journey</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Login</button>

          <p className="signup-text">
            Don't have an account?
            <span onClick={() => navigate("/register")}> Sign Up</span>
          </p>
        </form>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4);
          padding: 20px;
        }

        .login-box {
          width: 400px;
          background: white;
          padding: 40px;
          border-radius: 25px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          animation: fadeIn 0.5s ease;
        }

        .login-box h1 {
          text-align: center;
          margin-bottom: 10px;
          color: #222;
          font-size: 35px;
        }

        .subtitle {
          text-align: center;
          margin-bottom: 30px;
          color: #666;
          font-size: 15px;
        }

        .input-group {
          margin-bottom: 22px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: bold;
        }

        .input-group input {
          width: 100%;
          padding: 14px;
          border: 1px solid #ccc;
          border-radius: 12px;
          outline: none;
          font-size: 16px;
          transition: 0.3s;
        }

        .input-group input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.4);
        }

        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }

        .signup-text {
          margin-top: 20px;
          text-align: center;
          color: #666;
        }

        .signup-text span {
          color: #7c3aed;
          font-weight: bold;
          cursor: pointer;
        }

        .signup-text span:hover {
          text-decoration: underline;
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
      `}</style>
    </div>
  );
}

export default Login;
