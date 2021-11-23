//jshint esversion:6
// --- usual boiler + content --- //

const express = require("express");
const https = require("https");
const ejs = require("ejs");
var _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let composeItem = "";
let Posts = [];



const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

// --- end of usual boiler + content --- //

// ------------------------------------- // 

// --- render different pages --- //

app.get("/", function(req, res){
  res.render("home", {homeContent: homeStartingContent, 
    homeNewContent: Posts,
    _:_
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/compose", function(req, res){
  res.render("compose", {composeItem: composeItem});
});

app.get("/posts/:postName/", function (req, res){

  const requestedTitle = _.kebabCase(req.params.postName);
  
  for (var i=0; i<Posts.length; i++){
    const storedTitle = _.kebabCase(Posts[i].title);
    if(storedTitle === requestedTitle){
      //console.log("exact match" + _.kebabCase(requestedTitle));
      res.render("post", {postTitle: Posts[i].title ,postContent: Posts[i].content});
    }else {
      console.log("Error 404: page not found");
    }
  }
  
});

// --- end of render different pages --- //

//--- post method to add new composition --- //

app.post("/compose", function(req, res){
  
  const Post = {
    title: req.body.newTitle,
    content: req.body.newPost
  };
  
  Posts.push(Post);
  
  res.redirect("/");

});

//--- end of post method to add new composition --- //

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
