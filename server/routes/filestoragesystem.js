const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const User=require("../model/users");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;


const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
var mime = {

 pdf: 'application/pdf',
  css: 'text/css',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};
// Configure AWS S3 client

// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.REGION
// });

// // Configure Multer to store uploaded files in S3
// const upload = multer({
  
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       console.log(file);
//       console.log(process.env.AWS_SECRET_ACCESS_KEY);
//       cb(null,file.originalname);
//     }
//   })
// });

// // Set up an endpoint for handling file uploads
// router.post('/upload', upload.single('file'),async (req, res, next) => {
//   // Get the uploaded file and do whatever you need to do with it
//   const file = req.file;
//   console.log("file");
//   if (!file) {
//     const error = new Error('Please upload a file');
//     error.status = 400;
//     return next(error);
//   }
//   res.send(file);
// });

// // Set up an endpoint for downloading files
// router.get('/download/:key', (req, res, next) => {
//   // Get the key of the file to download from the URL parameters
//   const key = req.params.key;

//   // Create a signed URL for the file to allow downloading
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: key
//   };
//   s3.getSignedUrl('getObject', params, (err, url) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect(url);
//   });
// });

// // Set up an endpoint for deleting files
// router.delete('/delete/:key', (req, res, next) => {
//   // Get the key of the file to delete from the URL parameters
//   const key = req.params.key;

//   // Delete the file from S3
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: key
//   };
//   s3.deleteObject(params, (err, data) => {
//     if (err) {
//       return next(err);
//     }
//     res.send('File deleted successfully');
//   });
// });

// // Export the router for use in the app
// 
; // or any other file upload middleware

// Create an instance of the AWS S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     region: process.env.REGION
});

// Set up multer middleware to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

// Define an Express route to handle file uploads
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  try {
 

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };

    const s3Data = await s3.upload(uploadParams).promise();
console.log(s3Data.Location)
const user=await User.findOne(req.body);
console.log(user);
 if(user){
   const fileurl=await user.addfile(s3Data.Key,s3Data.Bucket);
   await user.save();
   res.status(201).json({message:"File Url "})
 }
    return res.json({ fileLink: s3Data.Location });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});
router.get("/get",async (req,res)=>{
   // or req.query.link, depending on how you're passing the link

  try {
    const user = await User.findOne({phone:"8795730211"});
    
      console.log(user.file);
    
  
const key="EXP-1.pdf";
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: "EXP-1.pdf",
   
      // ResponseContentType: mimeType,
    };
    const fg=key.split('.').pop();
    console.log(fg);
    const s3stream = await s3.getObject(s3Params).promise();
   
    // Set the response headers to indicate that the content should be downloaded as a file
    res.set('Content-Type',"application/octet-stream");
    res.set('Content-Disposition', `attachment; filename=${key}`);

    // Send the file content as a downloadable attachment
    res.status(200).json(s3stream);
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
})
module.exports = router;