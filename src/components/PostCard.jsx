import React from 'react';
import api, { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Heart, Trash2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const PostCard = ({ post, onDelete }) => {
    const { user } = useAuth();
    const [likes, setLikes] = React.useState(post.likes);
    const isLiked = likes.includes(user?._id);

    const handleLike = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.put(`/api/posts/${post._id}/like`, {}, config);
            setLikes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Delete this post?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await api.delete(`/api/posts/${post._id}`, config);
                onDelete(post._id);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 p-6 rounded-xl border border-white/10 mb-4"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {post.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="text-white font-medium">{post.user.name}</h4>
                        <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                {(user?._id === post.user._id || user?.isAdmin) && (
                    <button
                        onClick={handleDelete}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                )}
            </div>

            <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

            {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                        src={`${API_URL}/${post.image}`}
                        alt="Post content"
                        className="w-full h-auto object-cover max-h-96"
                    />
                </div>
            )}

            <div className="flex items-center space-x-6 text-gray-400 border-t border-white/10 pt-4">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
                >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likes.length}</span>
                </button>
                {/* Comments feature could be added later */}
                {/* <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Comment</span>
                </button> */}
            </div>
        </motion.div>
    );
};

export default PostCard;
