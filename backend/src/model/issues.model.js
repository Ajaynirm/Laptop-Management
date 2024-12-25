import mongoose from "mongoose";

const issuesSchema = new mongoose.Schema(
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
      priority: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'critical'], 
        default: 'low',
      },
      status: { 
        type: String, 
        enum: [ 'in progress', 'resolved'], 
        default: 'in progress',
      },
      reportedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
      },
      reportedAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
      },
    }, { timestamps: true }
);

const Issue = mongoose.model("Issue",issuesSchema);
export default Issue;
