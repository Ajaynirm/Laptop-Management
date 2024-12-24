import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        emp_id: { 
          type: String, 
          required: true, 
          unique: true 
        },
        emp_name: { 
          type: String, 
          required: true 
        },
        emp_email: { 
          type: String, 
          required: true, 
          unique: true 
        },
        emp_password:{
          type: String,
          required: true
        },
        emp_status:{
            type: String,
            default:"available"
        },
        emp_role: { 
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


