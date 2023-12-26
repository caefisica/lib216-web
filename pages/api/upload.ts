import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
  api: {
    bodyParser: false,
  },
};

function checkEnvVariables(...variables: string[]): boolean {
  return variables.every(
    (variable) => typeof process.env[variable] === 'string',
  );
}

export default async function POST(req: NextRequest) {
  const areEnvVariablesDefined = checkEnvVariables(
    'SIGN_API_BASE_URL',
    'SIGN_API_AUTH_TOKEN',
    'CLOUDINARY_FOLDER_NAME',
    'CLOUDINARY_API_KEY',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  );

  if (!areEnvVariablesDefined) {
    console.error('Missing required environment variables');
    return new NextResponse(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500 },
    );
  }

  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // Internal API to sign the upload request, it can't be done in Edge Runtime
    // because Cloudinary does not support this.
    // See: https://github.com/caefisica/cloudinary_signature
    const apiUrl = `${process.env.SIGN_API_BASE_URL}/api/sign`;

    const signResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': process.env.SIGN_API_AUTH_TOKEN,
      },
      body: JSON.stringify({ folder: process.env.CLOUDINARY_FOLDER_NAME }),
    });

    const { signature, timestamp } = await signResponse.json();

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('signature', signature);
    uploadFormData.append('timestamp', timestamp);
    uploadFormData.append('api_key', process.env.CLOUDINARY_API_KEY);
    uploadFormData.append('folder', process.env.CLOUDINARY_FOLDER_NAME);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      },
    );

    if (!cloudinaryResponse.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const uploadData = await cloudinaryResponse.json();
    return new NextResponse(
      JSON.stringify({ secure_url: uploadData.secure_url }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error uploading image' }),
      { status: 500 },
    );
  }
}
