import Post from "../models/post.model.js";
import  User  from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

export const createPost = async (req, res) => {
    try {
        const { title, description, location } = req.body;
        const { image } = req.files || {};  // Ensure `image` is extracted properly
        const loggedInUser = req.user._id;

        // Fetch user details
        const user = await User.findById(loggedInUser)
            .select('-password')
            .populate('posts');

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        let imageUrl = null;
        if (image) {
            // Upload image to Cloudinary
            try {
                const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'Posts' });
                imageUrl = result.secure_url;
                console.log(imageUrl); // Log the image URL to the console
            } catch (cloudinaryError) {
                return res.status(400).json({ message: 'Error uploading image' });
            }
        }

        // Create new post
        const newPost = new Post({
            user: user._id,
            image: imageUrl || user.img,  // Assign image if available, else use existing image
            title,
            description,
            location,
        });

        // Save new post to DB
        const savedPost = await newPost.save();

        // Add new post to user’s posts array
        user.posts.push(savedPost._id);
        await user.save();

        // Delete temp image file
        if (image && image.tempFilePath) {
            try {
                fs.unlinkSync(image.tempFilePath);
            } catch (fileError) {
                console.error('Error deleting temporary image file:', fileError);
            }
        }

        return res.status(201).json({
            message: 'Post created successfully',
            post: savedPost,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};


export const getUserPosts = async (req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const user = await User.findById(loggedInUser).populate({path:'posts',select:'title description image location createdAt'});
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        return res.status(200).json({posts:user.posts});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const UserPostsById = async (req,res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({message:'Post not found'});
        }
        return res.status(200).json({post});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
export const deletePost = async (req, res) => {
    try {
        const { id: postId } = req.params;

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the logged-in user is authorized to delete the post
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Extract the full image path including the folder
        const folder = 'Posts'; // Specify the folder name
        const imageFileName = post.image.split('/').pop().split('.')[0]; // Extract the file name
        const imagePath = `${folder}/${imageFileName}`; // Combine folder and file name
        console.log('Post Image URL:', post.image);
        console.log('Extracted Full Image Path:', imagePath);

        // Attempt to delete the image from Cloudinary
        try {
            const result = await cloudinary.uploader.destroy(imagePath);
            console.log('Cloudinary Deletion Result:', result);
            if (result.result !== 'ok') {
                console.warn('Cloudinary deletion was not successful');
            }
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
        }

        // Delete the post from the database
        await post.deleteOne();

        // Remove the post ID from the user's posts array
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { posts: postId } },
            { new: true }
        );

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error in deletePost:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const allPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user', '-password').populate('comments');
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

