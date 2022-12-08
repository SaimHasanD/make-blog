const { validationResult } = require('express-validator');
const ContactModel = require('../Models/contact')
const fs = require('fs');

module.exports = {
  index: (req, res, next) => {
    // contact List

    ContactModel.find((err, docs) => {
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


      // return res.json({contacts:docs});
      res.render('backend/contact/index', { title: 'contact', layout: "backend/layout", data: data });
    });
  },

  create: (req, res, next) => {
    res.render('backend/contact/create', { title: 'Admin Contact create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    res.render('backend/contact/edit', { title: 'Admin Contact edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    ContactModel.findByIdAndRemove(req.params.id, (err, blog) => {
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
      res.redirect("/admin/contact-us");

    });
  },

  show: (req, res, next) => {
    ContactModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err })
      }
      return res.json({ contact: docs });
    })
    res.render('backend/contact/show', { title: 'Admin Contact show', layout: 'backend/layout' });
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

        return res.redirect("/admin/contact-us/create");
    });

    const contact = new ContactModel({
      image: filePath,
      title: req.body.title,
      details: req.body.details
    })


    
    contact.save((err, newContact) => {
      if (err) {
        return res.json({ err: err.mapped() });
      }
      return res.redirect("/admin/contact-us");
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  // store: (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.json({ error: errors.mapped() });
  //   }

  //   let sampleFile;
  //   if (!req.files || Object.keys(req.files).length === 0) {
  //     return res.status(400).send('No files were uploaded.');
  //   }

  //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //   sampleFile = req.files.image;
  //   let rnd = new Date().valueOf();
  //   let filePath = 'upload/' + rnd + sampleFile.name;

  //   // Use the mv() method to place the file somewhere on your server
  //   sampleFile.mv('public/' + filePath, function (err) {
  //     if (err)
  //       // return res.status(500).send(err);

  //       return res.redirect("/admin/contact-us/create");
  //   });

  //   const contact = new ContactModel({
  //     title: req.body.title,
  //     image: filePath,
  //     details: req.body.details,
  //   })

  //   contact.save((err, newContact) => {
  //     if (err) {
  //       return res.json({ error: "Something went wrong!" + err });
  //     }
  //     return res.redirect("/admin/contact");
  //     // return res.json(req.body);

  //   })

  //   // return res.json(req.body);
  //   // res.render('index', { layout: 'backend/layout', });
  // },

  update: (req, res, next) => {
    res.render('index', { title: 'Admin Contact update', layout: 'backend/layout' });
  },

}