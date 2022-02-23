const upload = require("../router/image");
// const dbConfig = require("../config/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = 'mongodb://localhost/image_upload';
const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    return res.send({
      message: "File has been uploaded.",
    });
    
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};
const getListFiles = async (req, res) => {
    console.log("i am called")
    // console.log(req)
  try {
    await mongoClient.connect();
    const database = mongoClient.db('mongodb://localhost/image_upload');
    const images = database.collection('images' + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: 'http://localhost:3002/files/' + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('mongodb://localhost/imageupload');
    const bucket = new GridFSBucket(database, {
      bucketName: 'images',
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  uploadFiles,
  getListFiles,
  download,
};