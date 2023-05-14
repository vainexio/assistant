const {getPerms, noPerms, client} = require('../server.js');
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = Discord;

const sendMsg = require('../functions/sendMessage.js')
const sendChannel = sendMsg.sendChannel
const sendUser = sendMsg.sendUser

const settings = require('../storage/settings_.js')
const {shop, emojis, colors, theme, status} = settings

const cmdHandler = require('../functions/commands.js')
const {getTemplate} = cmdHandler

const get = require('../functions/get.js')
const {getRandom, getChannel} = get

module.exports = {
  makeTicket: async function (data) {
    //var author = message.author;
    await data.guild.channels.create(data.ticketName, {
      type: "text", 
      parent: data.category,
      permissionOverwrites: [
        {
          id:  data.guild.roles.everyone, 
          deny: ['VIEW_CHANNEL'] 
        },
        {
          id: data.user.id, 
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
        },
        {
          id: data.guild.roles.cache.find(r => r.id === data.support), 
          allow: ['VIEW_CHANNEL','SEND_MESSAGES','READ_MESSAGE_HISTORY'],
        },
      ],
    })
      .then(async channel => {
      
      let ticketChannel = {
        id: channel.id,
        name: channel.name,
        count: data.count,
        transcript: 'none',
        status: 'open',
      }
      data.doc.tickets.push(ticketChannel)
      await data.doc.save()
      
      let embed = new MessageEmbed()
      .setTitle(data.name)
      .setDescription("Welcome **"+data.user.username+"**! Any available <@&"+data.support+"> will assist you soon.\n\n"+data.context)
      .setColor(colors.yellow)
      .setFooter({text: 'Sloopie Tickets'})
      
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('closeTicket-'+data.user.id).setStyle('DANGER').setLabel('Close Ticket').setEmoji('🔒'),
        //new MessageButton().setCustomId('transcript-ticket').setStyle('SECONDARY').setLabel('Save Transcript').setEmoji('<:S_letter:1092606891240198154>'),
      );
      let BotMsg = channel.send({ content: "<@"+data.user.id+"> - <@&"+data.support+">", embeds: [embed] , components: [row]})
      
      }).catch(console.error);
}
};