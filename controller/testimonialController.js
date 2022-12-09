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
          name: element.name,
          designation: element.designation,
          image: element.image,
          details: element.details,
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
    TestimonialModel.findById(req.params.id)
      .then((testimonial) => {
        // testimonial list
        const details = {
          name: testimonial.name,
          designation: testimonial.designation,
          image: testimonial.image,
          details: testimonial.details,
          id: testimonial._id
        }
        // console.log(details);
        res.render('backend/testimonial/edit', { title: 'Testimonial Edit', layout: "backend/layout", testimonial: details });
      })
    // res.render('backend/testimonial/edit', { title: 'Admin testimonial edit', layout: 'backend/layout' });
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
    TestimonialModel.findById(req.params.id)
      .then((testimonial) => {
        // testimonial list
        const details = {
          name: testimonial.name,
          designation: testimonial.designation,
          image: testimonial.image,
          details: testimonial.details,
          id: testimonial._id
        }
        // console.log(details);
        res.render('backend/testimonial/show', { title: 'Testimonial Edit', layout: "backend/layout", testimonial: details });
      })
    // res.render('backend/testimonial/edit', { title: 'Admin testimonial edit', layout: 'backend/layout' });
  },

  store: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() });
    }

    let sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    let rnd = new Date().valueOf();
    let filePath = 'upload/testimonial/' + rnd + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/' + filePath, function (err) {
      if (err)
        // return res.status(500).send(err);

        return res.redirect("/admin/testimonial/create");
    });

    const testimonial = new TestimonialModel({
      name: req.body.name,
      image: filePath,
      details: req.body.details,
      designation: req.body.designation
    })

    testimonial.save((err, newTestimonial) => {
      if (err) {
        return res.json({ error: errors.mapped() });
      }
      return res.redirect('/admin/testimonial')
    })
    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update:(req, res, next)=> {
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors:errors.mapped()});
    }
    
    let sampleFile,filePath;

    if (req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        filePath='upload/testimonial/' +rnd+sampleFile.name;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/'+filePath, function(err) {
            if (err)
            res.redirect("/admin/testimonial/"+req.params.id+"/edit");
        });
    }
    const testimonialObj={
      name: req.body.name,
      details: req.body.details,
      designation: req.body.designation
    };

    if(filePath){
        testimonialObj.image=filePath;
    }

    // /
    TestimonialModel.findByIdAndUpdate(req.params.id,testimonialObj,(err,testimonial)=>{
        if(err){
            res.redirect("/admin/testimonial/"+req.params.id+"/edit");
        }
        res.redirect("/admin/testimonial");
    });

},

}