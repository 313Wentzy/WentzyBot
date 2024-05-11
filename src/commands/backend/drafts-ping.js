const { SlashCommandBuilder } = require ('@discordjs/builders');
const { PermissionsBitField, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('drafts-ping')
    .setDescription('use this to post a message in announcements for members to get the "@Drafts_Ping" role')
    .setDMPermission(false),
    async execute(interaction, client){

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have <@1189283996899758121> to open signups.", ephemeral: true});

        const hammertime = interaction.options.getString(`close`);

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Recive Drafts Pings!')
            .setEmoji('🔥')
            .setCustomId('button')
            .setStyle(ButtonStyle.Success),
        )

        const embed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle("**React below to recive Drafts-Pings!**") // add an option at the begining for a time stamp and change the embed description to: "Signups close at `${0:00}` - `${in 00 minutes}`"  Also; .setrequired(true),
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy' });

        const dmembed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle('**Role given: Drafts-Ping**')
        .setDescription(`You will now recive pings when drafts are being hosted!`)
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy | DM an Admin / founder to remove the role' });
        

        await interaction.reply({ content: "***Sent successfuly***", ephemeral: true})

        await interaction.guild.channels.cache.get('1189281723104628868').send({ embeds: [embed], components: [button]});

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button]})

            const role = interaction.guild.roles.cache.find(r => r.name === 'Drafts-Ping');

            const member = i.member;

            member.roles.add(role);

            i.user.send({ embeds: [dmembed]}).catch(err => { 
                return;
            }) 
        })
    },
};