const express = require('express');
const router = express.Router();
const whois = require('whois-json');

router.get('/', async function(req, res) {
     // Get the isp by address
     var result = await whois(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
     console.log(result)
     res.json(result)
});

module.exports = router;