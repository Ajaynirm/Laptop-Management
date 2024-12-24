import mongoose from "mongoose";

const laptopSchema = new mongoose.Schema(
    {
      //I am creating id field for custom identification of laptop  rather than using default _id....
      id: { 
        type: String, 
        required: true, 
        unique: true 
      },
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
        unique: true 
      },
      status: { 
        type: String, 
        enum: ['available', 'assigned', 'maintenance'], 
        default: 'available',
        required: true 
      },
      purchaseDate: { 
        type: Date, 
        required: true 
      },
    },

    {
    timestamps: true 
    }

);

const Laptop = mongoose.model('Laptop',laptopSchema);
export default Laptop;