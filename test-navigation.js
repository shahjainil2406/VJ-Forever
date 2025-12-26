// Navigation Test Script
console.log('🐼 Testing navigation functionality...');

// Test if timeline data is loaded
if (typeof TIMELINE_DATA !== 'undefined') {
    console.log('✅ Timeline data loaded successfully');
    console.log('📝 Events found:', TIMELINE_DATA.events.length);
    
    // Test event mapping
    TIMELINE_DATA.events.forEach((event, index) => {
        console.log(`Event ${index + 1}: ${event.title} (ID: ${event.id})`);
        
        // Test navigation mapping
        const eventPageMap = {
            'the-day-we-said-yes': 'pages/event-the-day-we-said-yes.html',
            'first-talking': 'pages/event-first-talking.html',
            'special-day': 'pages/event-special-day.html',
            'birthday-tir-i-miss-u': 'pages/event-birthday-tir-i-miss-u.html',
            'mumbai-meeting': 'pages/event-mumbai-meeting.html',
            'vadodara-family': 'pages/event-vadodara-family.html',
            'roka-day': 'pages/event-roka-day.html',
            'bangalore-first-kiss': 'pages/event-bangalore-first-kiss.html',
            'our-engagement': 'pages/event-our-engagement.html',
            'the-day-we': 'pages/event-the-day-we.html',
            'memorable-photoshoot': 'pages/event-memorable-photoshoot.html',
            'day-to-forever': 'pages/event-day-to-forever.html'
        };
        
        const mappedPage = eventPageMap[event.id];
        if (mappedPage) {
            console.log(`✅ ${event.id} → ${mappedPage}`);
        } else {
            console.log(`❌ ${event.id} → NO MAPPING FOUND`);
        }
    });
} else {
    console.error('❌ Timeline data not loaded');
}

// Test DOM elements
const timelineBar = document.getElementById('timeline-bar');
const timelineLabels = document.getElementById('timeline-labels');

if (timelineBar && timelineLabels) {
    console.log('✅ Timeline DOM elements found');
    
    // Check for timeline dots
    const dots = document.querySelectorAll('.timeline-dot');
    const labels = document.querySelectorAll('.timeline-date-label');
    
    console.log(`📍 Timeline dots: ${dots.length}`);
    console.log(`🏷️ Timeline labels: ${labels.length}`);
    
    // Test click handlers
    if (dots.length > 0) {
        console.log('✅ Timeline dots created');
        dots.forEach((dot, index) => {
            const eventId = dot.getAttribute('data-event-id');
            const dataIndex = dot.getAttribute('data-index');
            console.log(`Dot ${index}: event-id="${eventId}", data-index="${dataIndex}"`);
        });
    } else {
        console.error('❌ No timeline dots found');
    }
} else {
    console.error('❌ Timeline DOM elements not found');
}

console.log('🐼 Navigation test complete');