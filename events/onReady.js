const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const serverModel = require('../models/server.js');

const config = require('../config.js');

const rest = new REST({ version: '9'}).setToken(config['discord-token']);

module.exports = {
    event: "ready",
    once: true,
    execute: async function(client) {
        client.commands = {}

        let slashCommandData = [];
        for(const file of fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'))) {
            const command = require(`../commands/${file}`);
    
            console.log(`Loading ${command.SlashCommandData.toJSON().name} command`)
            client.commands[command.SlashCommandData.toJSON().name] = command
            slashCommandData.push(command.SlashCommandData.toJSON());
        }

        client.guilds.cache.forEach(async guild => {
            console.log("Checking server data: "+guild.id)
            serverModel.findOne({ id: guild.id }, (err, result) => {
                if(err) throw err;
                if(!result){
                    let newGuildObject = {
                        id: guild.id,
                    }
                    for(const [key, value] of Object.entries(config.defaultServerConfig)){
                        newGuildObject[key] = value;
                    }
                    const serverData = new serverModel(newGuildObject);                
                    serverData.save();
                }else if(result) {
                    for (const [key, value] of Object.entries(config.defaultServerConfig)) {
                        if (!result[key]) {
                            result[key] = value;
                        }
                    }
                    result.save();
                }
            });
        });

        await rest.put(Routes.applicationCommands(client.user.id), {body: slashCommandData});

        console.log(`Logged in as ${client.user.tag}!`)
    }
}