const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    SlashCommandData: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Use this command to configure/setup your bot!'),
    async execute(client, interaction) {
        // Embed testings
        const embed = new discord.EmbedBuilder()
            .setColor(discord.Colors.Aqua)
        interaction.reply({embeds: [embed]})
    }
}