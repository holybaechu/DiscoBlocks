const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    SlashCommandData: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verifies you by Roblox.'),
    async execute(client, interaction) {
        const modal = new discord.ModalBuilder()
            .setCustomId('verifyModal')
            .setTitle('Verify')
        
        const PlayerNameInput = new discord.TextInputBuilder()
            .setCustomId('plrName')
            .setLabel("Type your roblox username here.")
            .setStyle(discord.TextInputStyle.Short)

        const ActionRow = new discord.ActionRowBuilder().addComponents(PlayerNameInput);

        modal.addComponents(ActionRow)
        await interaction.showModal(modal)
    }
}