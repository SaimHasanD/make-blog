require('dotenv').config()
const TestimonialModel = require('../Models/testimonial');


module.exports={
    index: (req, res, next)=> {
        res.render('frontend/index', { 
        name:`${process.env.APP_NAME} ${process.env.APP_db}`,
        db:process.env.APP_DB, 
        port:process.env.APP_PORT});
      },

    blog: (req, res, next)=> {
        res.render('frontend/blog', { title: 'blogs' });
      },

    singlePost: (req, res, next)=> {
        res.render('frontend/single-post', { title: 'single-post' });
      },
      
    team: (req, res, next)=> {
        res.render('frontend/team', { title: 'team' });
      },

    testimonial: (req, res, next)=> {

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
        console.log(data);

        // return res.json({testimonials:docs});
        // res.render('frontend/testimonialPractice', { title: 'testimonial', data: data });
      })

        res.render('frontend/testimonial', { title: 'testimonial' });
      },

    contactUs: (req, res, next)=> {
        res.render('frontend/contactUs', { title: 'contact' });
      },

    about: (req, res, next)=> {
        res.render('frontend/about', { title: 'about' });
      },
   
}