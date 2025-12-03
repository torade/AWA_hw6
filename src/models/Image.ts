import mongoose, {Document, Schema} from "mongoose";
import path from "path";

interface IImage extends Document {
    filename: string;
    path: string;
}

const imageSchema = new Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true},
})

const Image: mongoose.Model<IImage> = mongoose.model<IImage>("images", imageSchema)
export {Image, IImage}