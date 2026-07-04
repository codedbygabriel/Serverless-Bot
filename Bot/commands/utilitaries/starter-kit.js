const { 
    SlashCommandBuilder,
    ChannelType,
    MessageFlags,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
              .setName('starter_kit')
              .setDescription('Initialize all necessary channels && messages')
              .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        await interaction.deferReply({flags: MessageFlags.Ephemeral});
        const channels     = interaction.guild.channels.cache;
        
        let studyChannel   = channels.find((c) => c.name === 'Study Channel' && c.type === ChannelType.GuildCategory);
        let serverlessArea = channels.find((c) => c.name === 'Serverless Area' && c.type === ChannelType.GuildCategory);
        let botResponses   = channels.find((c) => c.name === 'bot-responses' && c.type === ChannelType.GuildText);
        let askBot         = channels.find((c) => c.name === 'ask-bot' && c.type === ChannelType.GuildText);
        
        if(!serverlessArea) {
            serverlessArea = await interaction.guild.channels.create({
                name: 'Serverless Area',
                type: ChannelType.GuildCategory,
            })
        }

        if(!studyChannel) {
            studyChannel = await interaction.guild.channels.create({
                name: 'Study Channel',
                type: ChannelType.GuildCategory,
            })
        }
        
        if(!botResponses) {
            botResponses = await interaction.guild.channels.create({
                name: 'bot-responses',
                type: ChannelType.GuildText,
                parent: serverlessArea.id,
            })  
        }

        if(!askBot) {
            await interaction.guild.channels.create({
                name: 'ask-bot',
                type: ChannelType.GuildText,
                parent: serverlessArea.id,
            }) 
        }

        interaction.editReply(`Starter Kit Has Been Sucessfully Executed!`);
    }
}
