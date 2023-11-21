const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  const config = {
    cloud_name: 'dubu',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  };

  // Validar que la configuración de Cloudinary esté completa
  if (!config.api_key || !config.api_secret) {
    throw new Error("La configuración de Cloudinary no está completa.");
  }

  cloudinary.config(config);
  return cloudinary;
};

module.exports = configureCloudinary;
