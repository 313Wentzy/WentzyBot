const { SlashCommandBuilder } = require ('@discordjs/builders');
const { PermissionsBitField, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verification-message')
    .setDescription('use this message to post verification')
    .setDMPermission(false),
    async execute(interaction, client){

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Verify')
            .setCustomId('verify')
            .setStyle(ButtonStyle.Primary),
        )

        const embed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle("**Account Verification**") 
        .setDescription(`Please Click below to verify and gain access to the rest of the server\n> **You will recive a DM with further instructions**`)
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy' });
        
        await interaction.reply({ content: "***Sent successfuly***", ephemeral: true})
        await interaction.guild.channels.cache.get('1238580949877260298').send({ embeds: [embed], components: [button]});
    },
};