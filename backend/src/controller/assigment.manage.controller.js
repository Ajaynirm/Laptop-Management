import Assignment from "../model/assignment.model.js";
import Issue from "../model/issues.model.js";

export const getEmployeeAssignment = async (req,res) => {
    const {_id} = req.body;
    try {
        const assignments = await Assignment.find({empId:_id});
          console.log(assignments)
          return res.status(201).json(assignments);
   
    } catch (error) {
        console.log(error.message);
    }
}
export const getAllAssignment = async (req,res) => {
  try {
      const assignments = await Assignment.find();
        return res.status(201).json(assignments);
 
  } catch (error) {
      console.log(error.message);
  }
}


export const reportIssue = async (req,res) => {
    const {issueId,laptopId,description,priority,status,reportedBy} = req.body;
    try{
      const alreadyHaveId = await Issue.findById(issueId);
      if(!alreadyHaveId){
        const newIssue = new Issue({
          issueId,laptopId,description,priority,status,reportedBy
        });
        const savedOrNot = await newIssue.save();
        if(savedOrNot){
          return res.status(201).send({message:"issue reported"});
        }
      }
    }catch(e){
        res.status(500).send({messag:e.message});
    }
    }