var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log('storage.filename:', file);
    callback(null, file.fieldname + '.jpg');
  }
});
var upload = multer({ storage : storage, limits: {
  fieldNameSize: 100,
  fieldSize: 1e9,
  fileSize:1e9
}}).any();

app.use(function (err, req, res, next) {
  console.log('inside app.use');
  console.log(err) // <-- this should show you the fieldname of the offending file
  console.log(err.stack)
});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
  console.log('I am here');
  //console.dir(req);
    upload(req,res,function(err) {

        console.log('inside upload');
        if(err) {
            console.log("Error uploading file.");
            console.dir(err);
            return res.end("Error uploading file.");

        }
        console.log("File is uploaded");
        res.end("File is uploaded");
    });
});

app.listen(4000, '192.168.24.166', function(){
    console.log("Working on port 4000");
});