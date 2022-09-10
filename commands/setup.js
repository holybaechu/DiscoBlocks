const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    SlashCommandData: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Use this command to configure/setup your bot!'),
    async execute(client, interaction) {
        global.setupQueue[interaction.guildId] = {
            
        }

        interaction.reply({embeds: [
            new discord.EmbedBuilder()
                .setColor(discord.Colors.Blue)
                .setTitle("Setup Process 1/1")
                .setDescription("Would you like to add verify role or select existing verify role?")], components: [new discord.ActionRowBuilder()
                    .addComponents([
                        new discord.SelectMenuBuilder()
                            .setCustomId("setup-p1-selectmenu")
                            .setPlaceholder("Noting selected")
                            .addOptions(
                                {
                                    label: "Add verify role",
                                    value: "addRole"
                                },
                                {
                                    label: "Select existing role",
                                    value: "selectRole"
                                }
                            ),
                    ])
            ,new discord.ActionRowBuilder()
                .addComponents([
                    new discord.ButtonBuilder()
                        .setCustomId("setup-p1-submitbutton")
                        .setLabel("Submit")
                        .setEmoji('✅')
                        .setStyle(discord.ButtonStyle.Success)
                ])
            ]
        })
    }
}