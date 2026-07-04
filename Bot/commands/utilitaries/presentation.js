const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
              .setName('presentation')
              .setDescription('A simple command, meant to explain the usages of the bot.'),
    async execute(interaction) {
        interaction.reply(`This bot's made for students like you, ${interaction.user.globalName}`);
    }
}
