const { validationResult } = require('express-validator');
const TeamModel = require('../Models/team')

module.exports={
    index: (req, res, next)=> {
        res.render('backend/team/index', { title: 'Admin team', layout: 'backend/layout' });
      },

      create: (req, res, next)=> {
        res.render('backend/team/create', { title: 'Admin team create', layout: 'backend/layout' });
      },
      
      edit: (req, res, next)=> {
        res.render('backend/team/edit', { title: 'Admin team edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin team delete', layout: 'backend/layout' });
      },

      show: (req, res, next)=> {
        TeamModel.find((err,docs)=>{
          if(err){
              return res.json({error:"Something went wrong!"+err})
          }
          return res.json({team:docs});
      })
        res.render('backend/team/show', { title: 'Admin team show', layout: 'backend/layout' });
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }
        const team = new TeamModel({
          name: req.body.name,
          image: req.body.image,
          designation: req.body.designation,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          linked: req.body.linked
        })

        team.save((err,newTeam)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          return res.json({team:newTeam});
        })

        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },

      update: (req, res, next)=> {
        res.render('index', { title: 'Admin team update', layout: 'backend/layout' });
      },
      
}