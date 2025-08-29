import { IPAddress } from "../models/ipaddress.models.js";
const geoService = {
    getGeoInfo: async (req) => {
        try {
            // ✅ Get IP safely
            const forwarded = req.headers['x-forwarded-for']  || req.ip;
            const ip =
                (forwarded ? forwarded.split(',')[0] : req.ip || req.connection?.remoteAddress)?.trim();

            if (!ip) {
                throw new Error("Unable to determine IP address");
            }

            // ✅ Call Geo API
            const response = await fetch(`http://ip-api.com/json/${ip}`);
            const data = await response.json();

            if (data.status !== "success") {
                console.error("Geo API failed:", data);
                throw new Error(data.message || "Failed to fetch geo information");
            }

            // ✅ Save in DB
            const ipAddress = new IPAddress({
                ip,
                userAgent: req.headers['user-agent'] || "Unknown",
                location: {
                    lat: data.lat,
                    lon: data.lon,
                },
                city: data.city,
                zip: data.zip,
                region: data.regionName,
            });

            await ipAddress.save();

            return {
                ip,
                country: data.country,
                region: data.regionName,
                city: data.city,
                zip: data.zip,
                lat: data.lat,
                lon: data.lon,
            };
        } catch (error) {
            console.error("GeoService error:", error.message);
            return null;
        }
    },
};

export default geoService;