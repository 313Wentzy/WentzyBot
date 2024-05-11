const { SlashCommandBuilder } = require ('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test1')
    .setDescription('This is the test command!'),
    async execute(interaction){
        const rulesembed = new EmbedBuilder()
        .setTitle('**GEC Drafts Rules:**')
        .setDescription(`**BASIC DRAFT RULES/INFORMATION** - @everyone 

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
        
        *Before every draft, everyone must agree to these rules. - Also if you disagree with any of these or if you would like to add any rules, lmk in* <#1189271858894360757>`)
        .setColor('000000')
        .setFooter({ text: `${interaction.guild.name} | Created by freewentzy`, iconURL: `${interaction.guild.iconURL()}`})
        .setTimestamp();

        
        interaction.reply({ embeds: [rulesembed], ephemeral: true });
    }
}