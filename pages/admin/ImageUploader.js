import React, {useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {Cloudinary} from '@cloudinary/url-gen';
import {AdvancedImage, responsive, placeholder} from '@cloudinary/react';
import Image from 'next/image';

const cloudName = 'dubu';
const folderName = 'thelibrary';
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

export default function ImageUploader({initialImage, onImageUpload}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getSignature = async (folderName) => {
    try {
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({folder: folderName}),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      return {signature: data.signature, timestamp: data.timestamp};
    } catch (error) {
      console.error('Error fetching signature:', error);
      throw error;
    }
  };

  const onDrop = useCallback(
      async (acceptedFiles) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        const {signature, timestamp} = await getSignature(folderName);

        acceptedFiles.forEach(async (acceptedFile) => {
          const formData = new FormData();
          formData.append('file', acceptedFile);
          formData.append('signature', signature);
          formData.append('timestamp', timestamp);
          formData.append('api_key', apiKey);
          formData.append('folder', folderName);

          const response = await fetch(url, {
            method: 'post',
            body: formData,
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Fetch error:', response.statusText, errorResponse);
            return;
          }

          const data = await response.json();
          setUploadedFiles((old) => [...old, data]);
          onImageUpload(data.secure_url);
        });
      },
      [onImageUpload],
  );

  useEffect(() => {
    if (initialImage) {
      setUploadedFiles([{secure_url: initialImage}]);
    }
  }, [initialImage]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
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
        <ul>
          {uploadedFiles.map((file, i) => (
            <li key={i}>
              <AdvancedImage
                style={{maxWidth: '100%'}}
                cldImg={cld.image(file.public_id)}
                plugins={[responsive(), placeholder()]}
                alt={`Uploaded Image ${i + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      {initialImage && (
        <div className="my-6">
          <p className="text-lg font-medium text-gray-700 mb-2">Portada:</p>
          <Image
            src={initialImage}
            alt="Current Image"
            width={500}
            height={750}
          />
        </div>
      )}
    </div>
  );
}
