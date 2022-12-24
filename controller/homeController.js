require('dotenv').config()
const TestimonialModel = require('../Models/testimonial');
const TeamModel = require('../Models/team');
const AboutModel = require('../Models/about');
const BlogModel = require('../Models/blog');
const ContactModel = require('../Models/contact');

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

      console.log(data);
      // return res.json({blogs:docs});
      res.render('frontend/indexPractice', { data: data });
    });
    // res.render('frontend/index');
  },

  blog: (req, res, next) => {
    res.render('frontend/blog', { title: 'blogs' });
  },

  singlePost: (req, res, next) => {
    res.render('frontend/single-post', { title: 'single-post' });
  },

  team: (req, res, next) => {
    TeamModel.find((err, docs) => {
      if (err) {
        return res.render({ error: "Something went wrong!" + err });
      }
      const data = [];
      docs.forEach(element => {
        data.push({
          name: element.name,
          designation: element.designation,
          image: element.image,
          // facebook: element.facebook,
          // twitter: element.twitter,
          // instagram: element.instagram,
          // linked: element.linked,
          id: element._id
        });
      });

      console.log(data);
      // return res.json({teams:docs});
      res.render('frontend/teamPractice', { title: 'team', data: data });
    });
    // res.render('frontend/team', { title: 'team'});

  },

  testimonial: (req, res, next) => {

    TestimonialModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err });
      }
      const data = [];
      docs.forEach(element => {
        data.push({
          name: element.name,
          designation: element.designation,
          image: element.image,
          details: element.details,
          id: element._id
        });
      });

      // return res.json({testimonials:docs});
      res.render('frontend/testimonialPractice', { title: 'testimonial', data: data }, console.log(data));
    })

    // res.render('frontend/testimonial', { title: 'testimonial' });
  },

  contactUs: (req, res, next) => {

    ContactModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err });
      }
      const data = [];
      docs.forEach(element => {
        data.push({
          title: element.title,
          details: element.details,
          icon: element.icon,
          id: element._id
        });
      });

      // return res.json({contacts:docs});
      res.render('frontend/contactUSPractice', { title: 'contact', data: data });
    });
    // res.render('frontend/contactUs', { title: 'contact' });
  },

  about: (req, res, next) => {
    AboutModel.find((err, docs) => {
      if (err) {
        return res.render({ error: "Something went wrong!" + err });
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
      res.render('frontend/aboutPractice', { title: 'about', data: data });
    });
    // res.render('frontend/about', { title: 'about' });

  },

}