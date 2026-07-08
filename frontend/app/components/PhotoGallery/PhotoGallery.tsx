'use client';

import { motion } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  gallery: string[];
}

export default function PhotoGallery({ gallery }: PhotoGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-black font-display text-stone-900 flex items-center gap-2">
        <ImageIcon className="text-red-650" size={18} />
        Galerie d'activités
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {gallery[0] && (
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            className="sm:col-span-8 h-64 rounded-3xl overflow-hidden bg-stone-100 shadow-xs group border border-white cursor-zoom-in relative"
          >
            <img
              src={gallery[0]}
              alt="Operation terrain 1"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-3.5 bg-white/90 rounded-full text-red-650 shadow-md backdrop-blur-xs">
                <ImageIcon size={18} />
              </div>
            </div>
          </motion.div>
        )}
        {gallery[1] && (
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            className="sm:col-span-4 h-64 rounded-3xl overflow-hidden bg-stone-100 shadow-xs group border border-white cursor-zoom-in relative"
          >
            <img
              src={gallery[1]}
              alt="Operation terrain 2"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-3.5 bg-white/90 rounded-full text-red-650 shadow-md backdrop-blur-xs">
                <ImageIcon size={18} />
              </div>
            </div>
          </motion.div>
        )}
        {gallery[2] && (
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            className="sm:col-span-4 h-48 rounded-3xl overflow-hidden bg-stone-100 shadow-xs group border border-white cursor-zoom-in relative"
          >
            <img
              src={gallery[2]}
              alt="Operation terrain 3"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-3.5 bg-white/90 rounded-full text-red-650 shadow-md backdrop-blur-xs">
                <ImageIcon size={18} />
              </div>
            </div>
          </motion.div>
        )}
        {gallery[3] && (
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            className="sm:col-span-8 h-48 rounded-3xl overflow-hidden bg-stone-100 shadow-xs group border border-white cursor-zoom-in relative"
          >
            <img
              src={gallery[3]}
              alt="Operation terrain 4"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-3.5 bg-white/90 rounded-full text-red-650 shadow-md backdrop-blur-xs">
                <ImageIcon size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
