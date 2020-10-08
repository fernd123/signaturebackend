/* Insert a user in database */
exports.insertUser = (req, res, next) => {

  const user = req.body;
  bcrypt.hash(user.password, 10, async function (err, hash) {
    user.password = hash;

    connection.query(`INSERT into user (name, password, phone, mail) VALUES ('${user.name}','${user.password}','${user.phone}','${user.mail}')`, function (err, result, fields) {
      console.log(err);
      res.json({
        result: err != null ? err : result
      });
    });
  });
}

/* Get an user by name and password */
exports.getUser = (req, res, next) => {
  const {
    name,
    password
  } = req.body;

  connection.query(`SELECT * FROM user where name = '${name}'`, function (err, result, fields) {
    if (result.length != 0) {
      console.log(result);
      // Check the encrypted password
      bcrypt.compare(password, result[0].password, function (err, hash) {
        if (hash) {
          // Get token
          const payload = {
            check: true,
            userId: result[0].id
          };
          const token = jwt.sign(payload, app.get('key'), {
            expiresIn: 60000
          });

          res.json({
            result: result,
            token: token
          });
        } else
          res.json({
            result: []
          });
      });
    } else {
      res.json({
        result: []
      });
    }
  });
}

/* Get all the users */
exports.getUsers = (req, res, next) => {
  connection.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    res.json({
      result: result
    });
  });
}