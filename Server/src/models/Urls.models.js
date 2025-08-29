import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
        },
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        ipaddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IPAddress"
        },
        health: {
            type: String,
            enum: ["alive", "dead", "unreachable"],
            default: "alive"
        },
        lastHealthCheck: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
