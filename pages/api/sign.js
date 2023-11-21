const cloudinary = require('../../config/cloudinaryConfig')();
const {generateSignature} = require('../../utils/cloudinaryUtils');

const handleRequest = async (_req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = generateSignature(cloudinary, timestamp);

    res.status(200).json({signature, timestamp});
  } catch (error) {
    console.error('Error in /api/sign:', error.message);
    res.status(500).json({error: 'Internal Server Error', details: error.message});
  }
};

export const config = {runtime: 'edge'};

export default handleRequest;
