const BlockedIP = require('../models/BlockedIP');

exports.checkIP = async (req, res) => {
    try {
        const { ip, timestamp, url, userAgent } = req.body;

        // Check if IP is blocked
        const blockedIP = await BlockedIP.findOne({ ip, isActive: true });

        if (blockedIP) {
            return res.json({
                blocked: true,
                redirectUrl: process.env.BLOCKED_PAGE_URL || 'https://blocked-page.com',
                reason: blockedIP.reason
            });
        }

        // Log the visit (you might want to store this in a separate collection)
        console.log(`IP ${ip} visited ${url} at ${timestamp}`);

        res.json({ blocked: false });
    } catch (error) {
        console.error('Error checking IP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.blockIP = async (req, res) => {
    try {
        const { ip, reason } = req.body;

        const blockedIP = new BlockedIP({
            ip,
            reason,
            blockedBy: req.user?.id || 'system', // Assuming you have user authentication
            isActive: true
        });

        await blockedIP.save();
        res.json({ message: 'IP blocked successfully', blockedIP });
    } catch (error) {
        console.error('Error blocking IP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.unblockIP = async (req, res) => {
    try {
        const { ip } = req.params;

        const blockedIP = await BlockedIP.findOne({ ip });
        if (!blockedIP) {
            return res.status(404).json({ error: 'IP not found in blocked list' });
        }

        blockedIP.isActive = false;
        await blockedIP.save();

        res.json({ message: 'IP unblocked successfully' });
    } catch (error) {
        console.error('Error unblocking IP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBlockedIPs = async (req, res) => {
    try {
        const blockedIPs = await BlockedIP.find({ isActive: true });
        res.json(blockedIPs);
    } catch (error) {
        console.error('Error getting blocked IPs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getIPs = async (req, res) => {
    try {
        const blockedIPs = await BlockedIP.find({});
        res.json(blockedIPs);
    } catch (error) {
        console.error('Error getting blocked IPs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 