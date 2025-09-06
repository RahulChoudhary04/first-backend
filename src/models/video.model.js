import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Video Model
const videoSchema = new Schema(
    {
        videofile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId, // reference to User model
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    }, 
    {
        timestamps: true
    }
)
// Add pagination plugin which adds aggregatePaginate method to the model 
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema) 