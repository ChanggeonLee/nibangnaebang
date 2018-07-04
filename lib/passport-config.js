const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>  {
    User.findById(id, done);
  });

  // local login auth
  passport.use('local-signin', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({email: email});
      if (user && await user.validatePassword(password)) {
        return done(null, user, req.flash('success', 'Welcome!'));
      }
      return done(null, false, req.flash('danger', 'Invalid email or password'));
    } catch(err) {
      done(err);
    }
  }));

  // facebook login auth
  passport.use(new FacebookStrategy({
      // 이 부분을 여러분 Facebook App의 정보로 수정해야 합니다.
      clientID : process.env.FB_CLIENTID,
      clientSecret : process.env.FB_CLIENTSECRET,
      callbackURL: 'https://nibangnaebang.herokuapp.com/auth/facebook/callback',
      profileFields : ['email', 'name', 'picture']
    }, async (token, refreshToken, profile, done) => {
      console.log('Facebook', profile); // profile 정보로 뭐가 넘어오나 보자.
      try {
        var email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : '';
        var picture = (profile.photos && profile.photos[0]) ? profile.photos[0].value : '';
        var name = (profile.displayName) ? profile.displayName : 
          [profile.name.givenName, profile.name.middleName, profile.name.familyName]
            .filter(e => e).join(' ');
        console.log(email, picture, name, profile.name);
        // 같은 facebook id를 가진 사용자가 있나?
        var user = await User.findOne({'facebook.id': profile.id});
        if (!user) {
          // 없다면, 혹시 같은 email이라도 가진 사용자가 있나?
          if (email) {
            user = await User.findOne({email: email});
          }
          if (!user) {
            // 그것도 없다면 새로 만들어야지.
            user = new User({name: name});
            user.email =  email ? email : `__unknown-${user._id}@no-email.com`;
          }
          // facebook id가 없는 사용자는 해당 id를 등록
          user.facebook.id = profile.id;
          user.facebook.photo = picture;
        }
        user.facebook.token = profile.token;
        await user.save();
        return done(null, user);
      } catch (err) {
        done(err);
      }
  }));

  // kakao login auth
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENTID,
    callbackURL: 'https://nibangnaebang.herokuapp.com/auth/kakao/callback'
  },async (token, refreshToken, profile, done) => {
    try {
      var email = profile._json.email;
      var picture = profile._json.properties.profile_image;
      var name = (profile.displayName) ? profile.displayName : 
        [profile.name.givenName, profile.name.middleName, profile.name.familyName]
          .filter(e => e).join(' ');
      console.log(email, picture, name, profile.name);
      // 같은 kaka id를 가진 사용자가 있나?
      var user = await User.findOne({'kakao.id': profile.id});
      if (!user) {
        // 없다면, 혹시 같은 email이라도 가진 사용자가 있나?
        if (email) {
          user = await User.findOne({email: email});
        }
        if (!user) {
          // 그것도 없다면 새로 만들어야지.
          user = new User({name: name});
          user.email =  email ? email : `no-email`;
        }
        // kakao id가 없는 사용자는 해당 id를 등록
        user.kakao.id = profile.id;
        user.kakao.photo = picture;
      }
      user.kakao.token = profile.token;
      await user.save();
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  // google login auth
  passport.use(new GoogleStrategy({
    clientID: process.env.Google_CLIENTID,
    clientSecret: process.env.Google_CLIENTSECRET,
    callbackURL: 'https://nibangnaebang.herokuapp.com/auth/google/callback'
  },async (token, refreshToken, profile, done) => {
    try {
      var email =  profile.emails[0].value;
      var picture = profile.image;
      var name = profile.displayName; 
      // 같은 google id를 가진 사용자가 있나?
      var user = await User.findOne({'google.id': profile.id});
      if (!user) {
        // 없다면, 혹시 같은 email이라도 가진 사용자가 있나?
        if (email) {
          user = await User.findOne({email: email});
        }
        if (!user) {
          // 그것도 없다면 새로 만들어야지.
          user = new User({name: name});
          user.email =  email ? email : `__unknown-${user._id}@no-email.com`;
        }
        // google id가 없는 사용자는 해당 id를 등록
        user.google.id = profile.id;
        user.google.photo = picture;
      }
      user.google.token = profile.token;
      await user.save();
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }));

};
