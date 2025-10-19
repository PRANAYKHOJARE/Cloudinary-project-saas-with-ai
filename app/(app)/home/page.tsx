"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    return () => {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }, []);

  // ✅ Better Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading videos...
        </div>
      </div>
    );
  }

  // ✅ Error Message UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-red-500 bg-red-100 px-4 py-2 rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Videos</h1>
        <p className="text-gray-500 text-lg">
          Browse, watch, and download your uploaded content.
        </p>
      </div>

      {/* Videos Section */}
      <div className="max-w-6xl mx-auto">
        {videos.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-10">
            No videos available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
