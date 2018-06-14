var express = require('express');

var app = express();
var fs=require("fs");
var bodyParser= require("body-parser");
 var path =require('path');
var dbroutes = require('./routes/dbroutes');
var fileUpload = require('express-fileupload');

var app = express();
//for parsing the incoming request
app.use(bodyParser.urlencoded());
//parse the file that is uploaded
app.use(fileUpload());
//To create listener
//To join a route
app.use("/dbroutes",dbroutes);
app.listen(4500, function(){
    console.log("server is running on 4500");
});
//configuring view templates
app.set('views',__dirname+'/public/templates');
app.set('view engine','ejs');
//handling requests
app.get('/',function(request,response)
{
    response.send('hi from cap');
});
app.post("/store",function(request,response){
    if(request.files)
    {
        let regex =/\.(docx|doc|pdf)$/;
        let filename = request.files.resume.name;
       // console.log(request.files.resume.name);
        if(regex.test(filename)){
            request.files.resume.mv("resumes/"+filename,function(err)
        {
            if(err){
                response.send("resume not stored and so is data");
            }
        })

        }
        else 
        response.send("Data not send please upload DOC or Pdf");
    }
    else 
    response.send("Please upload file");
var sno = request.body.sno;
var name = request.body.name;
var city = request.body.city;
var obj = {sno:sno,name:name,city:city};
//obj = JSON.stringify(obj);
fs.readFile("data/info.txt",'utf8',function(err,data){
    //reading the existing file
    if(err)
    response.send("error in manipulating data");
    var temp =JSON.parse(data);
    temp.push(obj);
    temp=JSON.stringify(temp);
    fs.writeFile("data/info.txt",temp,function(err){
        if(err)
        response.send("Data not send!");
        response.send("Data  stored ino file");
    });

});
});
// fs.appendFile("data/info.txt",obj,function(err){
// if(err)
// {
// response.send("Data not send!");
// }
// response.send("Response stored ino file");
// });


// app.get("/table",function(request,response){
//     fs.readFile("data/info.txt",'utf8',function(err,obj){
//         if(err)
//         response.send("NO DATA");
//         let info=JSON.parse(obj);
//         response.render("table",{data:info});
//     });
// });


//static file paths
app.use(express.static(__dirname +'/public/styles'));
app.use(express.static(__dirname +'/public/scripts'));
app.use(express.static(__dirname +'/bower_components'));
app.use(express.static(__dirname+'/public/amodule'));


app.get('/home',function(request,response)
{
    // response.send('homepage');
    response.sendFile(__dirname +"/public/views/index.html");
});

app.get('/restclient',function(request,response)
{
    // response.send('homepage');
    response.sendFile(__dirname +"/public/views/angular.html");
});
