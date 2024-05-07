
const User = require("../models/user-models")
const bcrypt=require("bcryptjs")

// Home logicks 
const home = async (req, res) => {

    try {
        res.status(200).send('Wecome to my it world  Homne page ')
    } catch (error) {
        console.log(error)
    }
}

// Register logicks 
const register = async (req, res) => {

    try {
        console.log(req.body)
        const { username, email, phone, password } = req.body

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: " email is already exists " })
        }
              // hash the password
              const saltRound=10
              const hash_password =await bcrypt.hash(password, saltRound)
              const usercreated = await User.create({
                username,
                email,
                phone,
                password:hash_password,
            })
        res.status(201).send({ msg: "Regestration successfull " , 
            token:await usercreated.generateToken(),userId:usercreated._id.toString() })
    } catch (error) {
        res.status(500).send("Internal server Error ")
    }
}


//  login logicks 
const login = async (req, res) => {
try {
  const {email,password}=req.body;
  const userExists=await User.findOne({email})
  // console.log(userExists)
  if (!userExists) {
    return res.status(400).json({message:"invalid credential "})

  }

 const user=await userExists.comparePassword(password)
if (user) {
  res.status(200).send({ msg: "Login successfull " , 
  token:await userExists.generateToken(),userId:userExists._id.toString() })

}else{
  res.status(401).json({ message: "invalid email or password "})
}
} catch (error) {
  res.status(500).send("Internal server Error")
}
  };



module.exports = {
    home,
    register,
    login
}