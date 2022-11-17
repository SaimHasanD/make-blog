const { validationResult } = require('express-validator');
const AboutModel = require('../Models/about')

module.exports={
    index: (req, res, next)=> {
        res.render('backend/about/index', { title: 'Admin blog', layout: 'backend/layout'});
      },

      create: (req, res, next)=> {
        res.render('backend/about/create', { title: 'Admin blog create', layout: 'backend/layout'});
      },
      
      edit: (req, res, next)=> {
        res.render('backend/about/edit', { title: 'Admin blog edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin blog delete' , layout: 'backend/layout'});
      },

      show: (req, res, next)=> {
        AboutModel.find((err,docs)=>{
          if(err){
              return res.json({error:"Something went wrong!"+err})
          }
          return res.json({about:docs});
      })
        res.render('backend/about/show', { title: 'Admin blog show' , layout: 'backend/layout'});
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }

        const about = new AboutModel({
          image: req.body.image,
          title1: req.body.title1,
          title2: req.body.title2,
          details: req.body.details,
          map: req.body.map
        })

        about.save((err,newAbout)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          return res.json({about:newAbout});
        })

        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },

      update: (req, res, next)=> {
        res.render('index', { title: 'Admin blog update' , layout: 'backend/layout'});
      },
      
}