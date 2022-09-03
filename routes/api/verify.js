const express = require('express');
const router = express.Router();
const whois = require('whois');

router.get('/', function(req, res) {
     // Get the isp by address
     whois.lookup("roblox.com", 4, function(err, data){
        if (err) {
            res.status(500).send('Error getting isp');
        } else {
            res.send(data);
        }

     });
});

module.exports = router;