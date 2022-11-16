module.exports={
    index: (req, res, next)=> {
        res.render('backend/admin/index', { title: 'Admin', layout: 'backend/layout'});
      },

}
