import userSchema from "../model/userSchema.js";

export const userRegister = async(req, res) => {
    const {username,email,password} = req.body
   try {
    if(!username || !email || !password){
        res.status(400).json({message:"All fields are required"});
    }
    const user = await userSchema.findOne({email});
    if(user){
        res.status(400).json({message:"User already exists"});
    }
    const newUser = await userSchema.create({username,email,password});

    res.status(201).json({message:'User created successfully'});
   } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message});
   }
}

export const userLogin = async(req, res) => {

    const {email,password} = req.body
    try {
        if(!email || !password){
            res.status(400).json({message:"All fields are required"});
        }
        const user = await userSchema.findOne({email});
        if(!user){
            res.status(400).json({message:"User does not exist"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(400).json({message:"Password is incorrect"});
        }
        const token = await user.generateToken();
        res.status(200).json({token,user});
       
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}