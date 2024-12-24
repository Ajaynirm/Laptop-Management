import mongoose from "mongoose";

const issuesSchema = new mongoose.Schema(
{    
    issueId:{
      type: String,
      required:true
    },
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
        required: true 
      },
      status: { 
        type: String, 
        enum: ['open', 'in progress', 'resolved', 'closed'], 
        default: 'open',
        required: true 
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
