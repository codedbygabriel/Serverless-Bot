const { SlashCommandBuilder, ChannelType, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('create-forum')
                                   .setDescription('Creates a forum related to whatever you need in that moment')
                                   .addStringOption(option => 
                                       option.setName('topic-name')
                                            .setDescription('Forum Name')
                                            .setRequired(true)
                                   )
                                   .addStringOption(option => 
                                       option.setName('topic-guideline')
                                             .setDescription('Guidelines related to the forum.')
                                             .setRequired(false)
                                   ),
    async execute(interaction) {
        const forumName         = interaction.options.getString('topic-name');
        const forumGuideline    = interaction.options.getString('topic-guideline');
        const channels          = interaction.guild.channels.cache;

        const studyChannel = channels.find((c) => c.name === 'Study Channel' && c.type === ChannelType.GuildCategory);

        await interaction.deferReply({flags: MessageFlags.Ephemeral});
        try {
            const studyForum = await interaction.guild.channels.create({
                name: forumName,
                type: ChannelType.GuildForum,
                parent: studyChannel.id,
                topic: forumGuideline || "No Guideline Provided",
            })
        } catch(e){
            console.log(e)
            interaction.editReply(`Forum ${forumName} could not be created.`);
            return;
        }
        
        interaction.editReply(`Forum ${forumName} was created sucessfully!`);
    }
}


