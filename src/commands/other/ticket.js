const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle } = require('discord.js');
const ticket = require('../../schemas/ticketSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Manage the ticket system')
    .addSubcommand(command => command.setName('send').setDescription('Send the ticket message'))
    .addSubcommand(command => command.setName('setup').setDescription('Setup the ticket category').addChannelOption(option => option.setName('category').setDescription('The category to send tickets in').addChannelTypes(ChannelType.GuildCategory).setRequired(true)))
    .addSubcommand(command => command.setName('remove').setDescription('Resets the data of the ticket system'))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute (interaction) {
 
        const { options } = interaction; 
        const sub = options.getSubcommand();
        const data = await ticket.findOne({ Guild: interaction.guild.id});

        switch (sub) {
            case 'send':
                if (!data) return await interaction.reply({ content: `You have to do /ticket setup before you can send a ticket message...`, ephemeral: true });

                const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Create a ticket!')
                    .setCustomId('ticketCreateSelect')
                    .setStyle(ButtonStyle.Primary),
                )
 
                const embed = new EmbedBuilder()
                .setColor('Blurple')
                .setTitle(`Create a ticket!`)
                .setTimestamp()
                .setDescription('Create a ticket to talk with the server staff! Once selected below, use the input to describe why you are creating this ticket')
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

                const date = new Date();
                const timestamp = Math.floor(date.getTime() / 1000);
                const user = interaction.user;
                const userID = user.id

                const logMessageSent = new EmbedBuilder()
                .setTitle(`**Ticket message sent**`)
                .addFields(
                { name: 'Sent by:', value: `<@${userID}>`, inline: true },
                { name: 'Time sent:', value: `<t:${timestamp}:f>`, inline: true }
                )
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});
 
                await interaction.reply({ content: `Your ticket message will be sent below.`, ephemeral: true });
                await interaction.channel.send({ embeds: [embed], components: [button] });
                await interaction.guild.channels.cache.get('1211013209822199829').send({ embeds: [logMessageSent]});
            break;
            case 'remove':
                if (!data) return await interaction.reply({ content: `Looks like you don't already have a ticket system set`, ephemeral: true });
                else {
                    await ticket.deleteOne({ Guild: interaction.guild.id});
                    await interaction.reply({ content: `I have deleted your ticket category.`, ephemeral: true });
                }
 
            break;
            case 'setup':
                if (data) return await interaction.reply({ content: `Looks like you already have a ticket category set to <#${data.Category}>`, ephemeral: true });
                else {
                    const category = options.getChannel('category');
                    await ticket.create({ 
                        Guild: interaction.guild.id,
                        Category: category.id
                    });
 
                    await interaction.reply({ content: `I have set the category to **${category}**! Use /ticket send to send a ticket create message`, ephemeral: true });
                }
        }
 
 
    }
}