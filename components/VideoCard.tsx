"use client"
import { Eye, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Video {
  title: string
  thumbnail: string
  url: string
  description?: string
  views?: string
  duration?: string
  published?: string
}

interface VideoCardProps {
  video: Video
  index: number
  onClick: (video: Video) => void
}

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  return (
    <motion.button
      onClick={() => onClick(video)}
      className="group block w-full text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{ y: -8 }}
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />

        <div className="relative bg-[#1a1a24] rounded-2xl overflow-hidden border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300">
          <div className="relative aspect-video bg-black overflow-hidden">
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {video.views && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-2xl px-3 py-1.5 rounded-full text-xs text-white font-semibold border border-white/20 shadow-2xl">
                <Eye className="w-3.5 h-3.5" />
                <span>{video.views}</span>
              </div>
            )}

            {video.duration && (
              <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-2xl px-3 py-1.5 rounded-lg text-xs text-white font-bold border border-white/20 shadow-2xl">
                {video.duration}
              </div>
            )}
          </div>

          <div className="p-4 space-y-2">
            <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300">
              {video.title}
            </h3>

            {video.description && (
              <div>
                <motion.div
                  initial={false}
                  animate={{ height: showFullDescription ? "auto" : "2.5rem" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-400 leading-relaxed">{video.description}</p>
                </motion.div>
                {video.description.length > 100 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowFullDescription(!showFullDescription)
                    }}
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors"
                  >
                    {showFullDescription ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        Show more
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {video.published && <p className="text-xs text-gray-500">{video.published}</p>}
          </div>
        </div>
      </div>
    </motion.button>
  )
}
