import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(
            "-password -email -__v"
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { following: req.params.id } },
            { new: true }
        );
        await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { followers: req.user._id } },
            { new: true }
        );
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        if (!userToUnfollow) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.params.id } },
            { new: true }
        );
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { followers: req.user._id } },
            { new: true }
        );
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate(
            "followers",
            "_id username profilePic"
        );
        res.status(200).json({ followers: user.followers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate(
            "following",
            "_id username profilePic"
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ following: user.following });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
