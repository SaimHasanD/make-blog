const { validationResult } = require('express-validator');
const BlogModel = require('../Models/blog');
const fs = require('fs');

module.exports = {
  index: (req, res, next) => {
    BlogModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err });
      }
      const data = [];
      docs.forEach(element => {
        data.push({
          title: element.title,
          details: element.details,
          image: element.image,
          slug: element.slug,
          id: element._id
        });
      });


      // return res.json({blogs:docs});
      res.render('backend/blog/index', { title: 'Blogs', layout: "backend/layout", data: data });
    });
  },

  create: (req, res, next) => {
    res.render('backend/blog/create', { title: 'Admin blog create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    res.render('backend/blog/edit', { title: 'Admin blog edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    // BlogModel.findByIdAndRemove(req.params.id).then(() => {
    //   console.log("deleted");
    // }).catch((error) => {
    //   console.log("could not deleted due to " + error);
    // })
    // res.redirect("/admin/blog");

    BlogModel.findByIdAndRemove(req.params.id, (err, blog) => {
      if (err) {
        console.log("Could not deleted.");
      }

      // /delete file
      try {
        fs.unlink("public/" + blog.image, () => {
          console.log("File deleted====================================");
        });
      } catch (error) {
        console.log("Something went wrong====================================");
      }
      res.redirect("/admin/blog");

    });
  },

  show: (req, res, next) => {
    BlogModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err })
      }
      return res.json({ blogs: docs });
    })
    // res.render('backend/blog/show', { title: 'Admin blog show' , layout: 'backend/layout'});
  },

  store: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() });
    }

    let sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    let rnd = new Date().valueOf();
    let filePath = 'upload/' + rnd + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/' + filePath, function (err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
    console.log(req.body);

    const blog = new BlogModel({
      title: req.body.title,
      image: filePath,
      details: req.body.details,
      slug: req.body.slug
    })

    blog.save((err, newBlog) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err });
      }
      // return res.json({ blog: newBlog });
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) => {
    res.render('index', { title: 'Admin blog update', layout: 'backend/layout' });
  },

}

