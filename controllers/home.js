var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	res.render('home/index');
});

router.get('/user_list', function(req, res){
	user.getAll(function(results){
		res.render('home/userList', {userList: results});
	});
});

router.get('/edit/:id', function(req, res){
	user.getById(req.params.id, function(result){
		res.render('home/edit', {user: result[0]});
	});
});

router.post('/edit/:id', function(req, res){
	var data = {
		id: req.params.id,
		username: req.body.username,
		password: req.body.password
	}
	user.update(data, function(status){
		if(status){
			res.redirect('/home/user_list');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});

});

module.exports = router;