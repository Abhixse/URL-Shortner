// controllers/clickController.js
import Url from "../models/Urls.models.js"

export const getUserClicks = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you attach user in auth middleware

    // Fetch URLs created by user
    const urls = await Url.find({ userId });

    if (urls.length === 0) {
      return res.json({ success: true, message: "No URLs created yet", clicks: [] });
    }

    // Aggregate clicks by day
    const clicksByDay = {};

    urls.forEach((url) => {
      url.clicks.forEach((c) => {
        const day = new Date(c.timestamp).toLocaleDateString("en-US", { weekday: "short" });
        clicksByDay[day] = (clicksByDay[day] || 0) + 1;
      });
    });

    // Format for chart
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = days.map((d) => ({
      day: d,
      clicks: clicksByDay[d] || 0,
    }));

    res.json({ success: true, clicks: data });
  } catch (error) {
    console.error("Error fetching clicks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
