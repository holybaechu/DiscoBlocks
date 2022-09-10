const discord = require('discord.js');

module.exports = {
    event: "interactionCreate",
    once: false,
    execute: async function(client, interaction) {
        if(interaction.customId == "setup-p1-selectmenu"){
            global.setupQueue[interaction.guildId].selecMenuInteraction = interaction
            interaction.deferUpdate();
        }
    }
}