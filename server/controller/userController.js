import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ errorMessage: "User already exists" });
    }
    const savedData = await newUser.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if(!userData) {
      return res.status(404).json({ errorMessage: "No users found" });
    }
    res.status(200).json(userData);
  }catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

// get user by id
export const getUserById = async (req,res) => {
  try{
    const id = req.params.id
    const userExists = await User.findById(id)
    if(!userExists) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    res.status(200).json(userExists);
  }catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

// Update user by id
  export const updateUserById = async (req,res) => {
    try{
      const id = req.params.id
      const userExists = await User.findById(id)
      if(!userExists) {
        return res.status(404).json({ errorMessage: "User not found" });
      }
      // update user
      // id => which id to look
      // req.body => what to update
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedUser);
    }catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }

// Delete user by id
export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};