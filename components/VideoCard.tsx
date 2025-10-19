import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@/types";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
    });
  }, []);

  const formatSize = useCallback((size: number) => filesize(size), []);
  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => setPreviewError(true);

  return (
    <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300">
      {/* Video / Thumbnail */}
      <div className="relative aspect-video">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <p className="text-red-500">Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-50 px-2 py-1 rounded-lg flex items-center text-sm">
          <Clock size={16} className="mr-1" />
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {video.title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {video.description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>

        {/* Sizes */}
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <FileUp size={18} className="text-purple-500" />
            <div>
              <div className="font-semibold">Original</div>
              <div>{formatSize(Number(video.originalSize))}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileDown size={18} className="text-blue-500" />
            <div>
              <div className="font-semibold">Compressed</div>
              <div>{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm font-semibold">
            Compression:{" "}
            <span className="text-green-500">{compressionPercentage}%</span>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            onClick={() =>
              onDownload(getFullVideoUrl(video.publicId), video.title)
            }
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
