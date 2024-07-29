const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');

const storeImageCloudinary = async (fileName) => {
  cloudinary.config({
    cloud_name:     process.env.CLOUDINARY_CLOUD_NAME,
    api_key:        process.env.CLOUDINARY_API_KEY,
    api_secret:     process.env.CLOUDINARY_API_SECRET
  })
  const uploadResult = await cloudinary.uploader.upload(`components/animals/uploads/${fileName}`,{invalidate: true})
  const urlImage = uploadResult.url
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