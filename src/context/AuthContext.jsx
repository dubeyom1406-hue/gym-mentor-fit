import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUser = JSON.parse(userInfo);
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${parsedUser.token}`,
                        },
                    };
                    const { data } = await api.get('/api/auth/profile', config);
                    // Merge the token from localStorage as the profile endpoint might not return it
                    const updatedUser = { ...data, token: parsedUser.token };
                    setUser(updatedUser);
                    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    // If token is invalid/expired, logout
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        try {
            fetchUserProfile();
        } catch (error) {
            console.error('Error initializing auth context:', error);
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await api.post(
            '/api/auth/login',
            { email, password },
            config
        );

        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const signup = async (name, email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await api.post(
            '/api/auth/signup',
            { name, email, password },
            config
        );

        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const updateProfile = async (user) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token || JSON.parse(localStorage.getItem('userInfo')).token}`,
            },
        };

        const { data } = await api.put(
            '/api/auth/profile',
            user,
            config
        );

        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        googleLogin: async () => {
            try {
                // Check if auth and googleProvider are available
                if (!auth || !googleProvider) {
                    throw new Error('Firebase authentication not initialized');
                }

                const result = await signInWithPopup(auth, googleProvider);
                // The signed-in user info.
                const user = result.user;

                // Send user info to backend to create session/account
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const { data } = await api.post(
                    '/api/auth/google',
                    {
                        email: user.email,
                        name: user.displayName || user.email.split('@')[0],
                        googleId: user.uid
                    },
                    config
                );

                localStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                return data;
            } catch (error) {
                console.error("Google Sign In Error", error);
                throw error;
            }
        },
    };

    // Always render children, but show a loading indicator if needed
    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="flex items-center justify-center min-h-screen bg-black">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};