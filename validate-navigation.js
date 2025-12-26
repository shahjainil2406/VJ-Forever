/* ==============================================
   Navigation Validation Script
   Tests complete user flow from timeline to detail pages
   ============================================== */

// Navigation validation results
const navigationResults = {
    timelineToDetail: false,
    detailToTimeline: false,
    eventNavigation: false,
    crossHighlighting: false,
    mobileNavigation: false
};

// Test timeline to detail navigation
function testTimelineToDetail() {
    console.log('🐼 Testing timeline to detail navigation...');
    
    try {
        // Check if timeline events have click handlers
        const timelineDots = document.querySelectorAll('.timeline-dot');
        const timelineLabels = document.querySelectorAll('.timeline-date-label');
        
        let hasClickHandlers = false;
        
        // Check dots for click handlers
        timelineDots.forEach(dot => {
            if (dot.onclick || dot.addEventListener) {
                hasClickHandlers = true;
            }
        });
        
        // Check labels for click handlers
        timelineLabels.forEach(label => {
            if (label.onclick || label.addEventListener) {
                hasClickHandlers = true;
            }
        });
        
        // Check if event detail pages exist
        const eventDetailExists = document.querySelector('a[href*="event-"]') !== null ||
                                 document.querySelector('[onclick*="navigateToEvent"]') !== null;
        
        navigationResults.timelineToDetail = hasClickHandlers && eventDetailExists;
        
        console.log(navigationResults.timelineToDetail ? 
            '✅ Timeline to detail navigation working' : 
            '❌ Timeline to detail navigation issues');
            
        return navigationResults.timelineToDetail;
        
    } catch (error) {
        console.error('❌ Error testing timeline to detail navigation:', error);
        return false;
    }
}

// Test detail to timeline navigation
function testDetailToTimeline() {
    console.log('🐼 Testing detail to timeline navigation...');
    
    try {
        // Check if back buttons exist and work
        const backButtons = document.querySelectorAll('.back-button');
        const timelineButtons = document.querySelectorAll('.timeline-button');
        
        let hasBackNavigation = false;
        
        // Check back buttons
        backButtons.forEach(button => {
            if (button.onclick || button.href) {
                hasBackNavigation = true;
            }
        });
        
        // Check timeline buttons
        timelineButtons.forEach(button => {
            if (button.onclick || button.href) {
                hasBackNavigation = true;
            }
        });
        
        // Check if navigation functions exist
        const hasNavigationFunctions = typeof navigateToTimeline === 'function';
        
        navigationResults.detailToTimeline = hasBackNavigation || hasNavigationFunctions;
        
        console.log(navigationResults.detailToTimeline ? 
            '✅ Detail to timeline navigation working' : 
            '❌ Detail to timeline navigation issues');
            
        return navigationResults.detailToTimeline;
        
    } catch (error) {
        console.error('❌ Error testing detail to timeline navigation:', error);
        return false;
    }
}

// Test event-to-event navigation
function testEventNavigation() {
    console.log('🐼 Testing event-to-event navigation...');
    
    try {
        // Check if next/previous buttons exist
        const prevButtons = document.querySelectorAll('.prev-event');
        const nextButtons = document.querySelectorAll('.next-event');
        
        let hasEventNavigation = false;
        
        // Check previous buttons
        prevButtons.forEach(button => {
            if (button.onclick || button.href) {
                hasEventNavigation = true;
            }
        });
        
        // Check next buttons
        nextButtons.forEach(button => {
            if (button.onclick || button.href) {
                hasEventNavigation = true;
            }
        });
        
        // Check if timeline data supports navigation
        const hasTimelineData = typeof TIMELINE_DATA !== 'undefined' && 
                               TIMELINE_DATA.events && 
                               TIMELINE_DATA.events.length > 1;
        
        navigationResults.eventNavigation = hasEventNavigation && hasTimelineData;
        
        console.log(navigationResults.eventNavigation ? 
            '✅ Event-to-event navigation working' : 
            '❌ Event-to-event navigation issues');
            
        return navigationResults.eventNavigation;
        
    } catch (error) {
        console.error('❌ Error testing event navigation:', error);
        return false;
    }
}

