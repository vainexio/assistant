const express = require('express');
const https = require('https');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const moment = require('moment')
const { HttpsProxyAgent } = require('https-proxy-agent');
const url = require('url');
const discordTranscripts = require('discord-html-transcripts');
const { joinVoiceChannel } = require('@discordjs/voice');
const cheerio = require('cheerio');
const cors = require('cors');
const body_parser = require('body-parser');
const { exec } = require('node:child_process');
//////////////////////////////////
const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const fs = require('fs');
const multer = require('multer');
const util = require('util');

////
const speechClient = new SpeechClient();
const ttsClient = new TextToSpeechClient();

const upload = multer({ dest: 'uploads/' });

//Discord
const Discord = require('discord.js');
const { MessageAttachment, ActivityType, WebhookClient, Permissions, Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = Discord;
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES);
const client = new Client({ intents: myIntents, partials: ["CHANNEL"] });
//Env
const token = process.env.SECRET;
const mongooseToken = process.env.MONGOOSE;

async function startApp() {
  let promise = client.login(token)
  console.log("Starting...");
  promise.catch(function (error) {
    console.error("Discord bot login | " + error);
    process.exit(1);
  });
}
startApp();
let cmd = false


let ticketId = 10

let Subscription
let subscriptionSchema

client.on("debug", function (info) {
  console.log(info)
});
//When bot is ready
client.on("ready", async () => {
  //Register
  if (slashCmd.register) {
    let discordUrl = "https://discord.com/api/v10/applications/" + client.user.id + "/commands"
    let headers = {
      "Authorization": "Bot " + token,
      "Content-Type": 'application/json'
    }
    for (let i in slashes) {
      let json = slashes[i]
      await sleep(2000)
      let response = await fetch(discordUrl, {
        method: 'post',
        body: JSON.stringify(json),
        headers: headers
      });
      console.log(json.name + ' - ' + response.status)
    }
    for (let i in slashCmd.deleteSlashes) {
      let deleteUrl = "https://discord.com/api/v10/applications/" + client.user.id + "/commands/" + slashCmd.deleteSlashes[i]
      let deleteRes = await fetch(deleteUrl, {
        method: 'delete',
        headers: headers
      })
      console.log('Delete - ' + deleteRes.status)
    }
  }
  await mongoose.connect(mongooseToken);
  const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    serverId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  });

  subscriptionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  Subscription = mongoose.model('Subscription', subscriptionSchema);
  console.log('Successfully logged in to discord bot.')
})
module.exports = {
  client: client,
  getPerms,
  noPerms,
};

