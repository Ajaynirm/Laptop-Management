import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        id: { 
          type: String, 
          required: true, 
          unique: true 
        },
        name: { 
          type: String, 
          required: true 
        },
        email: { 
          type: String, 
          required: true, 
          unique: true 
        },
        department: { 
          type: String, 
          required: true 
        },
        role: { 
            type: String, 
            default: 'admin' 
        }
      },
     {
         timestamps: true 
     }
      
);

const Employee = mongoose.model('Employee',employeeSchema);
export default Employee;