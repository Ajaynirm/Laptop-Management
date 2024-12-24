import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        empId: { 
          type: String, 
          required: true, 
          unique: true 
        },
        empName: { 
          type: String, 
          required: true 
        },
        empEmail: { 
          type: String, 
          required: true, 
          unique: true 
        },
        empPassword:{
          type: String,
          required: true
        },
        empStatus:{
            type: String,
            default:"available"
        },
        empRole: { 
            type: String, 
            default: 'employee' 
        }
      },
     {
         timestamps: true 
     }
      
);

const Employee = mongoose.model('Employee',employeeSchema);
export default Employee;


