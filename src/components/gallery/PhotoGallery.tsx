import { useState, useEffect } from 'react';

interface Foto {
  url: string;
  descripcion?: string;
}

interface PhotoGalleryProps {
  images: Foto[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Foto | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* 1. GRID DE MINIATURAS (Igual que antes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div 
            key={index}
            className="group relative h-64 overflow-hidden rounded-xl cursor-pointer bg-slate-800"
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img.url} 
              alt={img.descripcion || `Foto ${index}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-3xl">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. LIGHTBOX (MODAL) - CORREGIDO */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-5 right-5 text-white text-4xl hover:text-amber-500 transition-colors z-50 cursor-pointer bg-transparent border-none outline-none"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>

          {/* CAMBIO CLAVE AQUÍ: 
             Quitamos 'w-full' forzado y usamos flex para centrar.
             Limitamos el contenedor al 95% del viewport.
          */}
          <div 
            className="relative flex flex-col items-center justify-center max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.descripcion} 
              // CAMBIO CLAVE: max-h-[85vh] asegura que la imagen deje espacio para texto y márgenes
              // max-w-full asegura que no se salga de ancho
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-slate-700"
            />
            
            {selectedImage.descripcion && (
              <p className="mt-4 text-center text-slate-300 text-lg font-medium bg-black/50 px-4 py-2 rounded-full">
                {selectedImage.descripcion}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}