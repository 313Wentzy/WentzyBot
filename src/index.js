const { Client, GatewayIntentBits, EmbedBuilder, 
    IntentsBitField, PermissionsBitField, Permissions, 
    MessageManager, Embed, Collection, ActionRowBuilder, 
    ButtonBuilder, ButtonStyle, SlashCommandBuilder, 
    Events, ModalBuilder, TextInputBuilder, TextInputStyle,
    ComponentType,StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require(`discord.js`);
const mongoose = require('mongoose');
const fs = require('fs');
const { validateHeaderName } = require('http');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildVoiceStates
    ] });
client.commands = new Collection();
client.cooldowns = new Collection();
const Canvas = require('@napi-rs/canvas');
const UserProfile = require('../../WentzyBot3.0/src/schemas/UserProfile')

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

async function checkBalanceAndAssignRole(userId) {
    try {
        const userProfile = await UserProfile.findOne({ userId });

        if (userProfile && userProfile.balance < 0) {
            // asign role
            console.log(`Assigning role to user ${userId}`);
        }
    } catch (error) {
        console.error('Error checking balance and assigning role:', error);
    }
}

client.once('ready', () => {
    setInterval(async () => {
        const userProfiles = await UserProfile.find();
        userProfiles.forEach(profile => {
            checkBalanceAndAssignRole(profile.userId);
        });
    }, 60000); 
});

