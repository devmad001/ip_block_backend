// IP Monitor Client Script
(function () {
    const MONITOR_ENDPOINT = 'http://your-backend-domain/api/ip-monitor';
    const CHECK_INTERVAL = 60000; // Check every minute

    function getClientIP() {
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(error => console.error('Error getting IP:', error));
    }

    function sendIPToServer(ip) {
        const data = {
            ip: ip,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        return fetch(MONITOR_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.blocked) {
                    // Handle blocked IP - you can redirect or show a message
                    window.location.href = data.redirectUrl || 'https://blocked-page.com';
                }
            })
            .catch(error => console.error('Error sending IP data:', error));
    }

    // Initial check
    getClientIP().then(sendIPToServer);

    // Periodic checks
    setInterval(() => {
        getClientIP().then(sendIPToServer);
    }, CHECK_INTERVAL);
})(); 