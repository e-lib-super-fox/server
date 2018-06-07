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
    fileSize: 50 * 1024 * 1024,
  },
});

const bucket = storage.bucket(CLOUD_BUCKET);

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
};