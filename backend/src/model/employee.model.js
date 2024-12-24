import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
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
        password:{
          type: String,
          required: true
        },
        status:{
            type: String,
            default:"available"
        },
        role: { 
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


