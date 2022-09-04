const express = require('express');
const router = express.Router();
const ipChecker = require('../../functions/checkIsRobloxIP.js');

router.get('/', async function(req, res) {
     // Checking is the real roblox server
    if (ipChecker(req.headers['x-forwarded-for'] || req.socket.remoteAddress) == true){
        console.log("REAL ROBLOX SERVER !@#$!@#!#@!@!");
        res.json({success: true, data: "Under development"})
    }else{
        res.status(400).json({success: false, errors: [{message: "This ip is not seems to be allowed to access this api."}]})
    }
});

module.exports = router;