import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import { Users } from 'lucide-react';

const Community = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await api.get('/api/posts', config);
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPosts();
        }
    }, [user]);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handlePostDeleted = (postId) => {
        setPosts(posts.filter((post) => post._id !== postId));
    };

    return (
        <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Community Feed</h1>
                        <p className="text-gray-400">Share your journey and connect with others</p>
                    </div>
                </div>

                <CreatePost onPostCreated={handlePostCreated} />

                {loading ? (
                    <div className="text-center text-white">Loading feed...</div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                onDelete={handlePostDeleted}
                            />
                        ))}
                        {posts.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No posts yet. Be the first to share!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;
