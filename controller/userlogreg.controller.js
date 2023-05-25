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
        var fname = post.fname;
        var lname = post.lname;
        var username = post.username;
        var email = post.email;
        var category = post.category;
        var password = post.password;
        var phone_number = post.phone_number;

        if(email != '' && password != ''){
            var sql = "INSERT INTO `accounts` (`fname`, `lname`, `username`, `email`, `category`, `password`, `phone_number`) VALUES ('"+fname+"','"+lname+"','"+username+"','"+email+"','"+category+"','"+password+"','"+phone_number+"')";

            var query = db.query(sql, function(err, result){
                message = "Your account has been created succesfully.";
                res.render('register.ejs',{message: message});
            });
            
        }else{
            message = "Email and Password are required";
            res.render('register.ejs', {message: message});
        }
    } else {
        res.render('register');
    }
}

exports.login = function(req, res){
    var message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var post = req.body;
        var email = post.email;
        var password = post.password;

        var sql = "SELECT id, email FROM `accounts` WHERE `email` = '"+email+"' and password='"+password+"'";
        db.query(sql, function(err, results){
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/user_dashboard');
            } else{
                message = 'Your entered email or password is invald/does not exist.'
                res.render('login.ejs',{message: message});
            }
        });
    } else{
        res.render('login.ejs', {message: message});
    }
}

exports.dashboard = function(req, res, next){
    var user = req.session.user;
    var userId = req.session.userId;
    console.log('Visited Dashboard: UserID #'+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `accounts` WHERE `id` = '"+userId+"'";
    db.query(sql, function(err, results){
        res.render('user_dashboard.ejs', {data:results});
    });
};
exports.mngprods = function(req, res, next){
    var user = req.session.user;
    var userId = req.session.userId;
    console.log('Visited Manage Products Page: UserID #'+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `accounts` WHERE `id` = '"+userId+"'";
    db.query(sql, function(err, results){
        res.render('user_mngproducts.ejs', {data:results});
    });
};

exports.recentLogs = function(req,res){
    var userId = req.session.userId;
    console.log('At Recent Logs Page: UserID #'+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `accounts` WHERE `id` = '"+userId+"'";
    db.query(sql, function(err, result){
        res.render('user_recentlogs.ejs', {data:result});
    });
};

exports.sales = function(req,res){
    var userId = req.session.userId;
    console.log('At Sales Page: UserID #'+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `accounts` WHERE `id` = '"+userId+"'";
    db.query(sql, function(err, result){
        res.render('user_sales.ejs', {data:result});
    });
};

exports.profile = function(req,res){
    var userId = req.session.userId;
    console.log('At Profile: UserID #'+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `accounts` WHERE `id` = '"+userId+"'";
    db.query(sql, function(err, result){
        res.render('user_profile.ejs', {data:result});
    });
};

exports.logout = function(req, res){
    req.session.destroy(function(err){
        res.redirect("/login");
    })
}