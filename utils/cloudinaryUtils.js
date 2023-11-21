const generateSignature = (cloudinary, timestamp) => {
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: 'thelibrary',
    },
    cloudinary.config().api_secret
  );

  return signature;
};

module.exports = {
  generateSignature,
};