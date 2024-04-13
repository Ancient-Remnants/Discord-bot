import mongoose, { Connection } from "mongoose";

export const Connect = (connURI: string): Promise<Connection> => {
    return new Promise((resolve, _) => {
        resolve(mongoose.createConnection(connURI, {
            maxPoolSize: 200
        }))
    })
}