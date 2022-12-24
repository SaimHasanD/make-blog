const { validationResult } = require('express-validator');
const AboutModel = require('../Models/about')
const fs = require('fs');

module.exports = {
  index: (req, res, next) => {
    // about List

    AboutModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err });
      }
      const data = [];
      docs.forEach(element => {
        data.push({
          title: element.title,
          image: element.image,
          details: element.details,
          // map: element.map,
          id: element._id,
        });
      });


      // return res.json({about:docs});
      res.render('backend/about/index', { title: 'about', layout: "backend/layout", data: data });
    });
  },

  create: (req, res, next) => {
    res.render('backend/about/create', { title: 'Admin about create', layout: 'backend/layout' });
  },

  edit: (req, res, next) =>  {

    AboutModel.findById(req.params.id)
      .then((about) => {
        // about list
        const details = {
          image: about.image,
          title: about.title,
          details: about.details,
          map: about.map,
          id: about._id
        }
        // console.log(details);
        res.render('backend/about/edit', { title: 'about Edit', layout: "backend/layout", about: details });
      })
    // res.render('backend/about/edit', { title: 'Admin about edit', layout: 'backend/layout' });
  },
  delete: (req, res, next) => {
    AboutModel.findByIdAndRemove(req.params.id, (err, about) => {
      if (err) {
        console.log("Could not deleted.");
      }

      // /delete file
      try {
        fs.unlink("public/" + about.image, () => {
          console.log("File deleted====================================");
        });
      } catch (error) {
        console.log("Something went wrong====================================");
      }

      // /
      res.redirect("/admin/about");

    });

  },

  show: (req, res, next) => {
    AboutModel.findById(req.params.id)
      .then((about) => {

        // about list
        const details = {
          image: about.image,
          title: about.title,
          details: about.details,
          map: about.map
        }
        // console.log(details);
        res.render('backend/about/show', { layout: "backend/layout", about: details });
      })
      .catch((err) => {
        res.json({ "error": "Something went wrong!" });
      })
    // res.render('backend/about/show', { title: 'Admin about show' , layout: 'backend/layout'});
  },

  store: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.redirect("/admin/about/create");

      return res.json({ errors});
    }

    let sampleFile;
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      // return res.json(req.files);
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    let rnd = new Date().valueOf();
    let filePath = 'upload/about/' + rnd + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/' + filePath, function (err) {
      if (err)
        // return res.status(500).send(err);

        return res.redirect("/admin/about/create");
    });

    const about = new AboutModel({
      image: filePath,
      title: req.body.title,
      details: req.body.details,
      map: req.body.map
    })

    about.save((err, newAbout) => {
      if (err) {
        return res.json({ error: errors.mapped() });
      }
      return res.redirect("/admin/about")
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() });
    }

    let sampleFile,filePath;

    if (req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        filePath='upload/' +rnd+sampleFile.name;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/about/'+filePath, function(err) {
            if (err)
            res.redirect("/admin/about/"+req.params.id+"/edit");
        });
    }
    const aboutObj={
        title:req.body.title,
        map:req.body.map,
        details:req.body.details
    };

    if(filePath){
      aboutObj.image=filePath;
    }


    AboutModel.findByIdAndUpdate(req.params.id, aboutObj, (err, about) => {
      return res.redirect("/admin/about")
    })
  }
}