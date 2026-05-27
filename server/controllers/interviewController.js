import client from "../config/ai.js";
import prisma from "../config/prisma.js";


export const generateQuestions = async(req,res)=>{
    try{

        const {role,experience} = req.body;
        
        const prompt = `
        Generate 5 Interview Questions for
        ${role} developer with
        ${experience} years of experience.

        Return Only Json Array

        Do not add explanation.
        Do not add markdown.
        Example:
        [
                 {
                    "question":"What is React?"
                }
        ]
        `;


        const completion = await client.responses.create({
            model:"openai/gpt-oss-20b",
            input:prompt,
        })

        const response = completion.output_text;

const questions = JSON.parse(response);

// Create Interview
const interview =
  await prisma.interview.create({
    data: {
      role,
      userId: req.user.id,
    },
  });

// Save Questions
        const savedQuestions = [];

        for (const q of questions) {
        const savedQuestion =
            await prisma.question.create({
            data: {
                question: q.question,
                interviewId: interview.id,
            },
            });

        savedQuestions.push(savedQuestion);
        }

        res.json({
        interviewId: interview.id,
        questions: savedQuestions,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Something Went Wrong",
        })
    }
}


export const evaluateAnswer = async(req,res)=>{
    try{    

        const {questionId,question,answer} = req.body;
        const prompt = `
        
        You are and expert technical Interviewer

        Question:${question}
        CandidateAnswer:${answer}

        Evaluate the answer .

        Return ONLY JSON in this format.

        {

            "score":8,
            "Strengths":"Good Understanding",
            "weakness":"could explain deeper",
            "idealAnswer":"Ideal detailed answer here"
        }
        `;

        const completion = await client.responses.create({
            model:"openai/gpt-oss-20b",
            input:prompt
        });

        const response = completion.output_text;
        const result = JSON.parse(response);
        console.log(result);
        await prisma.question.update({
            where:{
                id:questionId
            },
            data:{
                answer,
                score:result.score,
                feedback: result.idealAnswer,
                Strengths:
                result.Strengths ||
                result.strengths ||
                result.strength,
                weakness: result.weakness || result.weaknesses,
                idealAnswer: result.idealAnswer,

            }
        })

        res.json(result);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Evaluation Failed",
        })
    }
}


export const getInterviewHistory = async (req, res) => {

    try {
  
      const userId = req.user.id;
  
      const history = await prisma.interview.findMany({
  
        where: {
          userId,
        },
  
        include: {
          questions: true,
        },
  
        orderBy: {
          createdAt: "desc",
        },
      });
  
      res.json(history);
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Failed to fetch history",
      });
    }
};