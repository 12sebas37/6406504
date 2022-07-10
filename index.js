const Discord = require('discord.js');
const config = require('./config/config.json')
const fs = require('fs');
const { channel } = require('diagnostics_channel');
require('colors')
const client = new Discord.Client({
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.color = config.color;

/* SISTEMA DE IDIOMAS */
client.la = {};
let idiomas = fs.readdirSync('./idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""));
console.log(idiomas)
for(const idioma of idiomas){
    client.la[idioma] = require(`./idiomas/${idioma}`)
}
Object.freeze(client.la)

function requerirhandlers() {
    ["command", "events", "distube", "reaccion_roles", "tickets", "sugerencias", "sorteos"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch (e) {
            console.warn(e)
        }
    })
}


client.on("guildMemberAdd", miembro =>{
    var Canal = client.channels.cache.get("995491756810453105")
    if(!Canal) return;
    
    let embed = new Discord.MessageEmbed()
    .setTitle("<a:checkxd:995506230611161161> VERIFICACION <a:checkxd:995506230611161161>")
    .setThumbnail("https://c.tenor.com/Eqz6YT7sax0AAAAC/demon-slayer-kimetsu-no-yaiba.gif%22%22")
    .setDescription("Sistema de verificacion")
    .addField(`Bienvenido a miru, tienes que hacer los siguientes pasos para verificarte`, "<a:xdruby:995508457635586158>")
    .addField("<a:flecha:995503837853012068> PASO 1:", "Escribe tu nombre de Roblox (Si no juegas roblox puedes decir que no juegas y omitir este paso):")
    .addField("<a:flecha:995503837853012068> PASO 2:", "Tiempo de tu cuenta en Discord escribe u!profile")
    .addField("<a:Bits:995521530098368592> AL FINALIZAR:", "Espera a que un miembro del Staff te responda, una vez te respondan ve al canal autoroles y selecciona tus roles, si tienes algun problema ve al canal crear tickets y crea un ticket (Dejaras de ver este canal)")
    .setImage("https://media.discordapp.net/attachments/930232110999023669/930248479891157002/lu.PNG%22")
  .setColor(0x3DEA0B)
    Canal.send({embeds: [embed]})
    })
    
    requerirhandlers();





client.login(config.token).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO O TE FALTAN INTENTOS -[X]-\n [-] ACTIVA LOS INTENTOS EN https://discord.dev [-]`.red))

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarollado por dewstouh#1088 || - ||    ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
