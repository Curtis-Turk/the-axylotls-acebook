const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        name: req.session.user["firstName"],
      });
    });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    if (post.message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
        });
        
      });
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }
  },
};

module.exports = PostsController;
