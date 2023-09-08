import {useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {Image} from 'cloudinary-react';

/**
 * ImageUploader component allows users to upload images to Cloudinary.
 * @param {Object} props - The component properties.
 * @param {string} props.initialImage - The initial image URL to display.
 * @param {function} props.onImageUpload - Callback executed after an image has been uploaded.
 * @return {JSX.Element} The rendered component.
 */
export default function ImageUploader({initialImage, onImageUpload}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getSignature = async () => {
    const response = await fetch('/api/sign');
    const data = await response.json();
    const {signature, timestamp} = data;
    return {signature, timestamp};
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/dubu/upload`;

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

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        setUploadedFiles((old) => [...old, data]);
        onImageUpload(data.secure_url);
      } catch (error) {
        console.error('Error parsing response to JSON', error);
        console.log('Response text', responseText);
      }
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
    <div {...getRootProps()} className={`${isDragActive ? 'bg-blue-300' : 'bg-gray-200'} border p-4 rounded cursor-pointer`}>
      <input {...getInputProps()} />
      <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>
      <ul>
        {uploadedFiles.map((file, i) => (
          <li key={i}>
            <Image
              cloudName="dubu"
              publicId={file.secure_url.split('/').pop().split('.')[0]}
              width="100"
              crop="scale"
              alt={`Image ${i + 1}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
