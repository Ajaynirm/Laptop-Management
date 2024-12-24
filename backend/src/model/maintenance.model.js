import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
    {
    laptopId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Laptop', 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      status: { 
        type: String, 
        enum: ['pending', 'in progress', 'completed'], 
        default: 'pending',
        required: true 
      },
      cost: { 
        type: Number, 
        default: 0 
      },
      loggedAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
      },
    },{
     timestamps: true 
    }
);