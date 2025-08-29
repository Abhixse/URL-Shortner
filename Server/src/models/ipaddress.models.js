import mongoose from "mongoose";


const ipaddressSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        }
    },
    city: {
        type: String,
        default: "",
        required: true
    },
    zip: {
        type: String,
        default: "",   
        required: true
    },
    region: {
        type: String,
        default: "",
        required: true
    }
})

export const IPAddress = mongoose.model("IPAddress", ipaddressSchema);