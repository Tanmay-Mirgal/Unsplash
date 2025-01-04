import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

export const signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        if(password.length < 6){
            return res.status(400).json({message:'Password must be at least 6 characters'});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({name,email,password:hashedPassword});
        const savedUser = await newUser.save();
        if(!savedUser){
            return res.status(400).json({message:'Something went wrong in signup'});
        }
        const token = jwt.sign({ id : savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV === 'production',
            maxAge:24*60*60*1000,
        });

        return res.status(201).json({user:savedUser,token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong in signup'});
    }

}

export const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            },
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong in login' });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong in logout' });
    }
}

export const profile = async (req, res, next) => {
    try {
      const loggedInUser = req.user._id;
      const user = await User.findById(loggedInUser).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profilePic: user.profilePic,
          bio: user.bio,
          location: user.location,
          website: user.website,
          socialmedia: user.socialmedia,
          followers: user.followers,
          following: user.following,
          posts: user.posts,
          twitter: user.twitter,
          instagram: user.instagram,
          facebook: user.facebook,
          posts: user.posts
        },
      });
    } catch (error) {
      next(error);
    }
  };
  

  export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.files || {};
    const { firstName, lastName, bio, location, website, username, email, twitter, instagram, facebook } = req.body;
    const loggedInUser = req.user._id;
    const user = await User.findById(loggedInUser).select("-password ");
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (profilePic) {
      const profilePicPath = await cloudinary.uploader.upload(profilePic.tempFilePath, { folder: 'profilePics' });
      if (!profilePicPath) {
        return res.status(400).json({ message: 'Something went wrong in uploading profile pic' });
      } else {
        user.profilePic = profilePicPath.secure_url;
        console.log(profilePicPath);
      }
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.website = website || user.website;
    user.username = username || user.username;
    user.email = email || user.email;
  user.twitter = twitter || user.twitter;
  user.instagram = instagram || user.instagram;
  user.facebook = facebook || user.facebook;

    await user.save();

    if (profilePic && profilePic.tempFilePath) {
      try {
        fs.unlinkSync(profilePic.tempFilePath);
        console.log(profilePic.tempFilePath);
      } catch (err) {
        console.error('Error deleting temp profile pic file:', err);
      }
    }

    return res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        location: user.location,
        website: user.website,
        username: user.username,
        socialLinks: user.socialLinks,
        followers: user.followers,
        following: user.following,
        posts: user.posts,
        twitter: user.twitter,
        instagram: user.instagram,
        facebook: user.facebook,
      },
     
    
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong in updating profile' });
  }
}
