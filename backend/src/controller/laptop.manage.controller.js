import Laptop from "../model/laptop.model.js";


// for debugging purpose i used console.log() to identify the place where occur
export const addLaptop = async (req,res) => {
    const { brand,model,serialNumber,status,purchaseDate } = req.body;  
    try{
      const newLaptop = new Laptop({
        brand,model,serialNumber,status,purchaseDate
      });
      //
      console.log("laptop going to create")
      if (newLaptop) {
    
        await newLaptop.save();
  
        res.status(201).json({
          _id: newLaptop._id,
          brand: newLaptop.brand,
          model: newLaptop.model
        });
        console.log("laptop created")
  
      } else {
        res.status(400).json({ message: "Invalid user data" });
  }
    }
  catch (error) {
    console.log("Error in add laptop controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
  }
  
  export const updateLaptop = async (req, res) => {
    const { _id, brand, model, serialNumber } = req.body;
    try {
      
      const updatedLaptop = await Laptop.findByIdAndUpdate(
        _id, 
        { brand, model, serialNumber},
        { new: true } 
      );
      if (!updatedLaptop) {
        return res.status(404).json({ message: "Laptop not found" });
      }
      return res.status(200).json({
        _id: updatedLaptop._id,
        brand: updatedLaptop.brand,
        model: updatedLaptop.model,
        serialNumber: updatedLaptop.serialNumber,
      });
    } catch (error) {
      console.error("Error in update laptop controller:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  export const deleteLaptop = async(req,res) => {
     const {_id} = req.body;
     try{
        const deletedlaptop = await Laptop.findByIdAndDelete({_id});
        if(deletedlaptop){
           res.status(201).json({
            _id: deletedlaptop._id,
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
      const laptops = await Laptop.find();
      if (!laptops || laptops.length === 0) {
        return res.status(404).json({ message: "No laptops found" });
      }
        return res.status(201).json(laptops);

    }catch(e){
      console.log("Erro while getting Laptop data");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }