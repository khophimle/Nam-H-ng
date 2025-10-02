
import React from 'react';
import { Panel } from './Panel';
import { UploadIcon, DownloadIcon, ImageIcon } from './Icons';

interface ImageDisplayProps {
  title: string;
  imageUrl?: string | null;
  onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadPNG?: () => void;
  onDownloadJPG?: () => void;
  hasUpload?: boolean;
  hasDownload?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  title,
  imageUrl,
  onImageUpload,
  onDownloadPNG,
  onDownloadJPG,
  hasUpload = false,
  hasDownload = false,
}) => {
  return (
    <Panel title={title} className="lg:col-span-1">
      <div className="flex flex-col h-full">
        <div className="flex-grow bg-slate-900/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-700 p-2">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-md" />
          ) : (
            <div className="text-center text-slate-500">
              <ImageIcon className="w-16 h-16 mx-auto" />
              <p className="mt-2">{title === 'Ảnh Gốc' ? 'Chưa có ảnh nào được tải lên' : 'Kết quả sẽ hiển thị ở đây'}</p>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 pt-4">
          {hasUpload && onImageUpload && (
            <>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={onImageUpload}
              />
              <label
                htmlFor="file-upload"
                className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 transition-colors text-slate-300 font-semibold py-3 px-4 rounded-lg cursor-pointer"
              >
                <UploadIcon className="w-5 h-5" />
                <span>Tải ảnh lên</span>
              </label>
            </>
          )}
          {hasDownload && imageUrl && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onDownloadPNG}
                className="w-full flex items-center justify-center space-x-2 bg-cyan-700 hover:bg-cyan-600 transition-colors text-white font-semibold py-3 px-4 rounded-lg"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Lưu ảnh (PNG)</span>
              </button>
              <button
                onClick={onDownloadJPG}
                className="w-full flex items-center justify-center space-x-2 bg-cyan-700 hover:bg-cyan-600 transition-colors text-white font-semibold py-3 px-4 rounded-lg"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Lưu ảnh (JPG)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
};
