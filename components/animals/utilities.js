const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');

const storeImageCloudinary = async (file) => {
  cloudinary.config({
    cloud_name:     process.env.CLOUDINARY_CLOUD_NAME,
    api_key:        process.env.CLOUDINARY_API_KEY,
    api_secret:     process.env.CLOUDINARY_API_SECRET,
    secure:         true,
  })
  const fileBuffer = file.buffer;
  const mime = file.mimetype;
  const encoding = 'base64';
  const base64Data = Buffer.from(fileBuffer).toString('base64');
  const fileUri = `data:${mime};${encoding},${base64Data}`;
  const uploadResult = await cloudinary.uploader.upload(fileUri, {invalidate: true })
  const urlImage = uploadResult.secure_url
  // const uploadResult = await cloudinary.uploader.upload(`components/animals/uploads/${file}`,{invalidate: true})
  //const urlImage = uploadResult.url
  return urlImage
}

const deleteLocalImageCopy = (fileName) => {
  const filepath = path.join(__dirname,'uploads',fileName)
  fs.unlink(filepath, (err) => {
      if(err){
          console.log(err)
      }
  })
}
module.exports = {
  storeImageCloudinary,
  deleteLocalImageCopy
}