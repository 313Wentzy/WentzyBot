const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
const cowsay = require("cowsay");


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const commandCount = client.commands.size;

        console.log(`Successfully refreshed ${commandCount} application (/) commands.`);
        

        client.user.setPresence({
            activities: [{ name: `GEC Drafts`, type: ActivityType.Watching }],
            status: 'online',
          });

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    ],

                status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }}


            console.log('Connecting to Mongoose.DB...');
            if (!mongoURL) return;

            await mongoose.connect(mongoURL || '');

            if (mongoose.connect) {
                console.log('Successfully connected to Mongoose.DB');
            } else {
                console.log("Unable to connect to Mongoose.DB, for troubleshooting, visit here -> https://status.mongodb.com/");
                console.log('Error - Failed startup process; Failed to restart');
            }

            console.log('---\nWentzyBot Online!')

        



            /*console.log(cowsay.say({
                text : 'WentzyBot Online!',
                e: '0 0',
                T: 'U',
                f: 'whale'
            }))*/

        },     
};