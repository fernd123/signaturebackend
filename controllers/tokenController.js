/* Check if a token is valid */
exports.verifyToken = (req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if (err) {
                console.log('invalida');

                res.json({
                    message: 'Token inválida'
                });
            } else {
                res.send({
                    token: token
                });
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            message: 'Token no proveída.'
        });
    }
}