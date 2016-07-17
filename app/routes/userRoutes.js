var controller = require('../controllers/userController');

module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/users')
  	.post(function(req, res) {
        controller.createUser(req, res);
  	})
  	.get(function(req, res) {
        controller.getUser(req, res);
  	});

  apiRouter.route('/users/:user_id')
  	.get(function(req, res) {
        controller.getById(req, res);
  	})
  	.put(function(req, res) {
        controller.updateUser(req, res);
  	})
  	.delete(function(req, res) {
        controller.deleteUser(req, res);
  	});

  // authentication code: if authentication is successfull, return token.
  apiRouter.post('/authenticate', function(req, res) {
      controller.authenticateUser(req, res);
  });

  // middleware: will only work for subsequent routes
  apiRouter.use(function(req, res, next) {
      controller.authenticateToken(req, res, next);
  });

  apiRouter.get('/me', function(req, res) {
  	 res.send(req.decoded);
  })

  apiRouter.get('/', function(req, res) {
  	 res.json({ message: 'hooray! welcome to our api!'});
  });

  return apiRouter;

}
