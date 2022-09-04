const discord = require('discord.js');
const globalsModule = require('../globals.js');

module.exports = {
    event: "interactionCreate",
    once: false,
    execute: async function(client, interaction) {
        if (interaction.type !== discord.InteractionType.ModalSubmit) return;
        if (interaction.customId === 'verifyModal') {
            globalsModule.verifyQueue[interaction.fields.getField('plrName').value] = interaction.user

            await interaction.reply({ content: `Click the ${"`✅ Verify`"} button and join to game follow to instructions to verify your account!`, components: [new discord.ActionRowBuilder()
                .addComponents(
                    new discord.ButtonBuilder()
                        .setLabel('Verify')
                        .setStyle(discord.ButtonStyle.Link)
                        .setEmoji("✅")
                        .setURL('https://web.roblox.com/games/10801391653/')
                )], ephemeral: true
            });
        }
    }
}