
import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ImageDisplay } from './components/ImageDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoaderIcon } from './components/Icons';
import type { RestorationOptions, ImageFile } from './types';
import { restorePhoto } from './services/geminiService';

const initialOptions: RestorationOptions = {
  mainRequest: 'high_quality',
  gender: 'not_specified',
  age: '',
  keepId: true,
  remakeHair: false,
  remakeClothes: false,
  additionalRequest: '',
};

const App: React.FC = () => {
  const [options, setOptions] = useState<RestorationOptions>(initialOptions);
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage({
          file: file,
          base64: reader.result as string,
        });
        setRestoredImage(null);
        setError(null);
      };
      reader.onerror = () => {
        setError("Không thể đọc tệp hình ảnh. Vui lòng thử lại.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = useCallback(() => {
    setOptions(initialOptions);
    setOriginalImage(null);
    setRestoredImage(null);
    setError(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!originalImage) {
      setError('Vui lòng tải ảnh gốc lên trước.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRestoredImage(null);

    try {
      const resultBase64 = await restorePhoto(originalImage, options);
      setRestoredImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError('Đã xảy ra lỗi trong quá trình phục chế ảnh. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, options]);

  const downloadImage = (format: 'png' | 'jpeg') => {
    if (!restoredImage) return;

    const mimeType = `image/${format}`;
    const link = document.createElement('a');
    link.download = `restored_image.${format}`;

    if (format === 'png') {
        link.href = restoredImage;
        link.click();
    } else {
        const img = new Image();
        img.src = restoredImage;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                link.href = canvas.toDataURL(mimeType);
                link.click();
            }
        };
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex-grow container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center z-50 rounded-lg">
            <LoaderIcon className="animate-spin h-12 w-12 text-cyan-400" />
            <p className="mt-4 text-lg font-semibold">Đang xử lý, vui lòng chờ...</p>
          </div>
        )}
        <ControlPanel 
          options={options} 
          setOptions={setOptions} 
          onReset={handleReset} 
          onGenerate={handleGenerate}
          isGenerating={isLoading}
          isImageUploaded={!!originalImage}
        />
        <ImageDisplay
          title="Ảnh Gốc"
          imageUrl={originalImage?.base64}
          onImageUpload={handleImageUpload}
          hasUpload={true}
        />
        <ImageDisplay
          title="Kết quả"
          imageUrl={restoredImage}
          onDownloadPNG={() => downloadImage('png')}
          onDownloadJPG={() => downloadImage('jpeg')}
          hasDownload={true}
        />
      </main>
      {error && (
        <div className="container mx-auto mt-4 p-4 bg-red-800 border border-red-600 rounded-lg text-center text-white">
          {error}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
