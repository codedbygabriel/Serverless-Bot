const { Client, GatewayIntentBits, Events, Collection, MessageFlags, ChannelType } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config({
    path: path.join(__dirname, '..', '.env'),
});


class ServerlessBot {
    client;
    constructor() {
        this.#startBot();
        this.#loginBot();
        this.#loadCommands();
    }

    #startBot() {
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });

        this.client.once(Events.ClientReady, (readyClient) => {
            console.warn(`Started as ${readyClient.user.tag}`);
        });

        this.client.commands = new Collection();

        this.client.commands.forEach((c) => console.log(c));
    }

    #loginBot = () => this.client.login(process.env.DISCORD_TOKEN);

    async #loadCommands() {
        const commandsDir = path.join(__dirname, "..", "commands");
        const _commandsDir = fs.readdirSync(commandsDir);

        for (const dir of _commandsDir) {
            const currentDir = path.join(commandsDir, dir);
            const filesFromDir = fs.readdirSync(currentDir).filter((f) => f.endsWith("js"));

            if (!(filesFromDir.length > 0)) continue;

            for (const script of filesFromDir) {
                const pathToScript = path.join(currentDir, script);
                const _script = require(pathToScript);

                this.client.commands.set(_script.data.name, _script);
            }
        }

        this.client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const channels = interaction.guild.channels.cache;
            const order = interaction.client.commands.get(interaction.commandName);

            if (!order) return;

            try {
                await order.execute(interaction);
            } catch (e) {
                if (interaction.replied || interaction.deferred)
                    await interaction.followUp({
                        content: "Failed to parse command.",
                    });
            }
        });
    }
}

module.exports = ServerlessBot;
