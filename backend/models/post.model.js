import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      
    },
    image: {
        type: String,
        required: true,
        default :""
    },
    title: {
        type: String,
      
    },
    description: {
        type: String,
        
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    location: {
        type: String,
       
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],

},{timestamps:true});

const Post = mongoose.model("Post", postSchema);
export default Post;