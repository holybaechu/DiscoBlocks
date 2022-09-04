const express = require('express');
const router = express.Router();
const ipChecker = require('../../functions/checkIsRobloxIP.js');

router.get('/', async function(req, res) {
    var usernameToGet = req.query.username
    if (!ipChecker(req.headers['x-forwarded-for'] || req.socket.remoteAddress)){res.status(400).json({success: false, errors: [{message: "This ip is not seems to be allowed to access this api."}]}); return;}
    if (!usernameToGet) {res.status(400).json({ success: false, errors: [{message: 'username could not be parsed from requset.'}]}) }

    if (global.verifyQueue[usernameToGet]) {
        var dm = await global.verifyQueue[usernameToGet].createDM(true)
        await dm.send("You are verified!")
        res.json({success: true})
    }else{
        res.status(400).json({ success: false, errors: [{message: 'username is not in the queue.'}]})
    }
});

module.exports = router;