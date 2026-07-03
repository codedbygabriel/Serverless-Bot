const { SlashCommandBuilder, ChannelType, MessageFlags } = require("discord.js");

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
        await interaction.deferReply({flags: MessageFlags.Ephemeral});
        const channel = interaction.options.getString('channel');
        const students = interaction.options.getInteger('students');

        const channels = interaction.guild.channels.cache;

        let _channels = channels.find((c) => c.name === 'bot-responses' && c.type === ChannelType.GuildText);
        let studyChannel = channels.find((c) => c.name === 'Study Channel' && c.type === ChannelType.GuildCategory);

        if (!_channels)
            _channels = await interaction.guild.channels.create({
                name: 'bot-responses',
                type: ChannelType.GuildText,
            })

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
            userLimit: students <= 99 && students > 0 ? students : 10,
        })
        .then(console.log)
        .catch(console.error)

        await _channels.send(`Creating **${channel}** was a success!`)
        interaction.editReply(`Creating **${channel}** was a success!`);
    }
}
