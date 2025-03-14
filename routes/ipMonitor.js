const express = require('express');
const router = express.Router();
const ipMonitorController = require('../controllers/ipMonitorController');
const auth = require('../middleware/auth'); // Assuming you have authentication middleware

// Public endpoint for client script to check IP
router.post('/check', ipMonitorController.checkIP);

// Protected endpoints for managing blocked IPs
router.post('/block', auth, ipMonitorController.blockIP);
router.delete('/unblock/:ip', auth, ipMonitorController.unblockIP);
router.get('/blocked', auth, ipMonitorController.getBlockedIPs);
router.get('/', auth, ipMonitorController.getIPs);
router.post('/status', auth, ipMonitorController.updateBlockStatus);

module.exports = router; 