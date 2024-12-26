import mongoose from "mongoose";

const laptopSchema = new mongoose.Schema(
    {
      //I am not creating id field by using default _id....
    
      brand: { 
        type: String, 
        required: true 
      },
      model: { 
        type: String, 
        required: true 
      },
      serialNumber: { 
        type: String, 
        required: true,
      },
      status: { 
        type: String, 
        enum: ['available', 'assigned', 'maintenance'], 
        default: 'available',
      },
      purchaseDate: { 
        type: Date
      },
    },

    {
    timestamps: true 
    }

);

const Laptop = mongoose.model('Laptop',laptopSchema);
export default Laptop;