// Simple test script to verify API connectivity
const testApiConnectivity = async () => {
    try {
        // Test the health endpoint
        const response = await fetch('/api/auth/health');
        const data = await response.json();
        
        console.log('API Health Check:', data);
        
        if (data.status === 'OK') {
            console.log('✅ API is working correctly');
            return true;
        } else {
            console.log('❌ API health check failed');
            return false;
        }
    } catch (error) {
        console.error('❌ API connectivity test failed:', error.message);
        return false;
    }
};

// Run the test
testApiConnectivity();