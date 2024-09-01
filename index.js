import bodyParser from "body-parser";
import express from "express"


const app = express();
const port = 3000

let posts = []

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static("public"))

app.get("/" , (req , res) => {
    res.render("home.ejs" , {posts})
})


app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(post => post.id !== req.params.id);
    res.redirect('/');
});

app.post('/create', (req, res) => {
    const newPost = {
        id: Date.now().toString(),
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const postToEdit = posts.find(post => post.id === req.params.id);
    if (postToEdit) {
        res.render('edit', { post: postToEdit });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/edit/:id', (req, res) => {
    const postToUpdate = posts.find(post => post.id === req.params.id);
    if (postToUpdate) {
        postToUpdate.title = req.body.postTitle;
        postToUpdate.content = req.body.postBody;
        res.redirect('/posts/' + req.params.id);
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/posts/:id', (req, res) => {
    const requestedPost = posts.find(post => post.id === req.params.id);
    if (requestedPost) {
        res.render('post', { post: requestedPost });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post("/submit" , (req , res) => {
    const post = req.body["thepost"]
    res.render("homepage.ejs" , {
        postText: post,
    })
})

app.listen(port , ()=> {
    console.log(`running on port ${port}`);
})