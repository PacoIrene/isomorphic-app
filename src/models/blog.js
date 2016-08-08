import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    blogId: { type: String, unique: true, index: true },
    title: String,
    date: {type: Date, default: Date.now},
    content: String
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
