const generateSignature = (cloudinary, timestamp, folderName) => {
  const paramsToSign = {
    timestamp: timestamp,
    folder: folderName,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    cloudinary.config().api_secret,
  );

  return signature;
};

module.exports = {
  generateSignature,
};
