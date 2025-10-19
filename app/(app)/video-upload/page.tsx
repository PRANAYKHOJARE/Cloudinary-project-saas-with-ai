"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Max file size 70MB
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large (Max 70MB)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-16 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Upload Video
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full rounded-lg"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full rounded-lg"
              placeholder="Write a short description..."
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Video File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file-input file-input-bordered w-full rounded-lg"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Max file size: 70MB</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${
              isUploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="loading loading-spinner loading-sm mr-2"></span>
            ) : null}
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;
