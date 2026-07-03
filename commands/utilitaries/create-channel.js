const { SlashCommandBuilder, ChannelType, MessageFlags, PermissionFlagsBits } = require("discord.js");

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
              )
              .addIntegerOption((option) => 
                  option.setName('duration')
                        .setDescription('Duration? Defaults to an hour.')
                        .setRequired(false)
              ),

    async execute(interaction) {
        await interaction.deferReply({flags: MessageFlags.Ephemeral});

        const channel      = interaction.options.getString('channel');
        const students     = interaction.options.getInteger('students');
        const duration     = interaction.options.getInteger('duration') || 1;
        const date         = new Date()
        const channels     = interaction.guild.channels.cache;
        const askBot       = channels.find((c) => c.name === 'ask-bot' && c.type === ChannelType.GuildText);
        const botResponses = channels.find((c) => c.name === 'bot-responses' && c.type === ChannelType.GuildText);
        const studyChannel = channels.find((c) => c.name === 'Study Channel' && c.type === ChannelType.GuildCategory);

        if (!(studyChannel && botResponses)) {
            await interaction.editReply(`${interaction.user} - Run **/starter_kit!** Your channels (Student Area, Serverless Area) are missing.`);
            return;
        }

        if(interaction.channel.name !== 'ask-bot') {
            await interaction.editReply(`${interaction.user} - Run **'${interaction.commandName}'** on ${askBot}`);
            return;
        }


        const varChannel = await interaction.guild.channels.create({
            name: channel,
            reason: 'No Reason Provided.',
            type: ChannelType.GuildVoice,
            parent: studyChannel.id,
            userLimit: students <= 99 && students > 0 ? students : 10,
        })

        setTimeout(async () => {
            try {
                const exists = interaction.guild.channels.cache.has(varChannel.id);

                if (botResponses) 
                    await botResponses.send(`${interaction.user} - Channel ${varChannel}`)

                if (exists)
                    await varChannel.delete(`Study Session Expired`);


            } catch (e) { 
                console.error(e)
            }
        }, 3600000 * duration);

        await botResponses.send(`${interaction.user} - Created ${varChannel.name}!`)
        interaction.editReply(`${interaction.user} - Created ${varChannel.name} at ${date.getDay()}/${date.getMonth()} - ${date.getHours()}:${date.getMinutes()}!`);
    }
}