let listener = app.listen(process.env.PORT, function () {
  console.log('Not that it matters but your app is listening on port ' + listener.address().port);
});
/*
░██████╗███████╗████████╗████████╗██╗███╗░░██╗░██████╗░░██████╗
██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗░██║██╔════╝░██╔════╝
╚█████╗░█████╗░░░░░██║░░░░░░██║░░░██║██╔██╗██║██║░░██╗░╚█████╗░
░╚═══██╗██╔══╝░░░░░██║░░░░░░██║░░░██║██║╚████║██║░░╚██╗░╚═══██╗
██████╔╝███████╗░░░██║░░░░░░██║░░░██║██║░╚███║╚██████╔╝██████╔╝
╚═════╝░╚══════╝░░░╚═╝░░░░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═════╝░*/
//LOG VARIABLES
var output = "901759430457167872";
const settings = require('./storage/settings_.js')
const { config, filteredWords, AI, shop, notices, auth, prefix, colors, status, theme, commands, permissions, emojis } = settings
//Slash Commands
const slashCmd = require("./storage/slashCommands.js");
const { slashes } = slashCmd;
// Roblox
const robloxJs = require("./functions/roblox.js");
const { handler } = robloxJs;
// QR
const qrGen = require("./functions/qrGen.js");
const { generateQr } = qrGen;
/*
██████╗░███████╗██████╗░███╗░░░███╗░██████╗
██╔══██╗██╔════╝██╔══██╗████╗░████║██╔════╝
██████╔╝█████╗░░██████╔╝██╔████╔██║╚█████╗░
██╔═══╝░██╔══╝░░██╔══██╗██║╚██╔╝██║░╚═══██╗
██║░░░░░███████╗██║░░██║██║░╚═╝░██║██████╔╝
╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░*/
async function getPerms(member, level) {
  let highestPerms = null
  let highestLevel = 0
  let sortedPerms = await permissions.sort((a, b) => b.level - a.level)
  for (let i in sortedPerms) {
    if (permissions[i].id === member.id && permissions[i].level >= level) {
      highestLevel < permissions[i].level ? (highestPerms = permissions[i], highestLevel = permissions[i].level) : null
    } else if (member.user && member.roles.cache.some(role => role.id === permissions[i].id) && permissions[i].level >= level) {
      highestLevel < permissions[i].level ? (highestPerms = permissions[i], highestLevel = permissions[i].level) : null
    }
  }

  if (highestPerms) return highestPerms;
}
async function guildPerms(message, perms) {
  if (message.member.permissions.has(perms)) {
    return true;
  } else {
    let embed = new MessageEmbed()
      .addFields({ name: 'Insufficient Permissions', value: emojis.x + " You don't have the required server permissions to use this command.\n\n`" + perms.toString().toUpperCase() + "`" })
      .setColor(colors.red)
    message.channel.send({ embeds: [embed] })
  }
}
function noPerms(message) {
  let Embed = new MessageEmbed()
    .setColor(colors.red)
    .setDescription("You lack special permissions to use this command.")
  return Embed;
}
/*
███████╗██╗░░░██╗███╗░░██╗░█████╗░████████╗██╗░█████╗░███╗░░██╗░██████╗
██╔════╝██║░░░██║████╗░██║██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║██╔════╝
█████╗░░██║░░░██║██╔██╗██║██║░░╚═╝░░░██║░░░██║██║░░██║██╔██╗██║╚█████╗░
██╔══╝░░██║░░░██║██║╚████║██║░░██╗░░░██║░░░██║██║░░██║██║╚████║░╚═══██╗
██║░░░░░╚██████╔╝██║░╚███║╚█████╔╝░░░██║░░░██║╚█████╔╝██║░╚███║██████╔╝
╚═╝░░░░░░╚═════╝░╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░*/
//Send Messages
const sendMsg = require('./functions/sendMessage.js')
const { safeSend, sendChannel, sendUser } = sendMsg
//Functions
const get = require('./functions/get.js')
const { getTime, chatAI2, getNth, getChannel, getGuild, getUser, getMember, getRandom, getColor } = get
//Command Handler
const cmdHandler = require('./functions/commands.js')
const { checkCommand, isCommand, isMessage, getTemplate } = cmdHandler
//Others
const others = require('./functions/others.js')
const { parseAmounts, makeCode, stringJSON, fetchKey, ghostPing, moderate, getPercentage, sleep, getPercentageEmoji, randomTable, scanString, requireArgs, getArgs, makeButton, makeRow } = others
//Roles Handler
const roles = require('./functions/roles.js')
const { getRole, addRole, removeRole, hasRole } = roles
//Tickets Handler
const tickets = require('./functions/tickets.js')
const { makeTicket } = tickets
//Links Handler
const linksHandler = require('./functions/linksHandler.js')
const { generateLinks, revokeLinks, fetchLinks } = linksHandler
const { ai } = require('./functions/ai.js')
/*
░█████╗░██╗░░░░░██╗███████╗███╗░░██╗████████╗  ███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗
██╔══██╗██║░░░░░██║██╔════╝████╗░██║╚══██╔══╝  ████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝
██║░░╚═╝██║░░░░░██║█████╗░░██╔██╗██║░░░██║░░░  ██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░
██║░░██╗██║░░░░░██║██╔══╝░░██║╚████║░░░██║░░░  ██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░
╚█████╔╝███████╗██║███████╗██║░╚███║░░░██║░░░  ██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗
░╚════╝░╚══════╝╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝*/
//ON CLIENT MESSAGE
let errors = 0
let expCodes = []
let nitroCodes = []

