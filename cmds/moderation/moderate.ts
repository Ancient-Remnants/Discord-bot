import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('Guild moderation')
        .addSubcommandGroup((group) => {
            group
                .setName("user")
                .setDescription("Member moderation")
                .addSubcommand((subcommand) => {
                    subcommand.setName("mute")
                    subcommand.setDescription("Mute/timeout member")

                    subcommand
                        .addUserOption((opts) => {
                            opts.setName("member")
                            opts.setDescription("Member to mute/timeout")
                            opts.setRequired(true)
                            return opts
                        })
                    return subcommand
                })
            return group
        }),
    async execute(interaction: CommandInteraction) {
        // doing a  bit later
        await interaction.reply({ ephemeral: true, content: "ok" })
    },
};