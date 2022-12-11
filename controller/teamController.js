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
          name: element.name,
          designation: element.designation,
          image: element.image,
          facebook: element.facebook,
          twitter: element.twitter,
          instagram: element.instagram,
          linked: element.linked,
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
    TeamModel.findById(req.params.id)
      .then((team) => {
        // team list
        const details = {
          name: team.name,
          designation: team.designation,
          image: team.image,
          facebook: team.facebook,
          twitter: team.twitter,
          instagram: team.instagram,
          linked: team.linked,
          id: team._id
        }
        // console.log(details);
        res.render('backend/team/edit', { title: 'team Edit', layout: "backend/layout", team: details });
      })
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
    TeamModel.findById(req.params.id)
      .then((team) => {
        // team list
        const details = {
          name: team.name,
          designation: team.designation,
          image: team.image,
          facebook: team.facebook,
          twitter: team.twitter,
          instagram: team.instagram,
          linked: team.linked,
          id: team._id
        }
        // console.log(details);
        res.render('backend/team/show', { layout: "backend/layout", team: details });
      })
      .catch((err) => {
        res.json({ "error": "Something went wrong!" });
      })
    // res.render('backend/team/show', { title: 'Admin team show' , layout: 'backend/layout'});
  },

  store: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.mapped() });
    }

    let sampleFile, filePath;

    if (req.files) {
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      sampleFile = req.files.image;
      let rnd = new Date().valueOf();
      filePath = 'upload/team/' + rnd + sampleFile.name;
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('public/' + filePath, function (err) {
        if (err)
          res.redirect("/admin/team/" + req.params.id + "/edit");
      });
    }

    const team = new TeamModel({
      name: req.body.name,
      image: filePath,
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
      return res.redirect('/admin/team')
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update:(req, res, next)=> {
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors:"Something went wrong" + err });
    }
    
    let sampleFile,filePath;

    if (req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        filePath='upload/team/' +rnd+sampleFile.name;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/'+filePath, function(err) {
            if (err)
            res.redirect("/admin/team/"+req.params.id+"/edit");
        });
    }
    const teamObj={
      name: req.body.name,
      designation: req.body.designation,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      linked: req.body.linked
    };

    if(filePath){
        teamObj.image=filePath;
    }

    // /
    TeamModel.findByIdAndUpdate(req.params.id,teamObj,(err,team)=>{
        if(err){
            res.redirect("/admin/team/"+req.params.id+"/edit");
        }
        res.redirect("/admin/team");
    });

},
}