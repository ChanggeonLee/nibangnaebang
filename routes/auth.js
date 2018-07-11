module.exports = (app, passport) => {
    
    
  app.get('/signin', (req, res, next) => {
    res.render('signin/index');
  });
  
  // local login
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash : true 
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
      req.flash('success', '로그인 성공~!');
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
      req.flash('success', '로그인 성공~!');
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
      req.flash('success', '로그인 성공~!');
      res.redirect('/');
    }
  );

  // logout
  app.get('/signout', (req, res) => {
    console.log("로그아웃 성공~");
    req.logout();
    req.flash('success', '회원 탈퇴 되었습니다');
    res.redirect('/');
  });
};
