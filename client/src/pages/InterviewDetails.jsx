import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

function InterviewDetails() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(`/interview/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInterview(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInterview();
  }, [id]);

  if (!interview) {
    return <h1>Loading...</h1>;
  }
  console.log(interview);

  return (
    <div
      style={{
        padding: "40px",
        background: "#050816",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>{interview.role}</h1>

      <h2>
        Total Score:{" "}
        {interview.questions.reduce((sum, q) => sum + (q.score || 0), 0)}
      </h2>

      {interview.questions.map((q) => (
        <div
          key={q.id}
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        >
          <h3>{q.question}</h3>

          <p>
            <strong>Your Answer:</strong>
            <br />
            {q.answer}
          </p>

          <p>
            <strong>Score:</strong>
            {q.score}
          </p>

          <p>
            <strong>Strength:</strong>
            {q.Strengths}
          </p>

          <p>
            <strong>Weakness:</strong>
            {q.weakness}
          </p>

          <p>
            <strong>Ideal Answer:</strong>
            <br />
            {q.idealAnswer}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InterviewDetails;
