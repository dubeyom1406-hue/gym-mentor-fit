import React, { useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Image, Send } from 'lucide-react';

const CreatePost = ({ onPostCreated }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !image) return;

        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.post('/api/posts', formData, config);
            onPostCreated(data);
            setContent('');
            setImage(null);
        } catch (error) {
            console.error(error);
            alert('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondary/30 p-4 rounded-xl border border-white/10 mb-6">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none mb-4"
                    placeholder="Share your progress..."
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {image && (
                    <div className="mb-4 relative">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="max-h-64 rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setImage(null)}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                        >
                            &times;
                        </button>
                    </div>
                )}
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <label className="cursor-pointer text-gray-400 hover:text-primary transition-colors flex items-center">
                        <Image className="h-5 w-5 mr-2" />
                        <span className="text-sm">Add Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={loading || (!content.trim() && !image)}
                        className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Posting...' : (
                            <>
                                <Send className="h-4 w-4 mr-2" /> Post
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
