import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import geoService from "../Services/geoService.js";
import { createShortUrl, allUrls, deleteOneUrl, onUrlClick } from "../Services/urlService.js";
import Url from "../models/Urls.models.js";


const shortenUrl = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { longUrl } = req.body;

    if (!longUrl) {
        throw new ApiError(400, "Long URL is required");
    }

    try {
        const shortUrl = await createShortUrl(longUrl, userId); // ✅ service call
        res
            .status(201)
            .json(new ApiResponse(201, "Short URL created successfully", shortUrl));
    } catch (error) {
        console.error("Error creating short URL:", error);
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const getAllUrls = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const urls = await allUrls(userId); // ✅ service call
        res
            .status(200)
            .json(new ApiResponse(200, "URLs fetched successfully", urls));
    } catch (error) {
        console.error("Error fetching URLs:", error);
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});


const deleteUrl = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const urlId = req.params.id;

    try {
        const deletedUrl = await deleteOneUrl(userId, urlId); // ✅ service call
        res
            .status(200)
            .json(new ApiResponse(200, "URL deleted successfully", deletedUrl));
    } catch (error) {
        console.error("Error deleting URL:", error);
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const urlRedirect = asyncHandler(async (req, res) => {
    const shortId = req.params.id;

    // 1. Find and update click count
    const updatedUrl = await Url.findOneAndUpdate(
        { shortId },
        { $inc: { clicks: 1 } }, // <-- make sure schema has clicks
        { new: true }
    );

    if (!updatedUrl) {
        throw new ApiError(404, "Short URL not found");
    }

    // 2. Log IP + user-agent info
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    await geoService.getGeoInfo(ip, userAgent);

    // 3. Redirect the user to the original URL
    return res.redirect(updatedUrl.originalUrl);
});




export { shortenUrl, getAllUrls, deleteUrl, urlRedirect };