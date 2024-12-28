import Maintenance from "../model/maintenance.model.js";
import Issue from "../model/issues.model.js";

export const addMaintainance = async (req,res) => {
  const {laptopId,description,status,cost} =req.body;
 
  try{
    const alreadyHaveId = await Maintenance.findById(laptopId);

    if(!alreadyHaveId){
    const newMaint= new Maintenance({
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
    return res.status(401).send({message: "maintenance already exist"})
  }

  }catch(e){
      res.status(500).send({message:e.message});
  }
}

export const viewMaintainance = async (req,res) => {
try{
 const data = await Maintenance.find();
 if(data){
  return res.status(201).json(data);
 }
 return res.status(200).send({message: "No data available"});
}catch(e){
res.status(500).send({message:e.message});
}
}


export const viewIsues= async (req,res) => {
    try{
      const data = await Issue.find();
      if(data){
        return res.status(201).send({mesage:"Issues fetched Successfully"}).json(data);
      }
      return res.status(200).send({message:"Issues not found"});
    }catch(e){
      res.status(500).send({message:e.message});
    }
}
