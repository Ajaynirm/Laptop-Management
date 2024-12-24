import Admin from "../model/admin.model.js";
import Employee from "../model/employee.model.js";
import Laptop from "../model/laptop.model.js";
import Assignment from "../model/assignment.model.js";


export const addLaptop = async (req,res) => {
    const { id,brand,model,serialNumber,status,purchaseDate } = req.body;
    try{
      const laptop = await Laptop.findById(id);
      if(laptop){
        console.log("laptop id already exist", error.message);
        res.status(500).json({ message: "Laptop id already exist" });
      }
      const newLaptop = new Laptop({
        id,brand,model,serialNumber,status,purchaseDate
      });
      if (newLaptop) {
    
        await newLaptop.save();
  
        res.status(201).json({
          id: newLaptop.id,
          brand: newLaptop.brand,
          model: newLaptop.model
        });
  
      } else {
        res.status(400).json({ message: "Invalid user data" });
  }
    }
  catch (error) {
    console.log("Error in add laptop controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
  }
  
  export const updateLaptop = async(req,res) => {
    const { id,brand,model,serialNumber,status,purchaseDate } = req.body;
    try{  
        const updatedlaptop = await Laptop.findByIdAndUpdate({id},{brand,model,serialNumber,status,purchaseDate},{new:true});
        if(!updatedlaptop){
          console.log("Error in updating laptop", error.message);
          return res.status(500).json({ message: "Database Server Error" });
        }
      
      res.status(201).json({
        id: updatedlaptop.id,
        brand: updatedlaptop.brand,
        model: updatedlaptop.model,
        serialNumber:updatedlaptop.serialNumber,
        status:updatedlaptop.status
      });
      return  res.status(500).json({ message: "Laptop updated sucessfully" });
    }
  catch (error) {
    console.log("Error in add laptop controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
  }
  
  export const deleteLaptop = async(req,res) => {
     const {id} = req.body;
     try{
        const deletedlaptop = await Laptop.findByIdAndDelete(id);
        if(deletedlaptop){
           res.status(201).json({
            id: deletedlaptop.id,
            brand: deletedlaptop.brand,
            model: deletedlaptop.model,
            serialNumber:deletedlaptop.serialNumber
          });
          return  res.status(500).json({ message: "Laptop Deleted sucessfully" });
        }
     }catch(e){
      console.log("Error in delete laptop controller laptop");
      res.status(500).json({ message: "Internal Server Error" });
     }
  }
  
  export const getAllLaptop= async (req,res) => {
    try{
      const laptopData = await Laptop.find({});
      if(laptopData){
        res.send({message: "Data received Successfully"});
        return res.status(201).json(laptopData);
      }
    }catch(e){
      console.log("Erro while getting Laptop data");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }