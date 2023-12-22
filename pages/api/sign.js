const cloudinary = require('../../config/cloudinaryConfig')();
const {generateSignature} = require('../../utils/cloudinaryUtils');

const handleRequest = async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folderName = req.body.folder;
    const signature = generateSignature(cloudinary, timestamp, folderName);

    res.status(200).json({signature, timestamp});
  } catch (error) {
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    res
        .status(500)
        .json({error: 'Internal Server Error', details: error.message});
  }
};

export const config = {
  // runtime: 'edge',
  unstable_allowDynamic: [
    '**/node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/*.js',
    '**/node_modules/.pnpm/core-js@3.33.3/node_modules/core-js/internals/*.js',
  ],
};

export default handleRequest;
