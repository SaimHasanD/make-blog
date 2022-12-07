const { validationResult } = require('express-validator');
const TestimonialModel = require('../Models/testimonial');
const fs = require('fs');

module.exports = {
  index: (req, res, next) => {
    // testimonial List

    TestimonialModel.find((err, docs) => {
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


      // return res.json({testimonials:docs});
      res.render('backend/testimonial/index', { title: 'testimonial', layout: "backend/layout", data: data });
    });
  },

  create: (req, res, next) => {
    res.render('backend/testimonial/create', { title: 'Admin testimonial create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    res.render('backend/testimonial/edit', { title: 'Admin testimonial edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    TestimonialModel.findByIdAndRemove(req.params.id, (err, testimonial) => {
      if (err) {
        console.log("Could not deleted.");
      }

      // /delete file
      try {
        fs.unlink("public/" + testimonial.image, () => {
          console.log("File deleted====================================");
        });
      } catch (error) {
        console.log("Something went wrong====================================");
      }
      res.redirect("/admin/testimonial");

    });
  },


  show: (req, res, next) => {
    TestimonialModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err })
      }
      return res.json({ testimonial: docs });
    })
    res.render('backend/testimonial/show', { title: 'Admin testimonial show', layout: 'backend/layout' });
  },

  store: (req, res, next) => {
    TestimonialModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err })
      }
      return res.json({ testimonials: docs });
    })
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() });
    }

    const testimonial = new TestimonialModel({
      name: req.body.name,
      image: req.body.image,
      details: req.body.details,
      designation: req.body.designation
    })

    testimonial.save((err, newTestimonial) => {
      if (err) {
        return res.json({ error: errors.mapped() });
      }
      return res.json({ testimonial: newTestimonial });
    })
    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) => {
    res.render('index', { title: 'Admin testimonial update', layout: 'backend/layout' });
  },

}