import { Collection } from "discord.js";
import { Connection } from "mongoose";
import { YamlConfig } from "../config";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, unknown>
        db: Connection
        config: YamlConfig
    }
}