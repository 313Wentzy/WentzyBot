const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Balance')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const targetUserId = interaction.targetId;
        const Targetuser = interaction.targetMember;

        try {
            // Find the user's profile data from the database
            const userProfile = await UserProfile.findOne({ userId: targetUserId });

            if (userProfile.balance == '0') {
                const bt = "`";
                const embed = new EmbedBuilder()
                    .setTitle(`Balance of ${Targetuser.user.username}`)
                    .setDescription(`> ${bt} This user is not in any Debt ${bt} `)
                    .setColor('000000')
                    .setTimestamp()
                    .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

                // Reply with the embed
                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            } else if(userProfile.balance != '0') {
                const bt = "`";
                const embed = new EmbedBuilder()
                    .setTitle(`Balance of ${Targetuser.user.username}`)
                    .setDescription(`> Debt: ${bt} ${userProfile.balance} ${bt} `)
                    .setColor('000000')
                    .setTimestamp()
                    .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });

                    const button = new ActionRowBuilder()
                        .addComponents(
                        new ButtonBuilder()
                        .setLabel('Resolve debt')
                        .setCustomId('resolvedebt')
                        .setStyle(ButtonStyle.Primary),
        )
                // Reply with the embed
                interaction.reply({ embeds: [embed], components: [button], ephemeral: true });
            } else {
                interaction.reply({ content: `User profile not found.  ${userProfile.balance}`, ephemeral: true });
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            interaction.reply({ content: 'An error occurred while fetching user profile.', ephemeral: true });
        }
    }
};