module.exports={
    index: (req, res, next)=> {
        res.render('backend/link/index', { title: 'Admin link', layout: 'backend/layout' });
      },

      create: (req, res, next)=> {
        res.render('backend/link/create', { title: 'Admin link create', layout: 'backend/layout' });
      },
      
      edit: (req, res, next)=> {
        res.render('backend/link/edit', { title: 'Admin link edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {
        res.render('index', { title: 'Admin link delete', layout: 'backend/layout' });
      },

      show: (req, res, next)=> {
        res.render('backend/link/show', { title: 'Admin link show', layout: 'backend/layout' });
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
        }

        return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },

      update: (req, res, next)=> {
        res.render('index', { title: 'Admin link update', layout: 'backend/layout' });
      },
      
}