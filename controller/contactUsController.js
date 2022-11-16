const { validationResult } = require('express-validator');
const ContactModel = require('../Models/contact')


module.exports={
    index: (req, res, next)=> {
        res.render('backend/contact/index', { title: 'Admin Contact', layout: 'backend/layout' });
      },

      create: (req, res, next)=> {
        res.render('backend/contact/create', { title: 'Admin Contact create', layout: 'backend/layout' });
      },
      
      edit: (req, res, next)=> {
        res.render('backend/contact/edit', { title: 'Admin Contact edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin Contact delete', layout: 'backend/layout' });
      },

      show: (req, res, next)=> {
        res.render('backend/contact/show', { title: 'Admin Contact show', layout: 'backend/layout' });
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }

        const contact = new ContactModel({
          icon: req.body.icon,
          title: req.body.title,
          details: req.body.details
        })

        contact.save((err,newContact)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          return res.json({contact:newContact});
        })

        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },

      update: (req, res, next)=> {
        res.render('index', { title: 'Admin Contact update', layout: 'backend/layout' });
      },
      
}