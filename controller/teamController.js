const { validationResult } = require('express-validator');
const TeamModel = require('../Models/team')
const fs = require('fs');

module.exports = {
  index: (req, res, next) => {
    // team List

    TeamModel.find((err, docs) => {
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


      // return res.json({teams:docs});
      res.render('backend/team/index', { title: 'team', layout: "backend/layout", data: data });
    });
  },

  create: (req, res, next) => {
    res.render('backend/team/create', { title: 'Admin team create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    res.render('backend/team/edit', { title: 'Admin team edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    TeamModel.findByIdAndRemove(req.params.id, (err, team) => {
      if (err) {
        console.log("Could not deleted.");
      }

      // /delete file
      try {
        fs.unlink("public/" + team.image, () => {
          console.log("File deleted====================================");
        });
      } catch (error) {
        console.log("Something went wrong====================================");
      }
      res.redirect("/admin/team");

    });
  },

  show: (req, res, next) => {
    TeamModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err })
      }
      return res.json({ team: docs });
    })
    res.render('backend/team/show', { title: 'Admin team show', layout: 'backend/layout' });
  },

  store: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() });
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

    team.save((err, newTeam) => {
      if (err) {
        return res.json({ error: errors.mapped() });
      }
      return res.json({ team: newTeam });
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) => {
    res.render('index', { title: 'Admin team update', layout: 'backend/layout' });
  },

}