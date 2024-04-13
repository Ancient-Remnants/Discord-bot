import { Collection } from "discord.js";
import { Connection } from "mongoose";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, unknown>
        db: Connection
    }
}