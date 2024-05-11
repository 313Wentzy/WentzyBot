const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ActionRow } = require("discord.js");
const UserProfile = require("../schemas/UserProfile");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if ( interaction.customId == 'signupi') {
        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        const newMinutes = (date.getMinutes());
        date.setMinutes(newMinutes)
        const futureTimestamp = Math.floor(date.getTime() / 1000);

        const dmembed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle('**You are now signed up for drafts!**')
        .setDescription(`*Make sure to get in <#1189265208519164004> when or before they start!*`)
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy | Please note that spaming "Signup" will not do anything but send this DM again' });

        const role = interaction.guild.roles.cache.find(r => r.name === 'signed-up');
        const member = interaction.member;
        member.roles.add(role);

        await interaction.guild.channels.cache.get('1211013209822199829').send({ content: `> ${member}`});
        await interaction.reply({ content: `*You are now signed up for drafts!*`, ephemeral: true})
            await interaction.user.send({embeds: [dmembed]})
        } else if (interaction.customId == 'rules') {
            const rulesembed = new EmbedBuilder()
            .setTitle('**GEC Drafts Rules:**')
            .setDescription(`**BASIC DRAFT RULES/INFORMATION**

            > To play drafts in this server **YOU MUST HAVE BREAD TO PAY FOR YOURSELF**, If you lose a draft and end up not having the bread pay to the winner you'll have the <@&1236819208134856814>  role until it is payed. (*You will not be allowed to play any drafts until it is payed*)
            
            1. All drafts are **First To 7 Win By 2** unless said so beforehand.
            
            2. If no price was discussed (the amount of the token) - it is started off at **$2**
            
            3. If you do not want a round to count **STAND STILL** to indicate it. - if you continue the the round and afterwards say an excuse the round will still count.
            
            4. **LAGGING IS NOT AN EXCUSE** - If you attempt to void a round because somebody was lagging it will not be voided unless you have sufficient proof. (This means if youi're literally teleporting/it was unplayable, idc if your ping was 20 higher, you're still able to play)
            
            5. Say you just won a OG (Original Bet) - now you're going to do a double, if anyone from the **WINNING TEAM** leaves during the double its a forfeit. (*Nobody pays*)
            
            6. If you're playing a OG (*first round not a double*) and somebody leaves thats an automatic forfeit - and the player that **left** has to pay the opposing team $1 each.
            
            7. **TO DOUBLE IS DECIDED BY THE LOSING TEAM** - The team that won has no say in this.
            
            8. **THE WINNING TEAM DECIDES THE GAMEMODE OF THE DOUBLE** - (*The gamemode cannot be the gamemode the OG was*)
            > Gamemode Options -> Zonewars - Boxfights - ESL(Capture the Flag) - Realistics.
            
            9. If you would like to triple it must be a mutual agreement by both teams 
            > (Also for the retards that don't know what triple means - **TRIPLE IS "TRIPLE THE DOUBLE BET, NOT THE OG BET**" - Ex: $10 Token, you're now doubling so it's now $20, to triple now its $60, not 30.
            
            Before every draft, everyone must agree to these rules. - Also if you disagree with any of these or if you would like to add any rules, let us know in in <#1189271858894360757>
            `)
            .setColor('000000')
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name} | Created by freewentzy`, iconURL: `${interaction.guild.iconURL()}`});

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Go to DMs')
                .setURL('https://discord.com/channels/@me/1210366584867135498')
                .setStyle(ButtonStyle.Link),
            )

            interaction.reply({content: `<@${interaction.user.id}>, check your DMs!`, components: [row], ephemeral: true})
            await interaction.user.send({ embeds: [rulesembed]});
        } else if (interaction.customId == 'pingbutton') {
            
            const dmembed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle('**Role given: Drafts-Ping**')
                .setDescription(`You will now recive pings when drafts are being hosted!`)
                .setTimestamp()
                .setFooter({ text: `${interaction.guild.name} | Created by freewentzy`, iconURL: `${interaction.guild.iconURL()}`});

                const role = interaction.guild.roles.cache.find(r => r.name === 'Drafts-Ping');
                const member = interaction.member;
                member.roles.add(role);
                
                await interaction.reply({ content: `*> **You will now be notified when drafts are being hosted!***`, ephemeral: true})
                await interaction.user.send({ embeds: [dmembed]})

        } else if (interaction.customId == 'removerole') {
            
            const role = interaction.guild.roles.cache.find(r => r.name === 'Drafts-Ping');
                const member = interaction.member;
                member.roles.remove(role);

            interaction.reply({content: `> ***Role successfully removed***`, ephemeral: true})
        } else if (interaction.customId == 'verify') {

            const newuser = new EmbedBuilder()
            .setTitle('Verify in GEC Drafts')
            .setDescription('> To verify, please input your Payment methods by clicking below')
            .setTimestamp()
            .setColor('000000')
            .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});


            const registereduser = new EmbedBuilder()
            .setTitle('It looks like you are already verified in this server')
            .setDescription('> If you would like to change your Payment methods, please click the button below')
            .setTimestamp()
            .setColor('000000')
            .setFooter({ text: `Created by freewentzy | ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});

            const payoutbutton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Connect your Payment methods')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('connectpayment'),
                )

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Go to DMs')
                    .setURL('https://discord.com/channels/@me/1210366584867135498')
                    .setStyle(ButtonStyle.Link),
                )

            const changepayoutbutton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Change Payment methods')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('changeconnectpayment'),
                )

            const member = await interaction.guild.members.fetch(interaction.user);
        
            if(!member.roles.cache.has('1238719642747535412')) {
                await interaction.reply({content: `<@${interaction.user.id}>, check your DMs!`, components: [row], ephemeral: true})
                await interaction.user.send({ embeds: [newuser], components: [payoutbutton]})
                const role = interaction.guild.roles.cache.find(r => r.name === 'Verified'); // change to verified
                const member = interaction.member;
                member.roles.add(role);
               return;
                
            } else {
                await interaction.reply({content: `<@${interaction.user.id}>, check your DMs!`, components: [row], ephemeral: true})
               await interaction.user.send({ embeds: [registereduser], components: [changepayoutbutton] }); //  maybe use dif button for changing and not adding new
            }
    
        } else if (interaction.customId == 'connectpayment') {
            let userProfile = await UserProfile.findOne({
                UserId: interaction.user.id
            });
            
            if (!userProfile) {
                const modal = new ModalBuilder()
                .setTitle(`Input your Payment Methods`)
                .setCustomId('paymentmodal')
     
                    const mcashapp = new TextInputBuilder()
                    .setCustomId('cashapp')
                    .setRequired(true)
                    .setPlaceholder('Ex: $Wentzy1x')
                    .setLabel('Please input your cashapp below')
                    .setStyle(TextInputStyle.Short);
     
                    const mpaypal = new TextInputBuilder()
                    .setCustomId('paypal')
                    .setRequired(true)
                    .setPlaceholder('Ex: example@gmail.com')
                    .setLabel('Please input your paypal below')
                    .setStyle(TextInputStyle.Short);
     
                const one = new ActionRowBuilder().addComponents(mcashapp);
                const two = new ActionRowBuilder().addComponents(mpaypal);
                modal.addComponents(one, two);
                await interaction.showModal(modal);
            } else if (userProfile) {
                const reverifyembed = new EmbedBuilder()
                .setTitle('Verification Error')
                .setDescription('> **Please go back to the server and click "Verify" again to change your payout methods**')
                .setTimestamp()
                .setColor('000000')
                .setFooter({ text: `Created by freewentzy | `});

                await interaction.reply({
                    embeds: [reverifyembed], ephemeral: true
                })
            }

        } else if (interaction.customId == 'paymentmodal') {
            let userProfile = await UserProfile.findOne({
                UserId: interaction.user.id
            });
            
            const mcashapp = interaction.fields.getTextInputValue('cashapp');
            const mpaypal = interaction.fields.getTextInputValue('paypal');
            const bt = "```";
            const userID = interaction.user.id
            if (!userProfile) {
                userProfile = new UserProfile({
                    userId: interaction.user.id,
                    Paypal: mpaypal,
                    Cashapp: mcashapp,
                    balance: 0,
                })
            
            await userProfile.save();

            const paymentembed = new EmbedBuilder()
            .setTitle('Successfully added your Payment Methods')
            .setDescription(`Your Data:`)
            .addFields(
                { name: 'Cashapp', value: `${bt} ${mcashapp} ${bt}`, inline: false },
                { name: 'Paypal', value: `${bt} ${mpaypal} ${bt}`, inline: false },
                )
            .setColor('000000')
            .setTimestamp()
            .setFooter({ text: `To change your payout methods, please click the verify button again!`});

            await interaction.reply({embeds: [paymentembed], ephemeral: true})
            } else {
                console.log('Error when logging Payment Details')
            }
            // await interaction.user.send({ content:`Verified <@${userID}>;\n\n**Data:**\n> Cashapp: ${bt} ${mcashapp} ${bt}\n> Paypal:${bt} ${mpaypal} ${bt}`});

        } else if (interaction.customId == 'changeconnectpayment') {
            let userProfile = await UserProfile.findOne({
                UserId: interaction.user.id
            });
            await UserProfile.deleteMany({
                userId: interaction.user.id
            });

                const modal = new ModalBuilder()
                .setTitle(`Input your Payment Methods`)
                .setCustomId('changepaymentmodal')
     
                    const mchangecashapp = new TextInputBuilder()
                    .setCustomId('changecashapp')
                    .setRequired(true)
                    .setPlaceholder('Ex: $Wentzy1x')
                    .setLabel('Please input your cashapp below')
                    .setStyle(TextInputStyle.Short);
     
                    const mchangepaypal = new TextInputBuilder()
                    .setCustomId('changepaypal')
                    .setRequired(true)
                    .setPlaceholder('Ex: example@gmail.com')
                    .setLabel('Please input your paypal below')
                    .setStyle(TextInputStyle.Short);
     
                const one = new ActionRowBuilder().addComponents(mchangecashapp);
                const two = new ActionRowBuilder().addComponents(mchangepaypal);
                modal.addComponents(one, two);
                await interaction.showModal(modal);
            
        } else if (interaction.customId == 'changepaymentmodal') {
            let userProfile = await UserProfile.findOne({
                UserId: interaction.user.id
            });

            const mchangecashapp = interaction.fields.getTextInputValue('changecashapp');
            const mchangepaypal = interaction.fields.getTextInputValue('changepaypal');
            const bt = "```";
            const userID = interaction.user.id
            if (!userProfile) {
                userProfile = new UserProfile({
                    userId: interaction.user.id,
                    Paypal: mchangepaypal,
                    Cashapp: mchangecashapp,
                    balance: 0,
                })
            }
            await userProfile.save();
    
            const paymentembed = new EmbedBuilder()
            .setTitle('Successfully updated Payment Methods')
            .setDescription(`Your Data:`)
            .addFields(
                { name: 'Cashapp', value: `${bt} ${mchangecashapp} ${bt}`, inline: false },
                { name: 'Paypal', value: `${bt} ${mchangepaypal} ${bt}`, inline: false },
                )
            .setColor('000000')
            .setTimestamp()
            .setFooter({ text: `To change your payout methods, please click the verify button again!`});

            await interaction.reply({embeds: [paymentembed], ephemeral: true})
        } else if (interaction.customId == 'changepaymentmethods') {
            let userProfile = await UserProfile.findOne({
                UserId: interaction.user.id
            });
            await UserProfile.deleteMany({
                userId: interaction.user.id
            });

                const modal = new ModalBuilder()
                .setTitle(`Input your Payment Methods`)
                .setCustomId('changepaymentmodal')
     
                    const mchangecashapp = new TextInputBuilder()
                    .setCustomId('changecashapp')
                    .setRequired(true)
                    .setPlaceholder('Ex: $Wentzy1x')
                    .setLabel('Please input your cashapp below')
                    .setStyle(TextInputStyle.Short);
     
                    const mchangepaypal = new TextInputBuilder()
                    .setCustomId('changepaypal')
                    .setRequired(true)
                    .setPlaceholder('Ex: example@gmail.com')
                    .setLabel('Please input your paypal below')
                    .setStyle(TextInputStyle.Short);
     
                const one = new ActionRowBuilder().addComponents(mchangecashapp);
                const two = new ActionRowBuilder().addComponents(mchangepaypal);
                modal.addComponents(one, two);
                await interaction.showModal(modal);
        }
    },
};