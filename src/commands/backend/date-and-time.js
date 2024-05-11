const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('date-and-time')
    .setDescription('use this command to return the date and time in a form of hammertime!')
    .setDMPermission(false),
    async execute(interaction, client){

        // every 3600 = 1 hour (if needed to add)

        const timestamp = Math.floor(Date.now() / 1000 );

        await interaction.reply({ content: `**Timestamps:**
        
MM/DD/YYYY -> <t:${timestamp}:d>
        
MM, DD, YYYY -> <t:${timestamp}:D>

0:00 -> <t:${timestamp}:t>

0:00:00 -> <t:${timestamp}:T>

M DD, YYYY, 0:00 -> <t:${timestamp}:f>

D M, DD, YYYY, 0:00 -> <t:${timestamp}:F>

00 minutes/seconds ago -> <t:${timestamp}:R>`, ephemeral: true})

    },
};