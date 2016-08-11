import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    date: {type: Date, default: Date.now},
    content: String
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
