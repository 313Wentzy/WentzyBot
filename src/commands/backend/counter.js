const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('counter')
        .setDescription('find the number of pushups required for the day')
        .addIntegerOption(option => option.setName(`month`).setDescription(`the current month of the year`).setRequired(true)).addStringOption(option => option.setName(`day`).setDescription(`the current day of the month`).setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client) {

    const month = interaction.options.getInteger(`month`);


        

    const embed = new EmbedBuilder()
    .setTitle('title')
    .setColor('000000')
    .setDescription(`Date:
            
    ${month}`,)
    
    .setTimestamp()
    .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});
    await interaction.reply({ embeds: [embed], ephemeral: true});

    },
};


 /* const time = interaction.options.getInteger(`time`);

        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        const newMinutes = (date.getMinutes() + time);
        date.setMinutes(newMinutes)
        const futureTimestamp = Math.floor(date.getTime() / 1000); 
        
        `**Timestamps:**
        
MM/DD/YYYY -> <t:${timestamp}:d>
        
MM, DD, YYYY -> <t:${timestamp}:D>

0:00 -> <t:${timestamp}:t>

0:00:00 -> <t:${timestamp}:T>

M DD, YYYY, 0:00 -> <t:${timestamp}:f>

D M, DD, YYYY, 0:00 -> <t:${timestamp}:F>

00 minutes/seconds ago -> <t:${timestamp}:R>

<t:${futureTimestamp}:R>`*/