const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
     .setName('report')
     .setDescription('Reports an user to STAFF')
     .addUserOption(option => option.setName('user').setDescription('User to report.').setRequired(true))
     .addStringOption(option => option.setName('complaint').setDescription('Your complaint about this user.').setRequired(true))
     .addChannelOption(option => option.setName('channel').setDescription('Channel where your complaint happened, if there\'s any.').setRequired(false)),
     
     async execute(interaction) {
         const complainer = interaction.user;
         const channel = interaction.options.getChannel('channel') || 'Channel not specified.';
         const reportedUser = interaction.options.getUser('user');
         const complaint = interaction.options.getString('complaint');
         
         if (complainer.id === reportedUser.id) {
             await interaction.reply({
                 content: `${complainer}, you can't report yourself!`,
                 ephemeral: true
             });
         } else {
             const embed = new EmbedBuilder()
              .setTitle('🚨 New report!')
              .setDescription(`**${complainer} filed a report!\n\n**User reported: ${reportedUser} (\`${reportedUser.id}\`)\n**Complaint:** *${complaint}*\nChannel: ${channel}`)
              .setColor('Red')
              .setTimestamp()
              //interaction.guild.channels.cache.get('1210816525301186601').send({ content: `__**TEAM 1:**__ 

             await interaction.guild.channels.cache.get('1238218947187183717').send({ embeds: [embed] });
             await interaction.reply({ content: `File reported against ${reportedUser}.`, ephemeral: true });
         }
     },
};