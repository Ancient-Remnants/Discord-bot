import { ActivityType, Client, Collection, REST, Routes, Events, ChatInputCommandInteraction, CommandInteraction } from 'discord.js';
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'
import { YamlConfig } from './@types/config';
import { Connect } from './db/connect';

const CONFIG: YamlConfig = YAML.parse(fs.readFileSync(path.join(
    __dirname,
    "config.yaml"
)).toString())

const client = new Client({
    intents: [
        3276799
    ]
});

Connect(CONFIG.db.connURI)
    .then((ctx) => {
        client.db = ctx // db conn
        console.log("Connected with db")
    })
    .catch((err) => {
        console.log(err)
        process.exit(-1)
    })

const RUNTIME = CONFIG.environment.runtime
client.commands = new Collection()

let cmds = fs.readdirSync(path.join(__dirname, "cmds"))

for (let i = 0; i < cmds.length; i++) {
    let path_ = path.join(__dirname, "cmds", cmds[i])
    let stat = fs.statSync(path.join(path_))

    if (stat.isDirectory()) {
        // deep link after this dir is not supported
        let files = fs.readdirSync(
            path.join(path_)
        )
        for (let x = 0; x < files.length; x++) {
            stat = fs.statSync(path.join(path_, files[x]))
            if (stat.isFile() && files[x].includes(`.${RUNTIME}`)) {
                let cmd = require(
                    path.join(path_, files[x])
                )
                client.commands.set(cmds[i].replace(`.${RUNTIME}`, ""), cmd)
            }
        }
        continue
    }

    if (stat.isFile() && cmds[i].includes(`.${RUNTIME}`)) {
        let cmd = require(
            path.join(path_)
        )
        client.commands.set(cmds[i].replace(`.${RUNTIME}`, ""), cmd)
    }
}

const rest = new REST().setToken(CONFIG.bot.token);
const payload = client.commands.map((v, k, coll) => (v as any).data.toJSON())

console.log(payload);

(async () => {
    console.log(`Started refreshing ${client.commands.size} application (/) commands.`);

    const data = await rest.put(
        Routes.applicationCommands(CONFIG.bot.id),
        {
            body: payload
        }
    ).catch((err) => {
        console.error(err);
        process.exit(-1)
    })

    console.log(`Successfully reloaded ${(data as any).length} application (/) commands.`);
})();


client.on(Events.ClientReady, async () => {
    console.log(`Bot running: '${client.user?.tag}'`);
    if (client.user !== null)
        client.user?.setPresence({
            status: "dnd",
            activities: [{
                name: "Ancient Remnants coming soon!",
                url: "https://pix4.dev", // replacing with our custom domain soon
                type: ActivityType.Competing
            }]
        })
    console.log(`Currently in ${(await (client.guilds.fetch())).size} guild(s)`)
});

client.on(Events.InteractionCreate, (interaction) => {
    try {
        if (interaction.isChatInputCommand()) {
            interaction = interaction as ChatInputCommandInteraction

            let cmd = client.commands.get(interaction.commandName) as {
                data: any,
                execute: (arg0: CommandInteraction) => any
            }
            cmd.execute(interaction)
        }
    } catch (err) {
        console.log(err)
    }
})

client.login(CONFIG.bot.token);
export default client