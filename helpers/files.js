const Storage = require('@google-cloud/storage');
const Multer = require('multer');

const { CLOUD_BUCKET, GCLOUD_PROJECT, KEYFILE_PATH } = process.env;

const storage = Storage({
  projectId: GCLOUD_PROJECT,
  keyFilename: KEYFILE_PATH,
});

exports.multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
<<<<<<< HEAD
    fileSize: 50 * 1024 * 1024,
=======
    fileSize: 5 * 1024 * 1024,
>>>>>>> f0185eb795f1b0f1a1c70d3f8421b2d7c2a5951f
  },
});

const bucket = storage.bucket(CLOUD_BUCKET);

<<<<<<< HEAD
exports.sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;

  const publicUrl = `https://storage.googleapis.com/${CLOUD_BUCKET}/${gcsname}`;

  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', err => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = publicUrl;
      next();
    });
  });

  stream.end(req.file.buffer);
=======
const uploadSingleFile = function(inputFile) {
  return new Promise(function(resolve, reject) {
    const gcsname = Date.now() + inputFile.originalname;

    const publicUrl = `https://storage.googleapis.com/${CLOUD_BUCKET}/${gcsname}`;

    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: inputFile.mimetype,
      },
    });

    stream.on('error', err => {
      inputFile.cloudStorageError = err;
      reject(err);
    });

    stream.on('finish', () => {
      inputFile.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        inputFile.cloudStoragePublicUrl = publicUrl;
        resolve();
      });
    });

    stream.end(inputFile.buffer);
  });
};

exports.sendUploadToGCS = (req, res, next) => {
  if (!req.files) {
    return next();
  }

  Promise.all(req.files.map(file => uploadSingleFile(file))).then(values => {
    next();
  });
>>>>>>> f0185eb795f1b0f1a1c70d3f8421b2d7c2a5951f
};