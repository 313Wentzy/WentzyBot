const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('UserInfo')
    .setType(ApplicationCommandType.User),
    async execute(interaction){

        const Targetuser = interaction.targetMember;

        const embed = new EmbedBuilder()
        .setTitle(`Details for the following user: ${Targetuser.user.username}`)
        .addFields(
            { name: 'UserID:', value: `${Targetuser.user.id}`, inline: true },
            { name: 'User:', value: `${Targetuser}`, inline: true },
            { name: 'Username:', value: `${Targetuser.user.username}`, inline: true }
            )
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});
        

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}