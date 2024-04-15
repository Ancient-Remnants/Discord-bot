import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { BuildEmbed } from "../../utilities/embed";


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
    async execute(interaction: ChatInputCommandInteraction) {
        let cmd = {
            group: interaction.options.getSubcommandGroup(true),
            sub: interaction.options.getSubcommand(true)
        }

        switch (cmd.group) {
            case "user":
            default:
                
        }

    },
};