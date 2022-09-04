const express = require('express');
const router = express.Router();
const ipChecker = require('../../functions/checkIsRobloxIP.js');
const globalsModule = global;

router.get('/', async function(req, res) {
    var usernameToGet = req.query.username
    if (!usernameToGet) { res.status(400).json({ success: false, errors: [{message: 'username could not be parsed from requset.'}]}) } 

     // Checking is the real roblox server
    if (ipChecker(req.headers['x-forwarded-for'] || req.socket.remoteAddress) == true){
        if (globalsModule.verifyQueue[usernameToGet]) {
            globalsModule.verifyQueue[usernameToGet].createDM(true).send("You are verified!")
            res.json({success: true})
        }else{
            res.status(400).json({ success: false, errors: [{message: 'username is not in the queue.'}]})
        }
    }else{
        res.status(400).json({success: false, errors: [{message: "This ip is not seems to be allowed to access this api."}]})
    }
});

module.exports = router;