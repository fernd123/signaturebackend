const router = express.Router();
const routerValid = express.Router();

const userController = require('../controllers/userController.js');
const tokenController = require('../controllers/tokenController.js');

module.exports = function () {

    /* Check the token */
    routerValid.use((req, res, next) => {

        const token = req.headers['access-token'];

        if (token) {
            jwt.verify(token, app.get('key'), (err, decoded) => {
                if (err) {
                    return res.json({
                        token: 'Token inválida'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.send({
                mensaje: 'Token no proveída.'
            });
        }
    });

    router.get('/token/verify', tokenController.verifyToken);

    router.post('/user/register',
        userController.insertUser);

    router.post('/user/login',
        userController.getUser);

    router.get('/user', routerValid,
        userController.getUsers);


    return router;
}