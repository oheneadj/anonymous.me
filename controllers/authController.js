const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.json({ message: "user logged in" });
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const name = `${firstname} ${lastname}`;

  const random = Math.floor(Math.random() * 100);

  const username = firstname.trim().toLowerCase() + lastname.trim().toLowerCase().slice(0, 3) + random;

  
  //  

  const user = await User.create({
    name,
    username,
    email,
    password:hashedPassword
  });

  if(user){
    res.status(201).json(user);
  }else{
    res.status(400).json({ message: "Invalid user details"});
  }
  
};

const resetUserPassword = (req, res) => {
  res.json({ message: "User password as been reset" });
};

module.exports = { loginUser, registerUser, resetUserPassword };
