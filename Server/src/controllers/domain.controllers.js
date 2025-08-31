// controllers/domainController.js
import Domain from "../models/domain.models.js"
import Url from "../models/Urls.models.js";

export const getDomainStats = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware

        // Find all user URLs grouped by domain
        const urls = await Url.find({ userId });

        if (urls.length === 0) {
            return res.json({ success: true, message: "No domains yet", domains: [], chart: [] });
        }

        // Aggregate per domain
        const domainMap = {};
        urls.forEach((url) => {
            const domain = url.customDomain || "default";
            if (!domainMap[domain]) {
                domainMap[domain] = { clicks: 0, prevWeekClicks: 0 };
            }
            url.clicks.forEach((c) => {
                const clickDate = new Date(c.timestamp);
                const today = new Date();
                const diffDays = (today - clickDate) / (1000 * 60 * 60 * 24);

                // Count this week's clicks
                if (diffDays <= 7) domainMap[domain].clicks++;
                // Count last week's clicks for growth %
                else if (diffDays > 7 && diffDays <= 14) domainMap[domain].prevWeekClicks++;
            });
        });

        // Format domains for frontend
        const domains = Object.keys(domainMap).map((d, idx) => {
            const curr = domainMap[d].clicks;
            const prev = domainMap[d].prevWeekClicks;
            const growth = prev > 0 ? Math.round(((curr - prev) / prev) * 100) : curr > 0 ? 100 : 0;

            return {
                id: idx + 1,
                name: d,
                clicks: curr,
                growth,
            };
        });

        // Aggregate weekly chart (Mon–Sun)
        const clicksByDay = {};
        urls.forEach((url) => {
            url.clicks.forEach((c) => {
                const day = new Date(c.timestamp).toLocaleDateString("en-US", { weekday: "short" });
                clicksByDay[day] = (clicksByDay[day] || 0) + 1;
            });
        });

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const chart = days.map((d) => ({ day: d, clicks: clicksByDay[d] || 0 }));

        res.json({ success: true, domains, chart });
    } catch (error) {
        console.error("Error in domain stats:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




// Add a new domain
export const addDomain = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if exists
        const existing = await Domain.findOne({ name, user: req.user._id });
        if (existing) {
            return res.status(400).json({ message: "Domain already exists" });
        }

        const domain = new Domain({ name, user: req.user._id });
        await domain.save();

        res.status(201).json(domain);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all domains of logged-in user
export const getDomains = async (req, res) => {
    try {
        const domains = await Domain.find({ user: req.user._id });
        res.json(domains);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a domain
export const deleteDomain = async (req, res) => {
    try {
        const domain = await Domain.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!domain) {
            return res.status(404).json({ message: "Domain not found" });
        }

        res.json({ message: "Domain deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
