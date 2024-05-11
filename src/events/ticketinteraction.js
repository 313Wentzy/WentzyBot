const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const ticket = require('../schemas/ticketSchema');
const { createTranscript } = require('discord-html-transcripts');
 
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
 
        if (interaction.customId == 'ticketCreateSelect') {
            const modal = new ModalBuilder()
            .setTitle(`Create your ticket`)
            .setCustomId('ticketModal')
 
            const why = new TextInputBuilder()
            .setCustomId('whyTicket')
            .setRequired(true)
            .setPlaceholder('What is the reason for creating this ticket')
            .setLabel('Why are you creating this ticket?')
            .setStyle(TextInputStyle.Paragraph);
 
            const info = new TextInputBuilder()
            .setCustomId('infoTicket')
            .setRequired(false)
            .setPlaceholder('Feel free to leave this blank')
            .setLabel('Provide us with any additional information')
            .setStyle(TextInputStyle.Paragraph);
 
            const one = new ActionRowBuilder().addComponents(why);
            const two = new ActionRowBuilder().addComponents(info);
 
            modal.addComponents(one, two);
            await interaction.showModal(modal);
        } else if (interaction.customId == 'ticketModal') {
            const user = interaction.user;
            const userID = user.id
            const data = await ticket.findOne({ Guild: interaction.guild.id});
            if (!data) return await interaction.reply({ content: `Sorry! Looks like you found this message but the ticket system is not yet setup here.`, ephemeral: true });
            else {
                const why = interaction.fields.getTextInputValue('whyTicket');
                const info = interaction.fields.getTextInputValue('infoTicket') || 'Nothing provided.';
                const category = await interaction.guild.channels.cache.get(data.Category);
 
                const channel = await interaction.guild.channels.create({ 
                    name: `ticket-${user.id}`, 
                    type: ChannelType.GuildText,
                    topic: `Ticket user: ${user.username}; Ticket reason: ${why}`,
                    parent: category,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
                        }
                    ]
                });
 
                const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`Ticket from ${user.username}`)
                .setDescription(`Opening Reason: ${why}\n\nExtra Information: ${info}\n\nOpened by: <@${userID}>`)
                .setTimestamp()
                .setFooter({ text: `${interaction.guild.name} | Created by freewentzy`, iconURL: `${interaction.guild.iconURL()}`});
 
                const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('closeTicket')
                    .setLabel(`🔐 Close Ticket`)
                    .setStyle(ButtonStyle.Danger),
 
                    new ButtonBuilder()
                    .setCustomId('ticketTranscript')
                    .setLabel('📜 Transcript')
                    .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                    .setCustomId('userID')
                    .setLabel('View ID')
                    .setStyle(ButtonStyle.Secondary)
                );

                const date = new Date();
                const timestamp = Math.floor(date.getTime() / 1000);

            const logSent = new EmbedBuilder()
                .setTitle(`**Ticket created**`)
                .addFields(
                { name: 'Created in:', value: `${channel}`, inline: true },
                { name: 'Opened by:', value: `<@${userID}>`, inline: true },
                { name: 'Time opened:', value: `<t:${timestamp}:f>`, inline: true },
                { name: 'Opening Reason:', value: `${why}`, inline: false },
                { name: 'Aditional Info:', value: `${info}`, inline: false }
                )
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`}); 
 
                await channel.send({ content: `||<@${userID}> <@&1224414117847236739>||`, embeds: [embed], components: [button] });
                await interaction.reply({ content: `Your ticket has been opened in ${channel}`, ephemeral: true });
                await interaction.guild.channels.cache.get('1211013209822199829').send({ embeds: [logSent]}) // logs channel - can be changed to anything using this backend!
            } 
        } else if (interaction.customId == 'closeTicket') {
            const closeModal = new ModalBuilder()
            .setTitle(`Ticket Closing`)
            .setCustomId('closeTicketModal')
 
            const reason = new TextInputBuilder()
            .setCustomId('closeReasonTicket')
            .setRequired(true)
            .setPlaceholder('What is the reason for closing this ticket?')
            .setLabel('Provide a closing reason')
            .setStyle(TextInputStyle.Paragraph);
 
            const one = new ActionRowBuilder().addComponents(reason);
 
            closeModal.addComponents(one);
            await interaction.showModal(closeModal);
        } else if (interaction.customId == 'closeTicketModal') {
            var channel = interaction.channel;
            var name = channel.name;
            name = name.replace('ticket-', '');
            const member = await interaction.guild.members.cache.get(name); 
 
            const reason = interaction.fields.getTextInputValue('closeReasonTicket');

            const date = new Date();
            const timestamp = Math.floor(date.getTime() / 1000);

            const DMembed = new EmbedBuilder()
            .setTitle(`**Your Ticket has been closed in ${interaction.guild.name}**`)
            .setDescription(`> Your ticket was closed at **<t:${timestamp}:t>** - **<t:${timestamp}:R>** and was closed for:
            > \`${reason}\`
            
            ***Thank you for contacting us! If you need anything else just feel free to open up another ticket!***`)
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});
            await interaction.reply({ content: `***This ticket will be closed shortly***`});

            const user = interaction.user;
            const userID = user.id;

            const file = await createTranscript(interaction.channel, {
                limit: -1,
                returnBuffer: false,
                filename: `${interaction.channel.name}.html`
            });
 
            var msg = await interaction.channel.send({ content: `Your transcript cache:`, files: [file] });
            var message = `[Ticket Transcript](https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url})`;
            await msg.delete().catch(err => {});

            const logClosed = new EmbedBuilder()
                .setTitle(`**Ticket Closed**`)
                .addFields(
                { name: 'Closed by:', value: `<@${userID}>`, inline: true },
                { name: 'Time Closed:', value: `<t:${timestamp}:f>`, inline: true },
                { name: 'Closing Reason:', value: `${reason}`, inline: false },
                )
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});

                var url = `https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`

                const row = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setURL(url)
                .setLabel('View ticket transcript')
                .setStyle(ButtonStyle.Link)
                )
                await interaction.guild.channels.cache.get('1211013209822199829').send({ embeds: [logClosed], components: [row]})
            
            setTimeout(async () => {
                await channel.delete().catch(err => {});
                await member.send({ embeds: [DMembed]}).catch(err => {});
            }, 5000);
        } else if (interaction.customId == 'ticketTranscript') {
            const file = await createTranscript(interaction.channel, {
                limit: -1,
                returnBuffer: false,
                filename: `${interaction.channel.name}.html`
            });
 
            var msg = await interaction.channel.send({ content: `Your transcript cache:`, files: [file] });
            var message = `📜 **Here is your [ticket transcript](https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}) from ${interaction.guild.name}!**`;
            await msg.delete().catch(err => {});
            await interaction.reply({ content: message, ephemeral: true });
        } else if (interaction.customId == 'userID') {
            const user = interaction.user;
            const userID = user.id

            await interaction.reply({ content: `${userID}`, ephemeral: true})
        } 
    },
};