const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {
    mod: true,
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('This is the test command!'),
    async execute(interaction){
        interaction.reply({ content: 'The bot is working!', ephemeral: true });
    }
}