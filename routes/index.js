const path = require('path');

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/'));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'application/pdf' || file.mimetype == 'text/plain') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf, and .txt format allowed!'));
    }
  },
});

// User model
let Files = require('../models/index');

router.post('/upload', upload.array('filesArray', 10), (req, res, next) => {
  // const reqFiles = [];
  const url = req.protocol + '://' + req.get('host');
  for (var i = 0; i < req.files.length; i++) {
    // reqFiles.push(req.files[i].filename);

    const file = new Files({
      files: req.files[i].filename,
      filePath: url,
    });

    file
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'Done upload!',
          userCreated: {
            _id: result._id,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  }

  // const file = new Files({
  //   files: reqFiles,
  //   filePath: url,
  // });

  // file
  //   .save()
  //   .then((result) => {
  //     res.status(201).json({
  //       message: 'Done upload!',
  //       userCreated: {
  //         _id: result._id,
  //       },
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err),
  //       res.status(500).json({
  //         error: err,
  //       });
  //   });
});

router.get('/', (req, res, next) => {
  Files.find()
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .then((data) => {
      res.status(200).json({
        message: 'User list retrieved successfully!',
        files: data,
      });
    });
});

module.exports = router;
