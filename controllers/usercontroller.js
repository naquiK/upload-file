const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existenceUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existenceUser) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = User({
    username,
    email,
    password: hashPassword,
    role: role || "user",
  });
  await newUser.save();
  console.log(newUser);
  return res.status(200).json({
    success: true,
    message: "user created",
    data: newUser,
  });
};
const login = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const comparingPassword = await bcrypt.compare(password, user.password);
    if (!comparingPassword) {
      return res.status(400).json({
        success: false,
        message: "wrong password",
      });
    }
    const token = jwt.sign(
      { userID: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   

    res.json({
      success: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
  })
};
}

const changePassword= async(req , res)=> {
  try {
    
    const userID = req.userInfo.userID
    const  {oldPassword, newPassword}= req.body

    const user= await User.findById(userID)
    if(!user){
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    } 

    const comparingPassword = await bcrypt.compare(oldPassword , user.password)
    if(!comparingPassword){
      return res.status(400).json({
        success: false,
        message: "wrong password",
      }); 
    }
    
      const newHashPassword = await bcrypt.hash(newPassword , 10)

      user.password=newHashPassword
      await user.save()
      res.status(200).json({
        success:true,
        message:'Password change successfully'
      })
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
  })
  }
}

module.exports = { registration, login , changePassword };
