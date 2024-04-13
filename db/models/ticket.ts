import { Schema, model, Types } from 'mongoose';


enum TicketTopic {
    SUGGESTION = "suggestion",
    REPORT = "report",
    FEEDBACK = "feedback",
    QUESTION = "question"
}

interface PartyCtx {
    user_id: string
    username: string
    invoker: boolean
}

interface ITicket {
    channel_id: string;
    involved_party_ids: Types.Array<PartyCtx>; // Use an array of PartyCtx
    topic: string;
    log_file: string;
    start: Date
    end: Date
}

const ticketSchema = new Schema<ITicket>({
    channel_id: {
        type: String,
        required: true
    },
    involved_party_ids: [{
        user_id: { type: String, required: true },
        username: { type: String, required: true },
        invoker: { type: Boolean, required: false, default: false }
    }],
    topic: {
        type: String, required: true
    },
    log_file: {
        type: String, required: true
    },
    start: {
        type: Date, required: true
    }, end: {
        type: Date, required: true
    }
});


const Ticket = model<ITicket>('tickets', ticketSchema);

export {
    TicketTopic,
    Ticket
}