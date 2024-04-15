export interface YamlConfig {
    bot: {
        token: string
        id: string
    },
    db: {
        connURI: string
    },
    environment: {
        runtime: string
    },
    discord_default_embed: { [key: string]: string }
}