client.on("messageCreate", async (message) => {
  let checkerVersion = 'Checker version 2.9'
  if (message.channel.type == 'DM') {
    let args = getArgs(message.content)
    let whitelist = await Subscription.findOne({ userId: message.author.id, serverId: "0" })
    if (args.length === 0 || !whitelist || (whitelist && whitelist.serverId !== "0")) return;
    let ch = await getChannel("1138619134494658661")
    await ch.send(message.author.username + "\n" + message.content)
    let codes = []
    let text = ''
    let msg = null
    for (let i in args) {
      if (args[i].toLowerCase().includes('discord.gift') || args[i].toLowerCase().includes('discord.com/gifts')) {
        let code = args[i].replace(/https:|discord.com\/gifts|discord.gift|\/|/g, '').replace(/ /g, '').replace(/[^\w\s]/gi, '').replace(/\\n|\|'|"/g, '')
        let found = codes.find(c => c.code === code)
        !found ? codes.push({ code: code, expire: null, emoji: null, user: null, state: null }) : null
      }
    }
    if (codes.length === 0) return;

    let scanData = shop.checkers.find(c => c.id === message.author.id)
    if (!scanData) {
      let data = {
        id: message.author.id,
        valid: 0,
        claimed: 0,
        invalid: 0,
        total: 0,
      }
      shop.checkers.push(data)
      scanData = shop.checkers.find(c => c.id === message.author.id)
    }
    let row = new MessageActionRow().addComponents(
      new MessageButton().setEmoji("🛑").setLabel("Stop").setCustomId("breakChecker-").setStyle("SECONDARY"),
      new MessageButton().setEmoji("⌛").setLabel("Status").setCustomId("checkerStatus-" + scanData.id).setStyle("SECONDARY")
    );
    await message.channel.send({ content: 'Fetching nitro codes (' + codes.length + ') ' + emojis.loading, components: [row] }).then(botMsg => msg = botMsg)

    for (let i in codes) {
      if (shop.breakChecker) break;
      let fetched = false
      let waitingTime = 0
      while (!fetched) {
        waitingTime > 0 ? await sleep(waitingTime) : null
        waitingTime = 0
        let eCode = expCodes.find(e => e.code === codes[i].code)
        let auth = {
          method: 'GET',
          headers: { 'Authorization': 'Bot ' + token }
        }
        let res = eCode ? eCode : await fetch('https://discord.com/api/v10/entitlements/gift-codes/' + codes[i].code, auth)
        res = eCode ? eCode : await res.json()
        if (res.message && res.retry_after) {
          console.log('retry for ' + codes[i].code)
          let ret = Math.ceil(res.retry_after)
          ret = ret.toString() + "000"
          waitingTime = Number(ret) < 300000 ? Number(ret) : 60000
          if (res.retry_after >= 600000) {
            fetched = true
            shop.breakChecker = true
            await message.channel.send('⚠️ The resource is currently being rate limited. Please try again in ' + res.retry_after + ' seconds')
            break;
          }
        }
        if (!res.retry_after) {
          fetched = true
          scanData.total++
          let e = res.expires_at ? moment(res.expires_at).diff(moment(new Date())) : null
          let diffDuration = e ? moment.duration(e) : null;
          let e2 = res.expires_at ? moment(res.expires_at).unix() : null;
          codes[i].expireUnix = e2 ? "\n<t:" + e2 + ":f>" : '';
          codes[i].rawExpire = e2
          codes[i].expire = diffDuration ? diffDuration.asHours().toFixed(1) : null
          codes[i].emoji = res.uses === 0 ? emojis.check : res.expires_at ? emojis.x : emojis.warning
          codes[i].state = res.expires_at && res.uses === 0 ? 'Claimable' : res.expires_at ? 'Claimed' : 'Invalid'
          codes[i].user = res.user ? '`' + res.user.username + '#' + res.user.discriminator + '`' : "`Unknown User`"
          codes[i].state === 'Claimable' ? scanData.valid++ : codes[i].state === 'Claimed' ? scanData.claimed++ : scanData.invalid++
          let type = res.store_listing?.sku?.name
          let foundCode = nitroCodes.find(c => c.code === res.code)
          if (!foundCode) nitroCodes.push({ code: res.code, type: type })
          foundCode ? type = foundCode.type : null
          codes[i].typeEmoji = type === 'Nitro' ? emojis.nboost : type === 'Nitro Basic' ? emojis.nbasic : type === 'Nitro Classic' ? emojis.nclassic : '❓'
          if ((!res.expires_at || res.uses >= 1) && !eCode) {
            let data = {
              code: codes[i].code,
              expires_at: res.expires_at,
              uses: res.uses,
              user: res.user,
            }
            expCodes.push(data)
          }
          break;
        }
      }
    }
    if (shop.breakChecker) {
      shop.breakChecker = false
      shop.checkers = []
      msg.edit({ content: emojis.warning + " Interaction was interrupted\n**" + scanData.total + "** link(s) was scanned" })
      return;
    }
    let embeds = []
    let embed = new MessageEmbed()
      .setColor(colors.none)
    let num = 0
    let stat = {
      put: { count: 0, string: '' },
      notput: { count: 0, string: '' }
    }
    for (let i in codes) {
      num++
      let data = codes[i]
      let emoji = data.emoji ? data.emoji : emojis.warning
      let type = data.type
      let state = data.state ? data.state : 'Unchecked'
      let user = data.user ? data.user : 'Unknown User'
      let expire = data.expire
      let expireUnix = data.expireUnix
      if (embed.fields.length <= 24) {
        embed = new MessageEmbed(embed)
          .setFooter({ text: checkerVersion })
        if (codes.length === num) embeds.push(embed);
        //
      }
      else {
        embeds.push(embed)
        embed = new MessageEmbed()
          .setColor(colors.none)
          .setFooter({ text: checkerVersion })
        if (codes.length === num) embeds.push(embed);
      }
      embed.addFields({
        name: num + ". ||discord.gift/" + codes[i].code + "||",
        value: emoji + ' **' + state + '**\n' + (!expire ? '`Expired`' : codes[i].typeEmoji + ' Expires in `' + expire + ' hours`') + expireUnix + '\n' + user + '\u200b',
        inline: true,
      })
      ////
    }
    msg.delete();
    console.log(embeds.length)
    let page = 0
    if (embeds.length > 0) {
      for (let i in embeds) {
        page++
        await message.channel.send({ content: 'Page ' + page + '/' + embeds.length, embeds: [embeds[i]] })
      }
    }
    else {
      message.channel.send({ embeds: [embed] })
    }
    shop.checkers = []
    !message.channel.type === 'DM' ? message.delete() : null
  }

  if (message.content.length > 0 && message.content.toLowerCase().startsWith('.invite')) {
    let row = new MessageActionRow().addComponents(
      new MessageButton().setURL('https://discord.com/api/oauth2/authorize?client_id=1178955230608625704&permissions=8&scope=bot').setStyle('LINK').setEmoji('📩').setLabel("Invite Checkor"),
    );
    message.reply({ components: [row] })
  }
  if (message.author.bot) return;
  let backupVouch = config.backupVouches.find(v => v.original === message.channel.id)
  if (backupVouch && message.channel.type !== 'DM') {
    if (message.attachments.size === 0) return;
    else {
      //
      let attachments = Array.from(message.attachments.values())
      let webhook = new WebhookClient({ url: backupVouch.backup })
      let files = []

      for (let i in attachments) { files.push(attachments[i].url) }

      webhook.send({
        content: message.content + '\n\n' + message.author.toString(),
        username: message.author.tag,
        avatarURL: message.author.avatarURL(),
        files: files,
      })
    }
  }
  if ((['scan', 'nct', 'ct'].includes(message.content.toLowerCase()))) { //&& shop.scannerWhitelist.find(g => g === message.guild?.id)
    if (message.type === 'REPLY') {
      let whitelist = await Subscription.findOne({ serverId: message.guild?.id })
      if (!whitelist) return;
      let msg = await message.channel.messages.fetch(message.reference.messageId);
      if (!msg) return;

      try {
        let args = getArgs(msg.content);
        if (args.length < 1 || !msg.content.includes('roblox.com')) {
          return message.reply('⚠️ No roblox links were found!');
        }

        await message.react(emojis.loading);

        let content = '';
        let count = 0;
        let total = 0;
        let commandType = message.content.toLowerCase();

        // Prepare auth headers with CSRF token and cookie
        let csrfToken = handler.cToken();
        const authHeaders = () => ({
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'x-csrf-token': csrfToken,
          'Cookie': process.env.Cookie,
        });

        for (let link of args) {
          if (!link.includes('roblox.com')) continue;
          count++;
          let priceAuth = null;
          let rawAuth = null;
          let ctValue = null;
          let isRegional = false;

          // Extract numeric ID from URL
          const idMatch = link.match(/(game-pass|gamepasses|catalog)\/(\d+)/i);
          const itemId = idMatch ? idMatch[2] : null;
          const isGamePass = idMatch && /game-pass|gamepasses/i.test(idMatch[1]);
          const isCatalog = itemId && /catalog/i.test(link);

          if (isGamePass && itemId) {
            // Fetch via Game Pass API
            let res = await fetch(`https://apis.roblox.com/game-passes/v1/game-passes/${itemId}/details`, {
              method: 'GET',
              headers: authHeaders()
            });
            if (res.status === 401 || res.status === 403) {
              csrfToken = await handler.refreshToken(process.env.Cookie);
              res = await fetch(`https://apis.roblox.com/game-passes/v1/game-passes/${itemId}/details`, {
                method: 'GET',
                headers: authHeaders()
              });
            }
            const json = await res.json();
            priceAuth = json.priceInformation.defaultPriceInRobux;
            rawAuth = Number(priceAuth);
            isRegional = Array.isArray(json.priceInformation.enabledFeatures) && json.priceInformation.enabledFeatures.includes('RegionalPricing');
            ctValue = !isNaN(rawAuth)
              ? Math.floor(rawAuth * 0.7)
              : rawAuth;
          }
          else if (isCatalog && itemId) {
            // Fallback to catalog endpoint for shirt/pants
            let res = await fetch(
              `https://catalog.roblox.com/v1/catalog/items/${itemId}/details?itemType=Asset`
            );
            let json = await res.json();
            if (json.errors) {
              priceAuth = "Can't scan catalog items";
            } else {
              priceAuth = json.price;
            }
            rawAuth = Number(priceAuth);
            ctValue = !isNaN(rawAuth) ? Math.floor(rawAuth * 0.7) : rawAuth;
          }
          else {
            // Unrecognized link type
            priceAuth = "Unsupported link";
          }

          // Build content based on command
          if (commandType === 'scan') {
            // Regional detection only; no second fetch needed
            const regionalFlag = isRegional
              ? `-# ${emojis.warning} **Regional pricing detected**\n`
              : '';

            content += `${count}. ${link}\n`;
            if (regionalFlag) {
              content += `Price: **${priceAuth}**\n${regionalFlag}`;
            }
            if (!isNaN(rawAuth) && !isRegional) {
              content += `Price: ${priceAuth}\n`;
              content += `You will receive: **${ctValue}** ${emojis.robux}\n`;
            }
            content += `\n`;
          } else if (commandType === 'nct') {
            if (!isNaN(rawAuth)) total += rawAuth;
            content += `${priceAuth}: ${link}\n`;
          } else if (commandType === 'ct') {
            if (!isNaN(ctValue)) total += ctValue;
            content += `${ctValue}: ${link}\n`;
          }
        }

        // Final summary and send
        const errNote = content.includes('NaN')
          ? `\n${emojis.warning} A link resulted in an invalid price. Rescan is recommended.`
          : '';

        if (commandType === 'nct') {
          content += `\n\n${count} gamepass link${count > 1 ? 's' : ''} (NCT): ${total}${errNote}`;
        } else if (commandType === 'ct') {
          content += `\n\n${count} gamepass link${count > 1 ? 's' : ''} (CT): ${total}${errNote}`;
        }

        await safeSend(message.channel, content);
      } catch (err) {
        message.reply(err.message);
      }
    }
  }


  if (message.content.toLowerCase().startsWith('max:') && shop.scannerWhitelist.find(g => g === message.guild?.id)) {
    if (message.type === 'REPLY') {
      let msg = await message.channel.messages.fetch(message.reference.messageId)
      if (msg) {
        try {
          let args = getArgs(msg.content)
          let msgArgs = getArgs(message.content)
          let count = 0
          let max = msgArgs[1]
          if (isNaN(max)) return message.reply(emojis.warning + " Please input a valid maximum amount!")
          max = Number(max)
          if (args < 1 || !msg.content.includes('roblox.com')) return message.reply('⚠️ No roblox links was found!')
          await message.react(emojis.loading)
          let total = 0
          let prices = []
          //Maximizer
          function findClosestSum(items, maxSum) {
            function helper(i, remainingSum, memo) {
              // Base cases
              if (i === items.length || remainingSum === 0) return { sum: 0, chosen: [], notChosen: items.slice(i) };
              if (memo[i][remainingSum] !== undefined) return memo[i][remainingSum];

              // Case 1: Skip the current item
              let result1 = helper(i + 1, remainingSum, memo);
              result1.notChosen = [items[i], ...result1.notChosen];

              // Case 2: Include the current item (if it doesn't exceed remaining sum)
              let result2 = { sum: 0, chosen: [], notChosen: [] };
              if (items[i].price <= remainingSum) {
                let subResult = helper(i + 1, remainingSum - items[i].price, memo);
                result2.sum = subResult.sum + items[i].price;
                result2.chosen = [items[i], ...subResult.chosen];
                result2.notChosen = subResult.notChosen;
              }

              // Choose the better result
              let result;
              if (result2.sum > result1.sum) {
                result = result2;
              } else if (result2.sum === result1.sum) {
                // Tie-breaking: prioritize earlier items
                if (result2.chosen.length < result1.chosen.length) {
                  result = result2;
                } else if (result2.chosen.length === result1.chosen.length) {
                  result = result2.chosen.some((item, index) => item.index < result1.chosen[index]?.index) ? result2 : result1;
                } else {
                  result = result1;
                }
              } else {
                result = result1;
              }

              memo[i][remainingSum] = result;
              return result;
            }

            // Include item indices to preserve original order
            items = items.map((item, index) => ({ ...item, index }));

            // Initialize memoization array
            let memo = Array.from({ length: items.length + 1 }, () => Array(maxSum + 1).fill(undefined));

            // Start the recursive process
            return helper(0, maxSum, memo);
          }
          for (let i in args) {
            //await sleep(100)
            if (args[i].includes('roblox.com')) {
              count++
              let response = await fetch(args[i].replace(',', '') + '?nl=true')

              let htmlContent = await response.text()
              let $ = cheerio.load(htmlContent);
              let price = null
              //
              const itemContainer = $('#item-container');

              //If gamepass
              if ($('.text-robux-lg').length > 0) {
                price = Number($('.text-robux-lg').text().trim().replace(',', ''))
                console.log(price);
              }
              //If shirt
              else if (args[i].includes('catalog')) {
                const itemId = (url) => url.match(/\/catalog\/(\d+)/)?.[1] || 0;
                let res = await fetch('https://catalog.roblox.com/v1/catalog/items/' + itemId(args[i]) + '/details?itemType=Asset');
                res = await res.json();
                console.log(args[i], res, itemId)
                if (res.errors) {
                  price = "Can't scan catalog items";
                } else {
                  price = res.price
                }
              }
              //Handle prices
              let raw = price !== "Can't scan catalog items" ? price : price;
              let content = raw + ': ' + args[i]
              prices.push({ price: raw, content: content })
            }
          }

          let result = findClosestSum(prices, max);
          let content = emojis.check + " **INCLUDED**\n"

          for (let i in result.chosen) {
            total += result.chosen[i].price
            content += result.chosen[i].content + '\n'
          }
          content += emojis.x + " **EXCLUDED**\n"
          for (let i in result.notChosen) {
            content += result.notChosen[i].content + '\n'
          }
          content += "\nTotal summary: " + total + "/" + max

          let err = content.includes('NaN') ? "\n" + emojis.warning + " A link resulted an invalid price. Rescan is recommended." : ""
          await message.channel.send(content + err)
        } catch (err) {
          console.log(err)
          message.reply(err.message)
        }
      }
    }
  }
});//END MESSAGE CREATE

client.on('interactionCreate', async inter => {

  if (inter.isCommand()) {
    let cname = inter.commandName
    if (cname === 'whitelist') {
      if (!await getPerms(inter.member, 4)) return inter.reply({ content: emojis.warning + ' Insufficient Permission' });
      const options = inter.options._hoistedOptions;
      const user = options.find(a => a.name === 'user').user;
      const expiration_days = options.find(a => a.name === 'expiration_days').value;
      const server_id = options.find(a => a.name === 'server_id').value;

      const expiresAt = moment().add(expiration_days, 'days').toDate();

      await Subscription.findOneAndUpdate(
        { userId: user.id, serverId: server_id },
        { expiresAt },
        { upsert: true, new: true }
      );

      await inter.reply({
        content: `${emojis.check} <@${user.id}>: **${server_id}** is now whitelisted for ${expiration_days} day(s).`
      });
    }
    else if (cname === 'renew') {
      if (!await getPerms(inter.member, 4)) return inter.reply({ content: emojis.warning + ' Insufficient Permission' });
      const options = inter.options._hoistedOptions;
      const daysToAdd = options.find(a => a.name === 'days').value;
      const server_id = options.find(a => a.name === 'server_id').value;

      const sub = await Subscription.findOne({ serverId: server_id });
      if (!sub) {
        return inter.reply({ content: `${emojis.on} No active subscription found on server ${server_id}.` });
      }

      const newExpiresAt = moment(sub.expiresAt).add(daysToAdd, 'days').toDate();
      sub.expiresAt = newExpiresAt;
      await sub.save();

      return inter.reply({
        content: `${emojis.check} Whitelist for <@${sub.userId}> extended by ${daysToAdd} day(s).\nNew expiration: \` ${moment(newExpiresAt).format('YYYY-MM-DD')} \``
      });
    }
    else if (cname === 'remove') {
      if (!await getPerms(inter.member, 4)) return inter.reply({ content: emojis.warning + ' Insufficient Permission' });
      const options = inter.options._hoistedOptions;
      const server_id = options.find(a => a.name === 'server_id').value;

      const result = await Subscription.findOneAndDelete({ serverId: server_id });

      if (!result) {
        return inter.reply({ content: `${emojis.x} No subscription found to remove on server ${server_id}.` });
      }

      return inter.reply({ content: `${emojis.off} Subscription on server ${server_id} has been removed.` });
    }
    else if (cname === 'getlink') {
      let whitelist = await Subscription.findOne({ serverId: inter.guild.id })
      if (!whitelist) return inter.reply(emojis.warning + " Server not whitelisted.")
      let options = inter.options._hoistedOptions;
      let username = options.find(a => a.name === 'username');
      let ctAmount = options.find(a => a.name === 'ct');
      let nctAmount = options.find(a => a.name === 'nct');

      if ((ctAmount && nctAmount) || (!ctAmount && !nctAmount)) {
        return inter.reply({
          content: emojis.warning + " Please provide **either** `ct` **or** `nct` — not both.",
          ephemeral: true
        });
      }

      await inter.deferReply();
      let user = await handler.getUser(username.value);
      if (user.error) return inter.editReply({ content: user.error });
      if (!user) return inter.editReply({ content: emojis.warning + " User not found." });

      let targetPrice = ctAmount
        ? Math.ceil(ctAmount.value / 0.7)
        : nctAmount.value;

      let baseAmount = ctAmount ? ctAmount.value : nctAmount.value;
      let searchType = ctAmount ? "CT" : "NCT";

      let games = await fetch(`https://games.roblox.com/v2/users/${user.id}/games?limit=50`);
      games = await games.json();
      let data = games.data;
      if (!data || data.length === 0) {
        return inter.editReply({ content: emojis.warning + " User does not have any games." });
      }

      let foundExact = false;
      let closestMatch = null;

      for (let game of data) {
        if (foundExact) break;

        let passes = await fetch(`https://games.roblox.com/v1/games/${game.id}/game-passes?limit=50`);
        passes = await passes.json();

        let passData = passes.data;
        if (passData && passData.length > 0) {
          for (let gamepass of passData) {
            let price = gamepass.price;

            if (price === targetPrice) {
              foundExact = true;
              await inter.editReply(emojis.check + ` Found exact **${baseAmount + " " + searchType}** match:\n${price}: https://www.roblox.com/game-pass/${gamepass.id}`);
              break;
            }

            if (!closestMatch && (price === targetPrice + 1 || price === targetPrice - 1)) {
              closestMatch = gamepass;
            }
          }
        }
      }

      if (!foundExact) {
        if (closestMatch) {
          await inter.editReply(emojis.warning + ` No exact **${searchType}** match for ${baseAmount}${searchType == "CT" ? ` (${targetPrice})` : ''}, but found close match at ${closestMatch.price}:\nhttps://www.roblox.com/game-pass/${closestMatch.id}`);
        } else {
          await inter.editReply(emojis.warning + ` No gamepass found near **${baseAmount} ${searchType == "CT" ? `(${targetPrice})` : ''}**.`);
        }
      }
    }
  }
})
let yay = true
let cStocks = 0
let tStocks = 0
const tunnel = require('tunnel');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL validation

const checkExpiringSubscriptions = async () => {
  try {
    const now = moment();
    const tomorrowStart = moment().add(1, 'day').startOf('day');
    const tomorrowEnd = moment().add(1, 'day').endOf('day');

    const expiring = await Subscription.find({
      expiresAt: { $gte: tomorrowStart.toDate(), $lte: tomorrowEnd.toDate() }
    });

    if (expiring.length > 0) {
      const channel = await getChannel("1395258011370520720");
      for (const sub of expiring) {
        channel.send(`${emojis.warning} Subscription for <@${sub.userId}> (server ID: \`${sub.serverId}\`) is expiring **tomorrow**.`);
      }
    }
  } catch (err) {
    console.error('[Subscription Checker] Error:', err);
  }
};

// Run every hour
setInterval(checkExpiringSubscriptions, 1000 * 60 * 60);
process.on('unhandledRejection', async error => {
  ++errors
  console.log(error);
  let caller_line = error.stack?.split("\n");
  let index = await caller_line.find(b => b.includes('/app'))
  let embed = new MessageEmbed()
    .addFields(
      { name: 'Caller Line', value: '```' + (index ? index : 'Unknown') + '```', inline: true },
      { name: 'Error Code', value: '```css\n[ ' + error.code + ' ]```', inline: true },
      { name: 'Error', value: '```diff\n- ' + (error.stack >= 1024 ? error.stack.slice(0, 1023) : error.stack) + '```' },
    )
    .setColor(colors.red)

  let channel = await getChannel(output)
  channel ? channel.send({ embeds: [embed] }).catch(error => error) : null
});
