
const { Router } = require('express');
const Photo = require('../model/Photo');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const router = Router();


router.get('/', async (req, res) => {
    const photos = await Photo.find();
    res.render('images', { photos })
})


router.get('/image/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('image_form', { photos })
});

router.post('/image/add', async (req, res) => {
console.log(req.body);
console.log(req.file);
const {  title ,  description } = req.body;
const result = await cloudinary.uploader.upload(req.file.path);
console.log(result)
   const newPhoto = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    const photos = await Photo.find();
    await res.redirect('/');
});

router.get('/images/delete/:photo_id', async (req, res) => {
   const { photo_id } = req.params;
   const photo = await Photo.findByIdAndDelete(photo_id);
   const result = await cloudinary.uploader.destroy(photo.public_id);
    console.log(result);
     await res.redirect('/');
})
module.exports = router;