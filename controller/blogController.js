const { validationResult } = require('express-validator');
const BlogModel = require('../Models/blog')

module.exports={
    index: (req, res, next)=> {
        res.render('backend/blog/index', { title: 'Admin blog', layout: 'backend/layout'});
      },

      create: (req, res, next)=> {
        res.render('backend/blog/create', { title: 'Admin blog create', layout: 'backend/layout'});
      },
      
      edit: (req, res, next)=> {
        res.render('backend/blog/edit', { title: 'Admin blog edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin blog delete' , layout: 'backend/layout'});
      },

      show: (req, res, next)=> {
        res.render('backend/blog/show', { title: 'Admin blog show' , layout: 'backend/layout'});
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }

        const blog = new BlogModel({
          title: req.body.title,
          image: req.body.image,
          details: req.body.details,
          slug: req.body.slug
        })

        blog.save((err,newBlog)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          return res.json({blog:newBlog});
        })

        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },

      update: (req, res, next)=> {
        res.render('index', { title: 'Admin blog update' , layout: 'backend/layout'});
      },
      
}

