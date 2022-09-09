const express = require('express');
const fs = require('fs');
const discord = require('discord.js');
const mongoose = require('mongoose');
const axios = require('axios');
const cookieParser = require('cookie-parser')
const csurf = require('csurf')

const config = require('./config.js');

const app = express();
const client = new discord.Client({ intents: discord.GatewayIntentBits.Guilds });

function refreshRoutes(path) {
    fs.readdirSync(path).forEach(file => {
        if (fs.lstatSync(path + '/' + file).isDirectory()) {
            refreshRoutes(path + '/' + file);
        }else if(file.endsWith('.js')){
            if(path.startsWith('./routes')){
              app.use(path.substring(8) + '/' + file.substring(0, file.length-3), require(path + '/' + file));
            }
        }
    });
}

(async () => {
    for(const file of fs.readdirSync('./events/').filter(file => file.endsWith('.js'))) {
        const event = require(`./events/${file}`);
        
        if(event.once) {
                client.once(event.event, async (...args) => {
                    (async () => {
                        await event.execute(client, ...args);
                    })();
                });
        }else{
            client.on(event.event, async (...args) => {
                (async () => {
                    await event.execute(client, ...args);
                })();
        });
        }
            
    }
})();

//globals
global.verifyQueue = {}

//Security settings
// csrf
app.use(cookieParser())
const csrf = csurf({ cookie: true });
app.use(csrf)

app.use(require('helmet')());
app.disable('x-powered-by');

refreshRoutes("./routes")

app.use(express.static('./public'));

const port = process.env.PORT || 443
app.listen(port, function () {
    console.log('Listening on port ' + port);
})

setInterval(function() {
    axios.get('https://discoblocks.herokuapp.com/')
}, 25 * 60 * 1000);

client.login(config['discord-token'])
mongoose.connect(config.mongoURI, {useNewUrlParser: true});