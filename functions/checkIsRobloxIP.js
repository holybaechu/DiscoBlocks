const whois = require('whois-json');

module.exports = async function(ip){
    var result = await whois(ip)
    
    if(
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
        return true;
    }else{
        return false;
    }
}