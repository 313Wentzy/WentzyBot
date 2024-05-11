const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, ActionRowBuilder,ButtonBuilder, ButtonStyle } = require('discord.js');
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('PaymentInfo')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const targetUserId = interaction.targetId;
        const Targetuser = interaction.targetMember;

        try {
            // Find the user's profile data from the database
            const userProfile = await UserProfile.findOne({ userId: targetUserId });
        if (interaction.user.id == targetUserId) {
            if (userProfile) {
                const bt = "```";
                const embed = new EmbedBuilder()
                    .setTitle(`Payment Details for ${Targetuser.user.username}`)
                    .addFields(
                        { name: 'Cashapp:', value: `${bt} ${userProfile.Cashapp || 'Not provided'} ${bt} `, inline: false },
                        { name: 'PayPal:', value: `${bt} ${userProfile.Paypal || 'Not provided'} ${bt}`, inline: false }
                    )
                    .setColor('000000')
                    .setTimestamp()
                    .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

                // Reply with the embed 
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                const embed = new EmbedBuilder()
                .setTitle('**User profile not found**')
                .setDescription('> It looks like you have not set up your Payment details yet!  Please interact below to link them')
                .setColor('000000')
                .setTimestamp()
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

                const button = new ActionRowBuilder()
                        .addComponents(
                        new ButtonBuilder()
                        .setLabel('Add your payment methods')
                        .setCustomId('verify')
                        .setStyle(ButtonStyle.Primary),
                        )
                interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
            }
        } else if (userProfile) {
            const bt = "```";
            const embed = new EmbedBuilder()
                .setTitle(`Payment Details for ${Targetuser.user.username}`)
                .addFields(
                    { name: 'Cashapp:', value: `${bt} ${userProfile.Cashapp || 'Not provided'} ${bt} `, inline: false },
                    { name: 'PayPal:', value: `${bt} ${userProfile.Paypal || 'Not provided'} ${bt}`, inline: false }
                )
                .setColor('000000')
                .setTimestamp()
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

            // Reply with the embed 
            interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = new EmbedBuilder()
                .setTitle('**User profile not found**')
                .setDescription('> This user has not linked their Payment details yet')
                .setColor('000000')
                .setTimestamp()
                .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

                interaction.reply({ embeds: [embed], ephemeral: true });

        }

        } catch (error) {
            console.error('Error fetching user profile:', error);
            interaction.reply({ content: 'An error occurred while fetching user profile.', ephemeral: true });
        }
    }
};