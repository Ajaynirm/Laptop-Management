import Employee from "../model/employee.model.js";
import Laptop from "../model/laptop.model.js";
import Assignment from "../model/assignment.model.js";



export const getEmployee = async (req,res) => {
    try{
      const employees = await Employee.find({});
      if(employees){
        res.send({message: "Data received Successfully"});
        return res.status(201).json(laptopData);
      }
    }catch(e){
      console.log("Erro while getting Laptop data");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  export const assignLaptop = async (req,res) => {
    
  }
  
  export const getAssignedLaptop = async (req,res) => {
    
  }

  