export class Meeting{
    constructor(id, userid, reason, signature) {
        this.id = id;
        this.userid = userid;
        this.reason = reason;
        this.signature = signature;
        this.initDate = new Date();
        this.endDate = null;
    }
 }
module.exports = Meeting;