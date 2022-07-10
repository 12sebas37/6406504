const {inspect} = require('util');
const Discord = require('discord.js')
module.exports = {
    name: "banm",
    aliases: ["evaluar", "ejecutar"],
    desc: "Sirve para ejecutar código de Discord.js V13",
    permisos_bot: ["ADMINISTRATOR", "BAN_MEMBERS"],
    owner: true,
    run: async (client, message, args, prefix) => {
        let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!usuario) return message.reply(`❌ **No se ha encontrado al usuario que has especificado!**`);

        //definimos razón, y si no hay, la razón será "No se ha especificado ninguna razón!"
        let razon = args.slice(1).join(" ");
        if(!razon) razon = "No se ha especificado ninguna razón!"

        //comprobamos que el usuario a banear no es el dueño del servidor
        if(usuario.id == message.guild.ownerId) return message.reply(`❌ **No puedes banear al DUEÑO del Servidor!**`);

        //comprobar que el BOT está por encima del usuario a banear
        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            //comprobar que la posición del rol del usuario que ejecuta el comando sea mayor a la persona que vaya a banear
                //enviamos al usuario por privado que ha sido baneado!
                usuario.send({embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(`Has sido baneado de __${message.guild.name}__ por 12sebas37`)
                    .setImage("https://c.tenor.com/DaTXlUapafIAAAAC/tony-stark-what-can-i-say.gif")
                    .setColor(client.color)
                    .setTimestamp()
                ]}).catch(() => {message.reply(`No he podido hablar con el usuario`)});
                //enviamos en el canal que el usuario ha sido baneado exitosamenete

                message.reply({embeds: [new Discord.MessageEmbed()
                .setTitle("BAN")
                .setImage("https://c.tenor.com/dVMBJxu8DXEAAAAC/thor-ironman.gif")
                .setTimestamp()
                ]})

                usuario.ban({reason: razon}).catch(() => {
                    return message.reply({embeds: 
                    [new Discord.MessageEmbed()
                    .setTitle(`❌ No he podido banear al usuario!`)
                    .setColor("FF0000")
                    ]})
                });
            }  else {
            return message.reply(`❌ **Mi Rol está por debajo del usuario**`)
        }


    }
}
    