const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { row } = require('mathjs');

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('team-setup-4s')
        .setDescription('Quickly set up teams and who is paying who for fours!')
        .addUserOption(option => option.setName(`user1`).setDescription(`Player 1 on team 1`).setRequired(true))
        .addUserOption(option => option.setName(`user2`).setDescription(`Player 2 on team 1`).setRequired(true))
        .addUserOption(option => option.setName(`user3`).setDescription(`Player 3 on team 1`).setRequired(true))
        .addUserOption(option => option.setName(`user4`).setDescription(`Player 4 on team 1`).setRequired(true))
        .addUserOption(option => option.setName(`user5`).setDescription(`Player 1 on team 2`).setRequired(true))
        .addUserOption(option => option.setName(`user6`).setDescription(`Player 2 on team 2`).setRequired(true))
        .addUserOption(option => option.setName(`user7`).setDescription(`Player 3 on team 2`).setRequired(true))
        .addUserOption(option => option.setName(`user8`).setDescription(`Player 4 on team 2`).setRequired(true))
        .addIntegerOption(option => 
            option.setName(`amount`)
                    .setDescription('How much is each person putting up')
                    .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client) {

        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');
        const user3 = interaction.options.getUser('user3');
        const user4 = interaction.options.getUser('user4');
        const user5 = interaction.options.getUser('user5');
        const user6 = interaction.options.getUser('user6');
        const user7 = interaction.options.getUser('user7');
        const user8 = interaction.options.getUser('user8');
        const amount = interaction.options.getInteger('amount');

        const timestamp = Math.floor(Date.now() / 1000 );

        const userID = interaction.user.id

        const draftlogs = new EmbedBuilder()
        .setColor('#000000')
        .setTitle('**DRAFTS LOGS**')
        .setDescription(`**Teams created**
        
*Date:* **<t:${timestamp}:d>**
*Time:* **<t:${timestamp}:t>**

*Users:* 
    > **Team 1:** ${user1}, ${user2}, ${user3}, ${user4}
    > 
    > **Team 2:** ${user5}, ${user6}, ${user7}, ${user8}

*Amount:* **$${amount}** *(per user)*

Command used by: <@${userID}>`)

.setFooter({ text: 'Created by freewentzy | Use this in case messages are deleted' })



        interaction.reply({ content: "***Sent successfuly***", ephemeral: true})

        interaction.guild.channels.cache.get('1210816525301186601').send({ content: `__**TEAM 1:**__
${user1}
${user2}
${user3}
${user4}
        
__**TEAM 2:**__
${user5}
${user6}
${user7}
${user8}`  

})

interaction.guild.channels.cache.get('1210816547229011990').send({ content: `__**TEAM 1:**__
${user1} pays ${user5}
${user2} pays ${user6}
${user3} pays ${user7}
${user4} pays ${user8}
        
__**TEAM 2:**__
${user5} pays ${user1}
${user6} pays ${user2}
${user7} pays ${user3}
${user8} pays ${user4}

***$${amount} EACH***`
})
.then(m => m.react('✅'))

    const dragembed = new EmbedBuilder()
        .setColor('000000')
        .setTitle('Interact with the buttons below to automatically drag the users to their team vcs!')
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name} | Created by freewentzy`, iconURL: `${interaction.guild.iconURL()}`});


        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('drag')
            .setLabel(`Drag users to team VCs`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('dragback')
            .setLabel('Drag to same VC')
            .setStyle(ButtonStyle.Primary)
        );

    interaction.guild.channels.cache.get('1211013209822199829').send({ 
        embeds: [draftlogs],
        });
    interaction.guild.channels.cache.get('1211013209822199829').send({ 
        embeds: [dragembed], 
        components: [row] 
        });
    
    
    },
};