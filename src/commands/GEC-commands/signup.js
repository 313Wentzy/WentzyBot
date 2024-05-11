const { SlashCommandBuilder } = require ('@discordjs/builders');
const { PermissionsBitField, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('signups')
    .setDescription('Use this command to open drafts-signups!')
    .addIntegerOption(option => 
        option.setName(`time`).setDescription(`This is when draft signups will close (in minutes from now)`).setRequired(true))
    .setDMPermission(false),

    async execute(interaction, client){

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Signup')
            .setCustomId('signupi')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('View rules')
            .setCustomId('rules')
            .setStyle(ButtonStyle.Secondary)
        )

        const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Signup')
            .setCustomId('signupi1')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(),

            new ButtonBuilder()
            .setLabel('View rules')
            .setCustomId('rules1')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(),
        )

        const time = interaction.options.getInteger(`time`);

        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        const newMinutes = (date.getMinutes() + time);
        date.setMinutes(newMinutes)
        const futureTimestamp = Math.floor(date.getTime() / 1000);

        const embed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle("**React below to signup for Drafts!**") 
        .setDescription(`> Signups are now open and will close at **<t:${futureTimestamp}:t>** - **<t:${futureTimestamp}:R>**`)
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy' });

        const embed2 = new EmbedBuilder()
        .setColor('#000000')
        .setTitle("**Signups are now closed**")
        .setDescription(`> Closed at: **<t:${futureTimestamp}:t>** - **<t:${futureTimestamp}:R>**`)
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy | More drafts will be hosted later!' });

    await interaction.reply({ content: "***Sent successfuly***", ephemeral: true})
const m = await interaction.guild.channels.cache.get('1210816494292697139').send({ content: `<@&1210820513505611816>`, embeds: [embed], components: [row]});
        
    const timeout = Math.floor( time * 60000 )
    
   setTimeout(() => {
    m.edit({ embeds: [embed2], components: [row2]})
   }, timeout);



   const userID = interaction.user.id

        const draftlogs = new EmbedBuilder()
        .setColor('Green')
        .setTitle('***DRAFTS LOGS***')
        .setDescription(`Status: Signups Opened ✅
        
> *Date opened:* **<t:${timestamp}:d>**
> *Time opened:* **<t:${timestamp}:t>**

*Sign-ups will close at:* **<t:${futureTimestamp}:t>** - **<t:${futureTimestamp}:R>**

Opened by: <@${userID}>`)
.setFooter({ text: 'Created by freewentzy | Use this in case messages are deleted' })

// timeout = closed draftlogs

const closeddraftlogs = new EmbedBuilder()
        .setColor('Red')
        .setTitle('***DRAFTS LOGS***')
        .setDescription(`Status: Signups Closed ❌
        
> *Date opened:* **<t:${timestamp}:d>**
> *Time opened:* **<t:${timestamp}:t>**

*Signups were closed at:* **<t:${futureTimestamp}:t>** - **<t:${futureTimestamp}:R>**

Opened by: <@${userID}>`)
.setFooter({ text: 'Created by freewentzy | Use this in case messages are deleted' })

const log = await interaction.guild.channels.cache.get('1211013209822199829').send({ embeds: [draftlogs]})

   // add something that at .1 * timeout reply to the orrginal message and ping all signed up to join gen/wait room
   setTimeout(() => {
        log.edit({ embeds: [closeddraftlogs]})
   }, timeout);

   

   await interaction.guild.channels.cache.get('1211013209822199829').send({ content: `**Signed up users:**`});

    },
};