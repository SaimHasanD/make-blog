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
    ContactModel.findByIdAndRemove(req.params.id, (err, contact) => {
      if (err) {
        console.log("Could not deleted.");
      }

      // /delete file
      try {
        fs.unlink("public/" + contact.image, () => {
          console.log("File deleted====================================");
        });
      } catch (error) {
        console.log("Something went wrong====================================");
      }
      res.redirect("/admin/contact");

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

    const contact = new ContactModel({
      icon: req.body.icon,
      title: req.body.title,
      details: req.body.details
    })

    contact.save((err, newContact) => {
      if (err) {
        return res.json({ error: errors.mapped() });
      }
      return res.json({ contact: newContact });
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) => {
    res.render('index', { title: 'Admin Contact update', layout: 'backend/layout' });
  },

}