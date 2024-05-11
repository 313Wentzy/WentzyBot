const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('team-setup-2s')
        .setDescription('Quickly set up teams and who is paying who for fours!')
        .addUserOption(option => option.setName(`user1`).setDescription(`Player 1 on team 1`).setRequired(true))
        .addUserOption(option => option.setName(`user2`).setDescription(`Player 2 on team 1`).setRequired(true))
        .addUserOption(option => option.setName(`user3`).setDescription(`Player 1 on team 2`).setRequired(true))
        .addUserOption(option => option.setName(`user4`).setDescription(`Player 2 on team 2`).setRequired(true))
        .addIntegerOption(option => 
            option.setName(`amount`)
                    .setDescription('How much is each person putting up')
                    .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client) {

        // remove the "signed up" role from everyone by deleting it and re-creating it 

        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');
        const user3 = interaction.options.getUser('user3');
        const user4 = interaction.options.getUser('user4');
        const amount = interaction.options.getInteger('amount');

        const userID = interaction.user.id

        const timestamp = Math.floor(Date.now() / 1000 );

        const draftlogs = new EmbedBuilder()
        .setColor('#000000')
        .setTitle('***DRAFTS LOGS***')
        .setDescription(`**Teams created**
        
*Date:* **<t:${timestamp}:d>**
*Time:* **<t:${timestamp}:t>**

*Users:* 
    > **Team 1:** ${user1}, ${user2}
    > 
    > **Team 2:** ${user3}, ${user4}

*Amount:* **$${amount}** *(per user)*

User: <@${userID}>`)
.setFooter({ text: 'Created by freewentzy | Use this in case messages are deleted' })

        interaction.reply({ content: "***Sent successfuly***", ephemeral: true})

interaction.guild.channels.cache.get('1210816525301186601').send({ content: `__**TEAM 1:**__ 
${user1}
${user2}

__**TEAM 2:**__
${user3}
${user4}`  
})

interaction.guild.channels.cache.get('1210816547229011990').send({ content: `__**TEAM 1:**__
${user1} pays ${user3}
${user2} pays ${user4}

__**TEAM 2:**__
${user3} pays ${user1}
${user4} pays ${user2}

***$${amount} EACH***`
})
.then(m => m.react('✅'))
interaction.guild.channels.cache.get('1211013209822199829').send({ embeds: [draftlogs]
})
},
};