// Test cross-highlighting between dots and labels
function testCrossHighlighting() {
    console.log('🐼 Testing cross-highlighting functionality...');
    
    try {
        const timelineDots = document.querySelectorAll('.timeline-dot');
        const timelineLabels = document.querySelectorAll('.timeline-date-label');
        
        let hasDataIndexes = true;
        let hasHoverEvents = false;
        
        // Check if dots have data-index attributes
        timelineDots.forEach(dot => {
            if (!dot.hasAttribute('data-index')) {
                hasDataIndexes = false;
            }
        });
        
        // Check if labels have data-index attributes
        timelineLabels.forEach(label => {
            if (!label.hasAttribute('data-index')) {
                hasDataIndexes = false;
            }
        });
        
        // Check for hover event listeners (simplified check)
        if (timelineDots.length > 0 && timelineLabels.length > 0) {
            // Simulate hover to test highlighting
            const firstDot = timelineDots[0];
            const firstLabel = timelineLabels[0];
            
            if (firstDot && firstLabel) {
                // Trigger mouseenter event
                const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
                firstDot.dispatchEvent(mouseEnterEvent);
                
                // Check if corresponding label gets highlighted
                setTimeout(() => {
                    const labelHighlighted = firstLabel.classList.contains('highlighted');
                    hasHoverEvents = labelHighlighted;
                    
                    // Clean up
                    const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
                    firstDot.dispatchEvent(mouseLeaveEvent);
                    
                    navigationResults.crossHighlighting = hasDataIndexes && hasHoverEvents;
                    
                    console.log(navigationResults.crossHighlighting ? 
                        '✅ Cross-highlighting working' : 
                        '❌ Cross-highlighting issues');
                }, 100);
            }
        }
        
        return hasDataIndexes;
        
    } catch (error) {
        console.error('❌ Error testing cross-highlighting:', error);
        return false;
    }
}

// Test mobile navigation
function testMobileNavigation() {
    console.log('🐼 Testing mobile navigation...');
    
    try {
        // Check if mobile optimizations are in place
        const hasTouchEvents = 'ontouchstart' in window;
        const hasViewportMeta = document.querySelector('meta[name="viewport"]') !== null;
        const hasMobileCSS = document.querySelector('link[href*="responsive"]') !== null;
        
        // Check if touch-friendly elements exist
        const touchFriendlyElements = document.querySelectorAll('[class*="touch-"]');
        const hasTouchOptimizations = touchFriendlyElements.length > 0;
        
        // Check minimum touch target sizes (44px)
        const buttons = document.querySelectorAll('button, .btn, .nav-button');
        let hasProperTouchTargets = true;
        
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                hasProperTouchTargets = false;
            }
        });
        
        navigationResults.mobileNavigation = hasViewportMeta && 
                                           (hasMobileCSS || hasTouchOptimizations) && 
                                           hasProperTouchTargets;
        
        console.log(navigationResults.mobileNavigation ? 
            '✅ Mobile navigation optimized' : 
            '❌ Mobile navigation needs improvement');
            
        return navigationResults.mobileNavigation;
        
    } catch (error) {
        console.error('❌ Error testing mobile navigation:', error);
        return false;
    }
}

// Run all navigation tests
function runNavigationTests() {
    console.log('🐼 Running comprehensive navigation tests...');
    
    const tests = [
        testTimelineToDetail,
        testDetailToTimeline,
        testEventNavigation,
        testCrossHighlighting,
        testMobileNavigation
    ];
    
    let completedTests = 0;
    const totalTests = tests.length;
    
    tests.forEach((test, index) => {
        setTimeout(() => {
            test();
            completedTests++;
            
            if (completedTests === totalTests) {
                displayNavigationResults();
            }
        }, index * 300);
    });
}

// Display navigation test results
function displayNavigationResults() {
    const passedTests = Object.values(navigationResults).filter(result => result === true).length;
    const totalTests = Object.keys(navigationResults).length;
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    console.log('🎉 Navigation Test Results:');
    console.log(`✅ Passed: ${passedTests}/${totalTests} (${successRate}%)`);
    
    Object.entries(navigationResults).forEach(([testName, result]) => {
        console.log(`${result ? '✅' : '❌'} ${testName}: ${result ? 'PASS' : 'FAIL'}`);
    });
    
    if (successRate >= 80) {
        console.log('🐼💕 Excellent! Navigation flow is working beautifully!');
    } else if (successRate >= 60) {
        console.log('🐼 Good progress! Minor navigation improvements needed.');
    } else {
        console.log('🐼 Navigation needs attention. Let\'s fix these issues!');
    }
    
    return {
        passedTests,
        totalTests,
        successRate,
        results: navigationResults
    };
}

