/*
* GET home page.
*/
 
exports.index = function(req, res){
    var message = '';
  res.render('supad_login',{message: message});
};