import Url from "../models/Urls.models.js";
import ApiError from "../utils/ApiError.js";
import { customAlphabet } from "nanoid";

// 7-character alphabet-only shortId
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 7);

// Create Short URL
const createShortUrl = async (longUrl, userId) => {
    const shortId = nanoid(); // generates 7 random letters
    try {
        const shortUrl = new Url({ originalUrl: longUrl, userId, shortId });
        await shortUrl.save();
        return shortUrl;
    } catch (error) {
        console.error("Error creating short URL:", error);
        throw new ApiError(500, error.message || "Error creating short URL");
    }
};


const allUrls = async (userId) => {
    try {
        return await Url.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        throw new ApiError(500, error.message || "Error fetching URLs");
    }
};


const deleteOneUrl = async (userId, urlId) => {
    try {
        const deletedUrl = await Url.findOneAndDelete({ _id: urlId, userId });
        if (!deletedUrl) {
            throw new ApiError(404, "URL not found or not authorized to delete");
        }
        return deletedUrl;
    } catch (error) {
        console.error("Error deleting URL:", error);
        throw new ApiError(500, error.message || "Error deleting URL");
    }
};


const onUrlClick = async (shortId) => {
    try {
        const updatedUrl = await Url.findOneAndUpdate(
            { shortId },                  // ✅ match on shortId, not _id
            { $inc: { clickCount: clickCount + 1 } },
            { new: true }
        );

        if (!updatedUrl) {
            throw new ApiError(404, "Short URL not found");
        }

        return updatedUrl;
    } catch (error) {
        console.error("Error clicking URL:", error);
        throw new ApiError(500, error.message || "Error clicking URL");
    }
};



export { createShortUrl, allUrls, deleteOneUrl, onUrlClick };
