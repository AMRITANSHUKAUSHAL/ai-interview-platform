import { useState } from "react";
import API from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  }

  return (
    <div className="container">
      <div className="register-box">
        <div className="left-side">
          <h1>Join AI Interview</h1>
          <p>
            Practice interviews, improve communication, and crack your dream
            software engineering job.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="register"
          />
        </div>

        <div className="right-side">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            <button type="submit">Create Account</button>

            <p className="login-text">
              Already have an account? <span>Login</span>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4);
          padding: 20px;
        }

        .register-box {
          width: 950px;
          min-height: 550px;
          background: white;
          border-radius: 25px;
          overflow: hidden;
          display: flex;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .left-side {
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

        .left-side h1 {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .left-side p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .left-side img {
          width: 220px;
        }

        .right-side {
          flex: 1;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .right-side h2 {
          font-size: 36px;
          margin-bottom: 30px;
          color: #222;
        }

        .input-group {
          margin-bottom: 22px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }

        .input-group input {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #ccc;
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
          transform: translateY(-2px);
          opacity: 0.95;
        }

        .login-text {
          margin-top: 20px;
          text-align: center;
          color: #666;
        }

        .login-text span {
          color: #7c3aed;
          font-weight: bold;
          cursor: pointer;
        }

        @media (max-width: 850px) {
          .register-box {
            flex-direction: column;
            width: 100%;
          }

          .left-side {
            padding: 30px;
          }

          .left-side h1 {
            font-size: 30px;
          }

          .right-side {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
