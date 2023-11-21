import React, {useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {Cloudinary} from '@cloudinary/url-gen';
import {AdvancedImage, responsive, placeholder} from '@cloudinary/react';
import Image from 'next/image';

const cloudName = 'dubu';

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

export default function ImageUploader({initialImage, onImageUpload}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getSignature = async () => {
    const response = await fetch('/api/sign');
    const data = await response.json();
    const {signature, timestamp} = data;
    return {signature, timestamp};
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const {signature, timestamp} = await getSignature();

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

      const response = await fetch(url, {
        method: 'post',
        body: formData,
      });

      if (!response.ok) {
        console.error('Fetch error:', response.statusText);
        return;
      }

      const data = await response.json();
      setUploadedFiles((old) => [...old, data]);
      onImageUpload(data.secure_url);
    });
  }, [onImageUpload]);

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
      <div {...getRootProps()} className={`${isDragActive ? 'bg-blue-300' : 'bg-gray-200'} border p-4 rounded cursor-pointer`}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>
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
