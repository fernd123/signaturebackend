/* Insert a meeting in database */
exports.insertMeeting = (req, res, next) => {
    const meeting = req.body;
    connection.query(`INSERT into meeting (userid, reason, signature) VALUES ('${meeting.userid}','${meeting.reason}','${meeting.signature}')`, function (err, result, fields) {
        res.json({
            result: err != null ? err : result
        });
    });
}

/* Update a meeting in database */
exports.updateMeeting = (req, res, next) => {
    const meeting = req.body;
    connection.query(`UPDATE meeting set endDate = now() where id = '${meeting.id}'`, function (err, result, fields) {
        res.json({
            result: err != null ? err : result
        });
    });
}

/* Get all the meetings by date */
exports.getMeetingsToday = (req, res, next) => {
    connection.query(`SELECT u.name, m.id, DATE_FORMAT(m.initDate, "%d/%m/%Y %H:%i") as initDate, DATE_FORMAT(m.endDate, "%d/%m/%Y %H:%i") as endDate, m.reason FROM meeting as m join user u on u.id = m.userid where DATE_FORMAT(m.initDate, "%Y/%m/%d") = DATE_FORMAT(now(), "%Y/%m/%d") order by m.id desc`, function (err, result, fields) {
        if (err) throw err;
        res.json({
            result: result
        });
    });
}

/* Get all the meetings by date */
exports.getMeetingsLastWeek = (req, res, next) => {
    connection.query(`SELECT u.name, m.id, DATE_FORMAT(m.initDate, "%d/%m/%Y %H:%i") as initDate, DATE_FORMAT(m.endDate, "%d/%m/%Y %H:%i") as endDate, m.reason FROM meeting as m join user u on u.id = m.userid 
    WHERE DATE(m.initDate) >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY
    AND DATE(m.initDate) <= curdate() - INTERVAL DAYOFWEEK(curdate())-6 DAY order by m.id desc`, function (err, result, fields) {
        if (err) throw err;
        res.json({
            result: result
        });
    });
}

/* Get all the meetings by reason */
exports.getMeetingsByReason = (req, res, next) => {
    const reasonReq = req.body;
    connection.query(`Select m.id, DATE_FORMAT(m.initDate, "%H:%i") as initDate, u.name from meeting m join user u on m.userid = u.id where (m.reason = '${reasonReq.reason}' and m.endDate is null 
    and DATE_FORMAT(m.initDate, "%Y/%m/%d") = DATE_FORMAT(now(), "%Y/%m/%d")) order by m.id desc`, function (err, result, fields) {
        if (err) throw err;
        res.json({
            result: result
        });
    });
}