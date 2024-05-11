const { Schema, model } = require('mongoose');
 
let ticketSchema = new Schema({
    Guild: String,
    Category: String,
    Channel: String
});
 
module.exports = model('ticketSchema3', ticketSchema);