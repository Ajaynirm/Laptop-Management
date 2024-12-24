import mongoose from "mongoose";

const laptopSchema = new mongoose.Schema(
    {
      //I am creating id field for custom identification of laptop  rather than using default _id....
      lap_id: { 
        type: String, 
        required: true, 
        unique: true 
      },
      lap_brand: { 
        type: String, 
        required: true 
      },
      lap_model: { 
        type: String, 
        required: true 
      },
      lap_serialNumber: { 
        type: String, 
        required: true, 
        unique: true 
      },
      lap_status: { 
        type: String, 
        enum: ['available', 'assigned', 'maintenance'], 
        default: 'available',
      },
      lap_purchaseDate: { 
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