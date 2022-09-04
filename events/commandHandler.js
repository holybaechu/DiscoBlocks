module.exports = {
    event: "interactionCreate",
    once: false,
    async execute(client, interaction){
        if(!interaction.isCommand) return;
        if(!interaction.inGuild()) return;

        for (var key in client.commands){
            if(client.commands[key].SlashCommandData.toJSON().name == interaction.commandName){
                try{
                    (async () => {
                        await client.commands[key].execute(client, interaction, true);
                    })();
                }catch(err) {
                    console.log(err);

                    const embed = new discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Error')
                        .setDescription(`An error occurred while executing the command.`)
                        .setFooter({ text: interaction.member.nickname || interaction.user.username, iconURL: interaction.member.avatarURL() || interaction.user.avatarURL() })
                        .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                }
            }
        }
    }
}