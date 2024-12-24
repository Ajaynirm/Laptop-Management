import Admin from "../model/admin.model.js";
import Employee from "../model/employee.model.js";
import Laptop from "../model/laptop.model.js";
import Assignment from "../model/assignment.model.js";
import Maintenance from "../model/maintenance.model.js";
import Issue from "../model/issues.model.js"

export const addMaintainance = async (req,res) => {
  const {maintenanceId,laptopId,description,status,cost} =req.body;
  
  try{
    const alreadyHaveId = await Maintenance.findById({maintenanceId});
    if(!alreadyHaveId){
    const newMaint= new Maintenance({
      maintenanceId,
      laptopId,
      description,
      status,
      cost
    })
    const savedOrNot=await newMaint.save();
    if(savedOrNot){
      return res.status(201).send({message:"maintenance added"}).json(newMaint);
    }
  }else{
    return res.send({message: "maintenance id will be unique"});
  }

  }catch(e){
      res.status(500).send({message:e.message});
  }
}

export const viewMaintainance = async (req,res) => {
try{
 const data = await Maintenance.find({});
 if(data){
  return res.status(201).json(data);
 }
 return res.status(200).send({message: "No data available"});
}catch(e){
res.status(500).send({message:e.message});
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

export const viewIsues= async (req,res) => {
    try{
      const data = await Issue.find({});
      if(data){
        return res.status(201).send({mesage:"Issues fetched Successfully"}).json(data);
      }
      return res.status(200).send({message:"Issues not found"});
    }catch(e){
      res.status(500).send({message:e.message});
    }
}
