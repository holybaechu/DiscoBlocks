const express = require('express');
const router = express.Router();
const globalsModule = require('../../globals.js');

router.get('/', async function(req, res) {
    var usernameToGet = req.query.username
    if (!usernameToGet) { res.status(400).json({ success: false, errors: [{message: 'username could not be parsed from requset.'}]}) }

    if (globalsModule.verifyQueue[usernameToGet]) {
        res.json({success: true, data: {tag: globalsModule.verifyQueue[usernameToGet].tag} })
    }else{
        res.status(400).json({ success: false, errors: [{message: 'username is not in the queue.'}]})
    }
});

module.exports = router;