import React, { useState } from "react";

interface ImageData {
  path: string;
  alt: string;
}

export default function ImageModal({
  path,
  alt,
  className,
}: {
  path: string;
  alt: string;
  className: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState<ImageData>({
    path: "",
    alt: "",
  });

  function openModal() {
    setSelectedImageData({ path, alt });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <img
        src={path}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={(e) => {
          openModal();
        }}
      />
      <Image
        isOpen={isModalOpen}
        imageData={selectedImageData}
        onClose={closeModal}
      />
    </div>
  );
}

function Image({
  isOpen,
  imageData,
  onClose,
}: {
  isOpen: boolean;
  imageData: ImageData;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  const { path, alt } = imageData;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <img
        src={path}
        alt={alt}
        className="max-h-full max-w-full"
        onClick={onClose}
      />
    </div>
  );
}
