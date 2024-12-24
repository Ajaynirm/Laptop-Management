import { generateToken } from "../lib/utils.js";
import Admin from "../model/admin.model.js";
import Employee from "../model/employee.model.js";
import bcrypt from "bcryptjs";


export const AdminSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    if (newAdmin) {
      // generate jwt token here
      generateToken(newAdmin._id,res);
      await newAdmin.save();

      res.status(201).json({
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in admin signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const EmployeeSignup = async (req, res) => {
  const { id,name, email, password } = req.body;
  try {
    if (!id || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const employee = await Employee.findOne({ email });

    if (employee) return res.status(400).json({ message: "Email already exists or id" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      id,
      name,
      email,
      password: hashedPassword,
    });

    if (newEmployee) {
      // generate jwt token here
      generateToken(newEmployee._id,res);
      await newEmployee.save();

      res.status(201).json({
        id: newEmployee.id,
        name: newEmployee.name,
        email: newEmployee.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in employee signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(admin._id, res);

    res.status(200).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    console.log("Error in Admin login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const EmployeeLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, employee.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(employee._id, res);

    res.status(200).json({
      id: employee.id,
      name: employee.fullName,
      email: employee.email,
    });
  } catch (error) {
    console.log("Error in Admin login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const AdminCheckAuth = (req, res) => {
  try {
    res.status(200).json(req.admin);
  } catch (error) {
    console.log("Error in Admin checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const EmployeeCheckAuth = (req, res) => {
  try {
    res.status(200).json(req.admin);
  } catch (error) {
    console.log("Error in Employee checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
