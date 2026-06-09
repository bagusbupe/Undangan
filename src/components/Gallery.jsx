import { useState } from 'react';

const DEFAULT_IMAGES = [
  '/share/Image1.jpeg',
  '/share/Image2.jpeg',
  '/share/Image3.jpeg',
  '/share/Image4.jpeg',
  '/share/Image6.jpeg',
  '/share/Image7.jpeg',
  '/share/Image8.jpeg',
  '/share/Image9.jpeg',
  '/share/Image10.jpeg',
];

export default function Gallery({ images }) {
  const list = images && images.length > 0 ? images : DEFAULT_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const displayIndex = currentIndex >= list.length ? 0 : currentIndex;

  return (
    <div className="mt-8 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-nameFont1 text-primary mb-6 text-center">
        Gallery
      </h2>

      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <img
            src={list[displayIndex]}
            alt={`Gallery ${displayIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full hover:bg-opacity-80 transition"
          title="Previous"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full hover:bg-opacity-80 transition"
          title="Next"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {displayIndex + 1} / {list.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {list.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition ${
              displayIndex === index ? 'ring-2 ring-primary' : 'opacity-60'
            }`}
          >
            <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
