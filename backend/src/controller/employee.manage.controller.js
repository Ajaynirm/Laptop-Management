import Employee from "../model/employee.model.js";
import Assignment from "../model/assignment.model.js";



export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (employees) {
      return res.status(200).json({
        employees
      });
    } else {
      return res.status(404).json({ message: "No employees found" });
    }
  } catch (e) {
    console.error("Error while getting employee data:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAvailableEmployees = async (req, res) => {
  try {
    const availableEmployees = await Employee.find({ status: "available" });

    if (availableEmployees.length > 0) {
      return res.status(200).json({
        success: true,
        employees: availableEmployees
      });
    } else {
      return res.status(404).json({ success: false, message: "No available employees found" });
    }
  } catch (error) {
    console.error("Error while getting available employees:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



  // after work done need to update return date
  export const assignLaptop = async (req,res) => {
    const {laptopId,empId} = req.body;
    try{
      const employeeAvail = await Employee.findById({empId});

      // i think i have to initialize transaction for Atomicity...
      if(employeeAvail.emp=="available"){
        const newAssign = new Assignment({
          laptopId,
          empId
        });
        await newAssign.save();
        const updateEmployStatus = await Employee.findByIdAndUpdate({empId},{status:"working"});
        if(updateEmployStatus && newAssign){
          return res.status({message: "successfully assigned"})
        }
      }else{
        return res.send({message: "Employee not available"});
      }
    }catch(e){
      res.send({message:e.message});
    }
  }
  


  export const getAssignedLaptop = async (req,res) => {
    try{
      const data=await Assignment.find({});
      if(data){
        return res.status(201).json(data);
      }
      return res.send({message: "no files found"});
    }catch(e){
      return res.status(500).send({message: "Internal server error on employ manage controller"});
    }
  }

  // for employee to see their assigned laptop
  export const viewAssignLaptop = async (req,res) => {
    const {empId} = req.body;
    try{
      const empAssignment = await Assignment.findOne({empId});
      if(empAssignment){
        return res.status(201).json(empAssignment);
      }
      return res.status(200).send({message:'No Assignment found'});
    }catch(e){
      res.status(500).send({message:"Internal Server error"});
    }
  }
  


