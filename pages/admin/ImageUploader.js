import { AdvancedImage, placeholder, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export default function ImageUploader({ initialImage, onImageUpload }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentImage, setCurrentImage] = useState(initialImage);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      acceptedFiles.forEach(async (acceptedFile) => {
        const formData = new FormData();
        formData.append('file', acceptedFile);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Image upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          setUploadedFiles((old) => [...old, data]);
          onImageUpload(data.secure_url);
        } catch (error) {
          console.error('Upload error:', error);
          setErrorMessage('Failed to upload image. Please try again.');
        }
      });
    },
    [onImageUpload],
  );

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const latestImage = uploadedFiles[uploadedFiles.length - 1].secure_url;
      setCurrentImage(latestImage);
    }
  }, [uploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: 'image/*',
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? 'bg-blue-300' : 'bg-gray-200'
        } border p-4 rounded cursor-pointer`}
      >
        <input {...getInputProps()} />
        <p>
          Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
          imagen
        </p>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <AdvancedImage
                style={{ maxWidth: '100%' }}
                cldImg={cld.image(file.public_id)}
                plugins={[responsive(), placeholder()]}
                alt={`Uploaded Image ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      {currentImage && (
        <div className="my-6">
          <p className="text-lg font-medium text-gray-700 mb-2">Portada:</p>
          <Image
            src={currentImage}
            alt="Current Image"
            width={500}
            height={750}
          />
        </div>
      )}
    </div>
  );
}
