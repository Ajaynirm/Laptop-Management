import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
    laptopId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Laptop', 
        required: true 
      },
      employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
      },
      assignedAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
      },
      returnedAt: { 
        type: Date, 
        default: null 
      },
    }, { timestamps: true }
)


const Assignment = mongoose.model('Assignment',assignmentSchema);
export default Assignment;
