const db = require('../database/connection');

/*
* GET home page.
*/

exports.index = function(req, res){
    var message = '';
  res.render('index',{message: message});
};

exports.signup = function(req, res){
    message = '';
    if(req.method == 'POST'){
        var post = req.body;
        var email = post.email;
        var adminname = post.adminname;
        var password = post.password;

        if(email != '' && adminname != '' && password != ''){
            var sql = "INSERT INTO `super_admin` (`email`, `adminname`, `password`) VALUES ('"+email+"','"+adminname+"','"+password+"')";

            var query = db.query(sql, function(err, result){
                message = "Your account has been created succesfully.";
                res.render('supad_register.ejs',{message: message});
            });
            
        }else{
            message = "Email and Password are required";
            res.render('supad_register.ejs', {message: message});
        }
    } else {
        res.render('supad_register');
    }
}

exports.login = function(req, res){
    var message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var post = req.body;
        var email = post.email;
        var password = post.password;

        var sql = "SELECT id, email FROM `super_admin` WHERE `email` = '"+email+"' and password='"+password+"'";
        db.query(sql, function(err, results){
            if(results.length){
                req.session.supadId = results[0].id;
                req.session.super_admin = results[0];
                console.log(results[0].id);
                res.redirect('/superadmin_dashboard');
            } else{
                message = 'Your entered email or password is invald/does not exist.'
                res.render('supad_login.ejs',{message: message});
            }
        });
    } else{
        res.render('supad_login.ejs', {message: message});
    }
}

exports.dashboard = function(req, res, next){
    var super_admin = req.session.super_admin;
    var supadId = req.session.supadId;
    console.log('Visited Dashboard: AdminID #'+supadId);
    if(supadId == null){
        res.redirect("/supad_login");
        return;
    }

    var sql = "SELECT * FROM `super_admin` WHERE `id` = '"+supadId+"'";
    db.query(sql, function(err, results){
        res.render('supad_dash_index.ejs', {data:results});
    });
};

exports.profile = function(req,res){
    var supadId = req.session.supadId;
    console.log('At Profile: AdminID #'+supadId);
    if(supadId == null){
        res.redirect("/supad_login");
        return;
    }

    var sql = "SELECT * FROM `super_admin` WHERE `id` = '"+supadId+"'";
    db.query(sql, function(err, result){
        res.render('supad_profile.ejs', {data:result});
    });
};

exports.logout = function(req, res){
    req.session.destroy(function(err){
        res.redirect("/supad_login");
    })
}