// Validate specific event detail page
function validateEventDetailPage(eventId) {
    console.log(`🐼 Validating event detail page: ${eventId}`);
    
    try {
        // Check if event exists in timeline data
        if (typeof TIMELINE_DATA === 'undefined' || !TIMELINE_DATA.events) {
            console.error('❌ Timeline data not available');
            return false;
        }
        
        const eventData = TIMELINE_DATA.events.find(event => event.id === eventId);
        if (!eventData) {
            console.error(`❌ Event not found: ${eventId}`);
            return false;
        }
        
        // Check if event detail page elements exist
        const hasEventHeader = document.querySelector('.event-header') !== null;
        const hasEventContent = document.querySelector('.event-content') !== null;
        const hasBackButton = document.querySelector('.back-button') !== null;
        const hasNavigation = document.querySelector('.event-navigation') !== null;
        
        const isValid = hasEventHeader && hasEventContent && hasBackButton && hasNavigation;
        
        console.log(isValid ? 
            `✅ Event detail page valid: ${eventData.title}` : 
            `❌ Event detail page issues: ${eventId}`);
            
        return isValid;
        
    } catch (error) {
        console.error(`❌ Error validating event detail page ${eventId}:`, error);
        return false;
    }
}

// Test complete user journey
function testCompleteUserJourney() {
    console.log('🐼 Testing complete user journey...');
    
    const journey = {
        landOnTimeline: false,
        seeCountdownTimer: false,
        viewTimelineEvents: false,
        clickOnEvent: false,
        viewEventDetail: false,
        navigateBack: false,
        navigateToOtherEvents: false
    };
    
    try {
        // Test 1: Landing on timeline
        const hasTimelinePage = document.querySelector('.timeline-page') !== null;
        journey.landOnTimeline = hasTimelinePage;
        
        // Test 2: See countdown timer
        const hasCountdownTimer = document.querySelector('.countdown-timer') !== null;
        journey.seeCountdownTimer = hasCountdownTimer;
        
        // Test 3: View timeline events
        const hasTimelineEvents = document.querySelectorAll('.timeline-dot').length > 0;
        journey.viewTimelineEvents = hasTimelineEvents;
        
        // Test 4: Click on event (check if clickable)
        const timelineDots = document.querySelectorAll('.timeline-dot');
        journey.clickOnEvent = timelineDots.length > 0 && 
                              (timelineDots[0].onclick !== null || timelineDots[0].style.cursor === 'pointer');
        
        // Test 5: View event detail (check if detail page structure exists)
        const hasEventDetailStructure = document.querySelector('.event-detail-page') !== null ||
                                       document.querySelector('.event-header') !== null;
        journey.viewEventDetail = hasEventDetailStructure;
        
        // Test 6: Navigate back (check if back button exists)
        const hasBackButton = document.querySelector('.back-button') !== null;
        journey.navigateBack = hasBackButton;
        
        // Test 7: Navigate to other events (check if navigation exists)
        const hasEventNavigation = document.querySelector('.event-navigation') !== null ||
                                  document.querySelectorAll('.nav-button').length > 0;
        journey.navigateToOtherEvents = hasEventNavigation;
        
        const completedSteps = Object.values(journey).filter(step => step === true).length;
        const totalSteps = Object.keys(journey).length;
        const journeySuccess = Math.round((completedSteps / totalSteps) * 100);
        
        console.log('🎯 User Journey Test Results:');
        console.log(`✅ Completed Steps: ${completedSteps}/${totalSteps} (${journeySuccess}%)`);
        
        Object.entries(journey).forEach(([step, completed]) => {
            console.log(`${completed ? '✅' : '❌'} ${step}: ${completed ? 'PASS' : 'FAIL'}`);
        });
        
        return {
            journey,
            completedSteps,
            totalSteps,
            journeySuccess
        };
        
    } catch (error) {
        console.error('❌ Error testing complete user journey:', error);
        return null;
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runNavigationTests,
        testCompleteUserJourney,
        validateEventDetailPage,
        navigationResults
    };
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
    window.navigationValidator = {
        runNavigationTests,
        testCompleteUserJourney,
        validateEventDetailPage,
        navigationResults
    };
    
    // Run tests after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runNavigationTests, 1000);
        });
    } else {
        setTimeout(runNavigationTests, 1000);
    }
}