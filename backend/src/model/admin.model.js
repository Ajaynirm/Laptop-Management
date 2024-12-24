import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        ad_name: { 
          type: String, 
          required: true 
        },
        ad_email: { 
          type: String, 
          required: true, 
          unique: true 
        },
        ad_password:{
          type: String,
          required: true
        },
        ad_role: { 
            type: String, 
            default: 'admin' 
        }
      },
     {
         timestamps: true 
     }
      
);

const Admin = mongoose.model('Admin',adminSchema);
export default Admin;


