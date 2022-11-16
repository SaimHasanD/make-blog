const { validationResult } = require('express-validator');
const TestimonialModel = require('../Models/testimonial')

module.exports={
    index: (req, res, next)=> {
        res.render('backend/testimonial/index', { title: 'Admin testimonial', layout: 'backend/layout' });
      },

      create: (req, res, next)=> {
        res.render('backend/testimonial/create', { title: 'Admin testimonial create', layout: 'backend/layout' });
      },
      
      edit: (req, res, next)=> {
        res.render('backend/testimonial/edit', { title: 'Admin testimonial edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin testimonial delete', layout: 'backend/layout' });
      },

      show: (req, res, next)=> {
        res.render('backend/testimonial/show', { title: 'Admin testimonial show', layout: 'backend/layout' });
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }

        const testimonial = new TestimonialModel({
          name: req.body.name,
          image: req.body.image,
          details: req.body.details,
          designation: req.body.designation
        })

        testimonial.save((err,newTestimonial)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          return res.json({testimonial:newTestimonial});
        })
        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },
      
      update: (req, res, next)=> {
        res.render('index', { title: 'Admin testimonial update', layout: 'backend/layout' });
      },
      
}