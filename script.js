class ActivityTracker {
    constructor() {
        this.users = ['yacine', 'assistant', 'sig'];
        this.activities = JSON.parse(localStorage.getItem('activities')) || [];
        this.counters = JSON.parse(localStorage.getItem('counters')) || {
            yacine: 0,
            assistant: 0,
            sig: 0
        };
        
        this.initializeElements();
        this.loadCounters();
        this.loadActivities();
        this.bindEvents();
    }
    
    initializeElements() {
        this.incrementBtns = document.querySelectorAll('.increment-btn');
        this.activityList = document.getElementById('activityList');
    }
    
    bindEvents() {
        this.incrementBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userCard = e.target.closest('.user-card');
                const user = userCard.dataset.user;
                this.incrementUserCounter(user);
            });
        });
    }
    
    getRandomActivity() {
        const activities = [
            'said something funny',
            'did something amazing',
            'shared an interesting idea',
            'made everyone laugh',
            'solved a difficult problem',
            'taught something new',
            'created something beautiful',
            'inspired others',
            'showed great leadership',
            'came up with a brilliant solution',
            'helped someone in need',
            'achieved something remarkable',
            'discovered something new',
            'built something impressive',
            'learned a new skill',
            'overcame a challenge',
            'made a positive impact',
            'showed incredible creativity',
            'demonstrated expertise',
            'collaborated effectively'
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        return randomActivity;
    }
    
    incrementUserCounter(user) {
        this.counters[user]++;
        
        // Save to localStorage
        localStorage.setItem('counters', JSON.stringify(this.counters));
        
        // Update the display
        this.updateUserCounterDisplay(user);
        
        // Add new activity
        this.addNewActivity(user);
    }
    
    updateUserCounterDisplay(user) {
        const userCard = document.querySelector(`[data-user="${user}"]`);
        const counterDisplay = userCard.querySelector('.counter-display');
        counterDisplay.textContent = this.counters[user];
    }
    
    addNewActivity(user) {
        const activity = this.getRandomActivity();
        const newActivity = {
            user: user,
            activity: activity,
            timestamp: new Date().toLocaleString()
        };
        
        this.activities.unshift(newActivity);
        
        localStorage.setItem('activities', JSON.stringify(this.activities));
        
        this.renderActivity(newActivity, true);
    }
    
    loadCounters() {
        this.users.forEach(user => {
            const userCard = document.querySelector(`[data-user="${user}"]`);
            const counterDisplay = userCard.querySelector('.counter-display');
            counterDisplay.textContent = this.counters[user] || 0;
        });
    }
    
    renderActivity(activity, isNew = false) {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        if (isNew) {
            activityElement.style.animation = 'fadeIn 0.5s ease';
        }
        
        activityElement.innerHTML = `
            <h3>${activity.user.charAt(0).toUpperCase() + activity.user.slice(1)}</h3>
            <p>${activity.user} ${activity.activity} on ${activity.timestamp}</p>
        `;
        
        if (isNew) {
            this.activityList.insertBefore(activityElement, this.activityList.firstChild);
        } else {
            this.activityList.appendChild(activityElement);
        }
    }
    
    loadActivities() {
        this.activities.forEach(activity => {
            this.renderActivity(activity);
        });
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ActivityTracker();
});