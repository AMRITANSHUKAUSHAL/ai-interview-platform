import prisma from "../config/prisma.js";

export const getInterviewHistory = async (req, res) => {
    try {
  
      const userId = req.user.id;
  
      console.log(userId);
  
      const history =
        await prisma.interview.findMany({
          where: {
            userId: userId,
          },
          include:{
            questions:true,
          }
        });
  
      console.log(history);
  
      res.json(history);
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Failed to fetch history",
      });
    }
};


export const getSingleInterview = async(req,res)=>{
    try{

        const {id} = req.params;
        const interview = await prisma.interview.findUnique({
            where:{
                id:parseInt(id)
            },
            include:{
                questions:true
            }
        });
        res.json(interview);

    }catch(error){
        console.log(error);

        res.status(500).json({
          message:"Failed to fetch interview"
        });
    
      }
}