'use client'

import Image from 'next/image';
import { useState } from 'react';

const EngageWithShortVideos: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const url = URL.createObjectURL(event.target.files[0]);
            setVideoUrl(url);
        }
    };

    return (
        <section className="bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Engage with Short Videos</h2>
                <p className="text-lg text-center mb-8">
                    Create and share short videos related to supporting black-owned businesses, community building, and other relevant topics. Engage with the community through comments, likes, or shares.
                </p>
                <div className="flex justify-center items-center">
                    {videoUrl ? (
                        <video src={videoUrl} controls className="w-full max-w-lg rounded-lg shadow-lg" />
                    ) : (
                        <div className="w-full max-w-lg p-12 border-2 border-dashed border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center">
                             <video autoPlay loop style={{ width: '500px', height: '500px' }}>
                                <source src="videos/staticvid1.mp4" />
                            </video>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EngageWithShortVideos;
