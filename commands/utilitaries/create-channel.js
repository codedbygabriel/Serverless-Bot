const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
              .setName('create_channel')
              .setDescription('This command will create a new voice channel')
              .addStringOption((option) => 
                  option.setName('channel')
                        .setDescription('Name of the channel?')
                        .setRequired(true)
              )
              .addIntegerOption((option) => 
                  option.setName('students')
                        .setDescription('How many students?')
                        .setRequired(true)
              ),

    async execute(interaction) {
        interaction.reply(`Executing Creating Channels!`);
        const channel = interaction.options.getString('channel');
        const students = interaction.options.getInteger('students');

        const channels = interaction.guild.channels.cache;

        let studyChannel = channels.find((c) => c.name === 'Study Channel')
        if (!studyChannel)
            studyChannel = await interaction.guild.channels.create({
                name: 'Study Channel',
                type: ChannelType.GuildCategory,
            })
        

        const newVoiceChannel = interaction.guild.channels.create({
            name: channel,
            reason: 'No Reason Provided.',
            type: ChannelType.GuildVoice,
            parent: studyChannel.id,
            userLimit: students,
        })
        .then(console.log)
        .catch(console.error)
    }
}
