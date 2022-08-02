module.exports = function(app){
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const flash = require('connect-flash');
    
    const authData = {
        email: 'user123@gmail.com',
        password: '111111',
        nickname: 'lee' 
    }

    app.use(passport.initialize());
    app.use(passport.session());
    //flash는 세션을 사용하기 때문에 세션 미들웨어 다음에 선언
    app.use(flash());

    // 로그인이 완료되면 세션에 사용자 정보를 넣어줌
    passport.serializeUser(function(user, done){
    done(null, user.email);
    });

    //페이지 호출될 때마다 사용자의 실제 데이터 조회
    passport.deserializeUser(function(id, done){
    done(null, authData);
    });

    // 로그인 검증
    passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'pwd'
    },
    function(username, password, done){
        if(username === authData.email){
        if(password === authData.password){
            return done(null, authData, { message: 'Welcome!'});
        } else {
            return done(null, false, { message: 'Incorrect password.'});
        }
        } else {
        return done(null, false, { message: 'Incorrect username.'});
        }
    }
    ));
    return passport;
}

