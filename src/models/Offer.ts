import mongoose, {Document, Schema} from "mongoose";

interface IOffer extends Document {
    title: string;
    description: string;
    price: number;
    path?: string;
    fileName?: string;
}

const imageSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    path: {type: String},
    fileName: {type: String},
    // createdAt: {type: Date, default: Date.now}
})

const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>("offers", imageSchema)
export {Offer, IOffer}