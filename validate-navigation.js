// Enhanced Navigation Validation Script
console.log('🐼 Enhanced navigation validation starting...');

// Wait for navigation manager to be ready
function waitForNavigationManager() {
    return new Promise((resolve) => {
        if (window.navigationManager) {
            resolve(window.navigationManager);
        } else {
            const checkInterval = setInterval(() => {
                if (window.navigationManager) {
                    clearInterval(checkInterval);
                    resolve(window.navigationManager);
                }
            }, 100);
            
            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve(null);
            }, 5000);
        }
    });
}

// Enhanced navigation validation
async function validateNavigation() {
    console.log('🐼 Running enhanced navigation validation...');
    
    const validationResults = {
        timelineData: typeof TIMELINE_DATA !== 'undefined',
        navigationManager: false,
        globalNavigationFunction: typeof window.navigateToEventDetail === 'function',
        timelineElements: document.getElementById('timeline-bar') !== null,
        eventMapping: false,
        touchSupport: 'ontouchstart' in window
    };
    
    // Wait for navigation manager
    const navManager = await waitForNavigationManager();
    validationResults.navigationManager = navManager !== null;
    
    // Test event mapping
    if (validationResults.timelineData && navManager) {
        const testEvent = TIMELINE_DATA.events[0];
        const hasMapping = navManager.eventPageMap[testEvent.id] !== undefined;
        validationResults.eventMapping = hasMapping;
        
        console.log(`🐼 Testing event mapping for: ${testEvent.id} → ${hasMapping ? 'FOUND' : 'NOT FOUND'}`);
    }
    
    // Count successful validations
    const passedChecks = Object.values(validationResults).filter(result => result === true).length;
    const totalChecks = Object.keys(validationResults).length;
    const successRate = Math.round((passedChecks / totalChecks) * 100);
    
    console.log(`🎯 Enhanced Navigation Status: ${passedChecks}/${totalChecks} (${successRate}%)`);
    
    // Log detailed results
    Object.entries(validationResults).forEach(([key, value]) => {
        const icon = value ? '✅' : '❌';
        console.log(`${icon} ${key}: ${value}`);
    });
    
    if (successRate >= 90) {
        console.log('🎉 Excellent! Navigation system working perfectly!');
        showNavigationSuccess();
    } else if (successRate >= 70) {
        console.log('👍 Good! Navigation system mostly working.');
    } else {
        console.log('⚠️ Navigation system needs attention.');
        showNavigationIssues(validationResults);
    }
    
    return validationResults;
}

// Show navigation success indicator
function showNavigationSuccess() {
    const successIndicator = document.createElement('div');
    successIndicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: linear-gradient(45deg, #e8f0e4, #f0f8f0);
        color: #2d5a2d;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-family: 'Dancing Script', cursive;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(232, 240, 228, 0.4);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    successIndicator.innerHTML = '🐼 Navigation ready! 💕';
    
    document.body.appendChild(successIndicator);
    
    // Fade in
    setTimeout(() => {
        successIndicator.style.opacity = '1';
    }, 100);
    
    // Fade out after 3 seconds
    setTimeout(() => {
        successIndicator.style.opacity = '0';
        setTimeout(() => {
            if (successIndicator.parentNode) {
                successIndicator.parentNode.removeChild(successIndicator);
            }
        }, 300);
    }, 3000);
}
// Show navigation issues
function showNavigationIssues(results) {
    const issues = Object.entries(results)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
    
    console.log('⚠️ Navigation issues found:', issues);
    
    // Show warning indicator
    const warningIndicator = document.createElement('div');
    warningIndicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: linear-gradient(45deg, #fff3cd, #ffeaa7);
        color: #856404;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-family: 'Dancing Script', cursive;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(255, 193, 7, 0.4);
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
    `;
    warningIndicator.innerHTML = '⚠️ Navigation issues detected';
    warningIndicator.title = `Issues: ${issues.join(', ')}`;
    
    document.body.appendChild(warningIndicator);
    
    // Fade in
    setTimeout(() => {
        warningIndicator.style.opacity = '1';
    }, 100);
    
    // Remove on click or after 10 seconds
    warningIndicator.addEventListener('click', () => {
        warningIndicator.remove();
    });
    
    setTimeout(() => {
        if (warningIndicator.parentNode) {
            warningIndicator.remove();
        }
    }, 10000);
}

// Test navigation functionality
async function testNavigationFunctionality() {
    console.log('🐼 Testing navigation functionality...');
    
    const navManager = await waitForNavigationManager();
    if (!navManager) {
        console.error('❌ Navigation manager not available for testing');
        return false;
    }
    
    if (typeof TIMELINE_DATA === 'undefined' || !TIMELINE_DATA.events.length) {
        console.error('❌ No timeline data available for testing');
        return false;
    }
    
    // Test with first event
    const testEvent = TIMELINE_DATA.events[0];
    console.log(`🐼 Testing navigation with event: ${testEvent.title}`);
    
    try {
        // Test event finding
        const foundEvent = navManager.findEventById(testEvent.id);
        if (foundEvent) {
            console.log('✅ Event finding works correctly');
        } else {
            console.error('❌ Event finding failed');
            return false;
        }
        
        // Test page mapping
        const hasMapping = navManager.eventPageMap[testEvent.id] !== undefined;
        if (hasMapping) {
            console.log('✅ Event page mapping works correctly');
        } else {
            console.log('⚠️ No page mapping found (will show preview)');
        }
        
        console.log('✅ Navigation functionality test passed');
        return true;
        
    } catch (error) {
        console.error('❌ Navigation functionality test failed:', error);
        return false;
    }
}
// Run validation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        // Wait a bit for all scripts to load
        setTimeout(async () => {
            await validateNavigation();
            await testNavigationFunctionality();
        }, 1000);
    });
} else {
    // DOM already loaded
    setTimeout(async () => {
        await validateNavigation();
        await testNavigationFunctionality();
    }, 1000);
}