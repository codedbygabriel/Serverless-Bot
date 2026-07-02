import "dotenv/config";
import {
    Client,
    GatewayIntentBits,
    Events,
    Collection,
    MessageFlags 
} from "discord.js";

export class ServerlessBot {
    client;

    constructor() {
        this.#startBot();
        this.#loginBot();

    };

    #startBot() {
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });    
        
        this.client.once(Events.ClientReady, (readyClient) => {
            console.warn(`Started as ${readyClient.user.tag}`)
        })
    };

    #loginBot = () => this.client.login(process.env.DISCORD_TOKEN);
    
    
}
