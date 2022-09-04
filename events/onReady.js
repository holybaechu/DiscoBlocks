const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const globalsModule = global

const config = require('../config.js');

const rest = new REST({ version: '9'}).setToken(config['discord-token']);

module.exports = {
    event: "ready",
    once: true,
    execute: async function(client) {
        client.commands = {}
        globalsModule.verifyQueue = {}

        let slashCommandData = [];
        for(const file of fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'))) {
            const command = require(`../commands/${file}`);
    
            console.log(`Loading ${command.SlashCommandData.toJSON().name} command`)
            client.commands[command.SlashCommandData.toJSON().name] = command
            slashCommandData.push(command.SlashCommandData.toJSON());
        }
        await rest.put(Routes.applicationCommands(client.user.id), {body: slashCommandData});

        console.log(`Logged in as ${client.user.tag}!`)
    }
}