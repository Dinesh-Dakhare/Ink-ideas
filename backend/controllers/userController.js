import userSchema from "../model/userSchema.js";


export const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const user = await userSchema.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }
    const newUser = await userSchema.create({ username, email, password });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Password is incorrect" });
    }
    const token = await user.generateToken();
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadImg = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const filePath = `/uploads/avatars/${req.file.filename}`;

  // Save the avatar in user schema
  const updatedUser = await userSchema.findByIdAndUpdate(
    req.user.id,
    { avatar: filePath },
    { new: true, select: "username email avatar" }
  );
  return res.status(200).json({
    message: "Avatar uploaded successfully",
    avatar: updatedUser.avatar,
    user: updatedUser,
  });
};


export const updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;

    const user = await userSchema.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (bio) user.bio = bio;
 

    const updated = await user.save();
    res.json({
      message: "Profile updated",
      user: {
        id: updated._id,
        username: updated.username,
        email: updated.email,
        bio: updated.bio,
        avatar: updated.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};