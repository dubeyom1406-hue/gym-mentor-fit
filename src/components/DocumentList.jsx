import React, { useState, useEffect } from 'react';
import api, { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { FileText, Download } from 'lucide-react';

const DocumentList = () => {
    const { user } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await api.get('/api/documents/my', config);
                setDocuments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDocuments();
        }
    }, [user]);

    if (loading) return <div className="text-gray-400">Loading plans...</div>;

    if (documents.length === 0) {
        return (
            <div className="bg-black/50 p-6 rounded-xl border border-white/5 text-center">
                <FileText className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">No plans uploaded yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
                <div key={doc._id} className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-primary/50 transition-colors">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
                        <div className="min-w-0">
                            <h4 className="text-white font-medium truncate">{doc.title}</h4>
                            <p className="text-xs text-gray-500">{new Date(doc.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <a
                        href={`${API_URL}/${doc.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-lg hover:bg-primary hover:text-white text-gray-400 transition-colors"
                        title="Download PDF"
                    >
                        <Download className="h-5 w-5" />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default DocumentList;
