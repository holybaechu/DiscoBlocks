const express = require('express');
const router = express.Router();
const whois = require('whois-json');

router.get('/', async function(req, res) {
     // Get the isp by address
     var result = await whois(req.headers['x-forwarded-for'] || req.socket.remoteAddress)

     // Checking is the real roblox server
     if (
    result.availableAt == "https://www.arin.net/resources/registry/whois/tou/ https://www.arin.net/resources/registry/whois/tou/" &&
    result.netRange == '128.116.0.0 - 128.116.127.255' &&
    result.netType == "Direct Allocation" &&
    result.orgName == "Roblox" &&
    result.orgAbuseHandle == 'OPERA503-ARIN' &&
    result.orgAbuseName == 'OPERATIONS' &&
    result.orgAbusePhone == '+1-415-655-1982' &&
    result.orgAbuseEmail == 'noc@roblox.com' &&
    result.orgAbuseRef == 'https://rdap.arin.net/registry/entity/OPERA503-ARIN'&&
    result.orgNocHandle == 'OPERA503-ARIN' &&
    result.orgNocName == 'OPERATIONS' &&
    result.orgNocPhone == '+1-415-655-1982' &&
    result.orgNocEmail == 'noc@roblox.com' &&
    result.orgNocRef == 'https://rdap.arin.net/registry/entity/OPERA503-ARIN'&&
    result.orgTechHandle == 'OPERA503-ARIN' &&
    result.orgTechName == 'OPERATIONS' &&
    result.orgTechPhone == '+1-415-655-1982' &&
    result.orgTechEmail == 'noc@roblox.com' &&
    result.orgTechRef == 'https://rdap.arin.net/registry/entity/OPERA503-ARIN'
    ){
        console.log("REAL ROBLOX SERVER !@#$!@#!#@!@!");
        res.json({success: true, data: "Under development"})
    }else{
        res.json({success: false, errors: [{message: "This ip is not seems to be allowed to access this api."}]})
    }
});

module.exports = router;