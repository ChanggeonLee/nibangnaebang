module.exports = (app, passport) => {
    
    
  app.get('/signin', (req, res, next) => {
    res.render('signin/index');
  });
  
  // local login
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  
  // facebook login
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {
      req.flash('success', 'Welcome!');
      res.redirect('/');
    }
  );

  // kakaotalk login 
  app.get('/auth/kakao', 
    passport.authenticate('kakao')
  );

  app.get('/auth/kakao/callback',
    passport.authenticate('kakao', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {
      req.flash('success', 'Welcome!');
      res.redirect('/');
    }
  );

  // google login
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['email profile'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {
      req.flash('success', 'Welcome!');
      res.redirect('/');
    }
  );

  // logout
  app.get('/signout', (req, res) => {
    console.log("로그아웃 성공~");
    req.logout();
    req.flash('success', 'Successfully signed out');
    res.redirect('/');
  });
};
