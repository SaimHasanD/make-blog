const { validationResult } = require('express-validator');
const BlogModel = require('../Models/blog');
const fs = require('fs');

module.exports = {
  index: (req, res, next) => {
    // blog List

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

    BlogModel.findById(req.params.id)
      .then((blog) => {
        // blog list
        const details = {
          title: blog.title,
          slug: blog.slug,
          id: blog._id,
          details: blog.details,
          image: blog.image
        }
        // console.log(details);
        res.render('backend/blog/edit', { title: 'Blog Edit', layout: "backend/layout", blog: details });
      })
    // res.render('backend/blog/edit', { title: 'Admin blog edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
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
    BlogModel.findById(req.params.id)
      .then((blog) => {

        // blog list
        const details = {
          title: blog.title,
          slug: blog.slug,
          details: blog.details,
          image: blog.image
        }
        // console.log(details);
        res.render('backend/blog/show', { layout: "backend/layout", blog: details });
      })
      .catch((err) => {
        res.json({ "error": "Something went wrong!" });
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
        // return res.status(500).send(err);

        return res.redirect("/admin/blog/create");
    });

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
      return res.redirect("/admin/blog");
      // return res.json(req.body);

    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update:(req, res, next)=> {
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors:errors.mapped()});
    }
    
    let sampleFile,filePath;

    if (req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        filePath='upload/' +rnd+sampleFile.name;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/'+filePath, function(err) {
            if (err)
            res.redirect("/admin/blog/"+req.params.id+"/edit");
        });
    }
    const blogObj={
        title:req.body.title,
        slug:req.body.slug,
        details:req.body.details
    };

    if(filePath){
        blogObj.image=filePath;
    }

    // /
    BlogModel.findByIdAndUpdate(req.params.id,blogObj,(err,blog)=>{
        if(err){
            res.redirect("/admin/blog/"+req.params.id+"/edit");
        }
        res.redirect("/admin/blog");
    });

},

}

