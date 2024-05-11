const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('future-time1')
        .setDescription('use this command to return a timestamp for a future time')
        .addIntegerOption(option => option.setName(`time`).setDescription(`the imput will be this many minutes away from the current time`).setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client) {

        const time = interaction.options.getInteger(`time`);

        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        const newMinutes = (date.getMinutes() + time);
        date.setMinutes(newMinutes)
        const futureTimestamp = Math.floor(date.getTime() / 1000);

        await interaction.reply({
            content: `**Timestamps:**
        
MM/DD/YYYY -> <t:${timestamp}:d>
        
MM, DD, YYYY -> <t:${timestamp}:D>

0:00 -> <t:${timestamp}:t>

0:00:00 -> <t:${timestamp}:T>

M DD, YYYY, 0:00 -> <t:${timestamp}:f>

D M, DD, YYYY, 0:00 -> <t:${timestamp}:F>

00 minutes/seconds ago -> <t:${timestamp}:R>

<t:${futureTimestamp}:R>`, ephemeral: true
        })
    },
};