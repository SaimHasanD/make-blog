require('dotenv').config()


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
        res.render('frontend/testimonial', { title: 'testimonial' });
      },

    contactUs: (req, res, next)=> {
        res.render('frontend/contactUs', { title: 'contact' });
      },

    about: (req, res, next)=> {
        res.render('frontend/about', { title: 'about' });
      },
   
}