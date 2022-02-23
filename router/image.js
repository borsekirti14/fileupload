const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: 'mongodb://localhost/image_upload',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-img-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: 'images',
      filename: `${Date.now()}-img-${file.originalname}`
    };
  }
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadedFiles = util.promisify(uploadFiles);
module.exports = uploadedFiles;