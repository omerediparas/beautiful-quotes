import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var id = 0;
var posts = [
    {
      id: 1,
      title: "“The only limit to our realization of tomorrow is our doubts of today.”",
      content: "Franklin D. Roosevelt",
      author: "Admin",
      date: "2024-08-30"
    },
    {
      id: 2,
      title: "“In the end, we will remember not the words of our enemies, but the silence of our friends.”",
      content: "Martin Luther King Jr.",
      author: "Admin",
      date: "2024-08-29"
    },
    {
      id: 3,
      title: "“The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.”",
      content: "Ralph Waldo Emerson",
      author: "Admin",
      date: "2024-08-28"
    },
    {
      id: 4,
      title: "“It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.”",
      content: "Charles Darwin",
      author: "Admin",
      date: "2024-08-27"
    }
  ];


app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get('/',(req, res) => {
    res.render("index.ejs", {posts} );
});

app.get("/write",(req,res) => {
    res.render("write.ejs");
});
app.get("/edit/:id", (req,res) => {
    const postId = parseInt(req.params.id, 10);
    var post = posts.find(p=> p.id === postId);
    res.render("write.ejs", {post});
});
app.get("/post/:id",(req,res) => {
    const postId = parseInt(req.params.id, 10);
    var post = posts.find(p => p.id == postId);
    console.log(postId);
    res.render("posts.ejs", {post});
});

app.post("/", (req,res) => {

    var date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    var newPost = {
        id: (++id), title: req.body["title"], author:  req.body["author"], date: formattedDate, content:  req.body["content"]
    }
    
    posts.push(newPost);
    res.redirect("/");
});

app.post("/edit/:id", (req,res) => {

    const postId = parseInt(req.params.id, 10);

    var date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    
    let index = posts.findIndex(obj => obj.id === postId);
    if (index !== -1) {
        // Update the object at the found index
        posts[index] =   { id: postId, title: req.body["title"], author:  req.body["author"], date: formattedDate, content:  req.body["content"] }// Example update
        console.log(req.body["username"]);
        console.log(req.body["title"]);
    } 
    res.redirect("/");
});
app.get("/delete/:id",(req,res) => {
    const postId = parseInt(req.params.id, 10);
    posts = posts.filter(obj => obj.id !== postId);
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

