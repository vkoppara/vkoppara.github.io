// Calendar JavaScript - Festival Calendar with Telugu Calendar Data
class FestivalCalendar {
    constructor() {
        console.log('FestivalCalendar constructor called');
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.selectedDate = null;
        this.festivals = {};
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        console.log(`Initial date: ${this.currentMonth}/${this.currentYear}`);
        this.init();
        this.loadFestivalData();
    }

    init() {
        console.log('Initializing calendar...');
        this.bindEvents();
        this.renderCalendar();
    }

    bindEvents() {
        const prevMonth = document.getElementById('prevMonth');
        const nextMonth = document.getElementById('nextMonth');
        const closePanel = document.getElementById('closePanel');
        const searchInput = document.getElementById('festivalSearch');
        if (prevMonth) {
            console.log('Found prevMonth button, adding event listener');
            prevMonth.addEventListener('click', () => {
                console.log('Previous month clicked');
                this.navigateMonth(-1);
            });
        } else {
            console.error('prevMonth button not found');
        }

        if (nextMonth) {
            console.log('Found nextMonth button, adding event listener');
            nextMonth.addEventListener('click', () => {
                console.log('Next month clicked');
                this.navigateMonth(1);
            });
        } else {
            console.error('nextMonth button not found');
        }

        if (closePanel) {
            closePanel.addEventListener('click', () => this.closeFestivalPanel());
        }

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.trim()) {
                    this.showSearchResults();
                }
            });
            searchInput.addEventListener('blur', () => {
                // Delay hiding to allow clicks on results
                setTimeout(() => this.hideSearchResults(), 150);
            });
        }

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('festivalPanel');
            if (panel && !panel.contains(e.target) && !e.target.closest('.calendar-day')) {
                this.closeFestivalPanel();
            }
        });
    }

    navigateMonth(direction) {
        console.log(`Navigating month by ${direction}. Current: ${this.currentMonth}/${this.currentYear}`);
        
        this.currentMonth += direction;
        
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        console.log(`New date: ${this.currentMonth}/${this.currentYear}`);
        this.renderCalendar();
    }

    renderCalendar() {
        const currentMonthElement = document.getElementById('currentMonth');
        const calendarBody = document.getElementById('calendarBody');
        
        if (!currentMonthElement || !calendarBody) return;

        // Update month display
        currentMonthElement.textContent = `${this.months[this.currentMonth]} ${this.currentYear}`;
        
        // Clear previous calendar
        calendarBody.innerHTML = '';
        
        // Calculate first day of month and days in month
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        // Add previous month's trailing days
        const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        for (let i = startingDay - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(
                daysInPrevMonth - i, 
                this.currentMonth === 0 ? 11 : this.currentMonth - 1,
                this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear,
                true
            );
            calendarBody.appendChild(dayElement);
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, this.currentMonth, this.currentYear, false);
            calendarBody.appendChild(dayElement);
        }
        
        // Add next month's leading days
        const totalCells = calendarBody.children.length;
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(
                day, 
                this.currentMonth === 11 ? 0 : this.currentMonth + 1,
                this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear,
                true
            );
            calendarBody.appendChild(dayElement);
        }
        
        // Update festival statistics
        this.updateFestivalStats();
    }

    updateFestivalStats() {
        const monthlyCountElement = document.getElementById('monthlyFestivalCount');
        const upcomingListElement = document.getElementById('upcomingList');
        
        if (!monthlyCountElement || !upcomingListElement) return;
        
        // Count festivals in current month
        let monthlyCount = 0;
        const currentMonthKey = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}`;
        
        Object.keys(this.festivals).forEach(dateKey => {
            if (dateKey.startsWith(currentMonthKey)) {
                monthlyCount++;
            }
        });
        
        monthlyCountElement.textContent = monthlyCount;
        
        // Get upcoming festivals (next 5)
        const today = new Date();
        const upcomingFestivals = [];
        
        Object.entries(this.festivals).forEach(([dateKey, festival]) => {
            const festivalDate = new Date(dateKey);
            if (festivalDate >= today) {
                upcomingFestivals.push({
                    date: festivalDate,
                    dateKey: dateKey,
                    festival: festival
                });
            }
        });
        
        // Sort by date and take first 5
        upcomingFestivals.sort((a, b) => a.date - b.date);
        const nextFive = upcomingFestivals.slice(0, 5);
        
        // Render upcoming festivals
        upcomingListElement.innerHTML = '';
        nextFive.forEach(item => {
            const upcomingItem = document.createElement('div');
            upcomingItem.className = 'upcoming-item';
            
            const options = { month: 'short', day: 'numeric' };
            const formattedDate = item.date.toLocaleDateString('en-US', options);
            
            upcomingItem.innerHTML = `
                <span class="festival-name">${item.festival.name}</span>
                <span class="festival-date">${formattedDate}</span>
            `;
            
            upcomingItem.addEventListener('click', () => {
                // Navigate to the month and show festival details
                this.currentMonth = item.date.getMonth();
                this.currentYear = item.date.getFullYear();
                this.renderCalendar();
                
                // Show festival details after a short delay
                setTimeout(() => {
                    this.showFestivalDetails(item.festival, item.date.getDate(), item.date.getMonth(), item.date.getFullYear());
                }, 300);
            });
            
            upcomingListElement.appendChild(upcomingItem);
        });
        
        if (nextFive.length === 0) {
            upcomingListElement.innerHTML = '<div class="upcoming-item">No upcoming festivals</div>';
        }
    }

    createDayElement(day, month, year, isOtherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Check if it's today
        const today = new Date();
        if (day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear() && 
            !isOtherMonth) {
            dayElement.classList.add('today');
        }
        
        // Create day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Check for festivals
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const festival = this.festivals[dateKey];
        
        if (festival && !isOtherMonth) {
            dayElement.classList.add('has-festival');
            const festivalIndicator = document.createElement('div');
            festivalIndicator.className = 'festival-indicator';
            festivalIndicator.textContent = festival.name.substring(0, 8) + (festival.name.length > 8 ? '...' : '');
            dayElement.appendChild(festivalIndicator);
            
            // Add click event for festival details
            dayElement.addEventListener('click', () => {
                this.showFestivalDetails(festival, day, month, year);
            });
        }
        
        return dayElement;
    }

    showFestivalDetails(festival, day, month, year) {
        const panel = document.getElementById('festivalPanel');
        const content = document.getElementById('panelContent');
        
        if (!panel || !content) return;
        
        const monthName = this.months[month];
        const dateStr = `${monthName} ${day}, ${year}`;
        
        content.innerHTML = `
            <div class="festival-details">
                <h4>${festival.name}</h4>
                <p><strong>Date:</strong> ${dateStr}</p>
                <div class="festival-type ${festival.type}">${this.getFestivalTypeLabel(festival.type)}</div>
                <p><strong>Description:</strong> ${festival.description}</p>
                ${festival.significance ? `<p><strong>Significance:</strong> ${festival.significance}</p>` : ''}
                ${festival.rituals ? `<p><strong>Rituals:</strong> ${festival.rituals}</p>` : ''}
            </div>
        `;
        
        panel.classList.add('active');
    }

    getFestivalTypeLabel(type) {
        const labels = {
            'hindu': 'Hindu Festival',
            'cultural': 'Cultural Event',
            'international': 'International',
            'seasonal': 'Seasonal'
        };
        return labels[type] || 'Festival';
    }

    closeFestivalPanel() {
        const panel = document.getElementById('festivalPanel');
        if (panel) {
            panel.classList.remove('active');
        }
    }

    async loadFestivalData() {
        try {
            // Use the enhanced festival data service
            if (typeof FestivalDataService !== 'undefined') {
                const dataService = new FestivalDataService();
                this.festivals = dataService.getAllFestivals();
                console.log('Loaded enhanced festival data with Telugu calendar integration');
            } else {
                // Fallback to local data
                this.festivals = this.getComprehensiveFestivalData();
            }
            this.renderCalendar(); // Re-render to show festivals
        } catch (error) {
            console.error('Error loading festival data:', error);
            // Fallback to default festivals
            this.festivals = this.getDefaultFestivals();
            this.renderCalendar();
        }
    }

    async getFestivalData() {
        // This method is now handled by loadFestivalData
        return this.festivals;
    }

    handleSearch(query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (query.trim().length < 2) {
            this.hideSearchResults();
            return;
        }

        // Use festival data service if available
        let results = [];
        if (typeof FestivalDataService !== 'undefined') {
            const dataService = new FestivalDataService();
            results = dataService.searchFestivals(query);
        } else {
            // Fallback search
            results = this.searchFestivals(query);
        }

        this.displaySearchResults(results);
    }

    searchFestivals(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        Object.entries(this.festivals).forEach(([dateKey, festival]) => {
            if (festival.name.toLowerCase().includes(searchTerm) ||
                festival.type.toLowerCase().includes(searchTerm) ||
                festival.description.toLowerCase().includes(searchTerm)) {
                results.push({
                    dateKey: dateKey,
                    festival: festival
                });
            }
        });
        
        return results;
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No festivals found</div>';
        } else {
            searchResults.innerHTML = results.slice(0, 8).map(result => {
                const date = new Date(result.dateKey);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                
                return `
                    <div class="search-result-item" data-date="${result.dateKey}">
                        <div class="search-result-name">${result.festival.name}</div>
                        <div class="search-result-date">${formattedDate}</div>
                        <div class="search-result-description">${result.festival.description}</div>
                    </div>
                `;
            }).join('');

            // Add click events to search results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const dateKey = item.getAttribute('data-date');
                    this.navigateToFestival(dateKey);
                });
            });
        }

        this.showSearchResults();
    }

    showSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.add('active');
        }
    }

    hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.remove('active');
        }
    }

    navigateToFestival(dateKey) {
        const date = new Date(dateKey);
        const festival = this.festivals[dateKey];
        
        if (festival) {
            // Navigate to the correct month
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.renderCalendar();
            
            // Hide search results
            this.hideSearchResults();
            
            // Clear search input
            const searchInput = document.getElementById('festivalSearch');
            if (searchInput) searchInput.value = '';
            
            // Show festival details after a short delay
            setTimeout(() => {
                this.showFestivalDetails(festival, date.getDate(), date.getMonth(), date.getFullYear());
            }, 300);
        }
    }

    getComprehensiveFestivalData() {
        const festivals = {};
        
        // 2025 Major Hindu and Indian Festivals
        const festivalData = [
            // January 2025
            { date: '2025-01-14', name: 'Makar Sankranti', type: 'hindu', description: 'Harvest festival marking the transition of the sun into Capricorn', significance: 'Celebrates the end of winter and beginning of longer days' },
            { date: '2025-01-26', name: 'Republic Day', type: 'cultural', description: 'National holiday celebrating the adoption of the Indian Constitution', significance: 'Commemorates India becoming a republic in 1950' },
            
            // February 2025
            { date: '2025-02-12', name: 'Vasant Panchami', type: 'hindu', description: 'Festival dedicated to Goddess Saraswati', significance: 'Marks the arrival of spring and celebrates knowledge and arts' },
            { date: '2025-02-26', name: 'Maha Shivratri', type: 'hindu', description: 'Great night of Lord Shiva', significance: 'One of the most important festivals for Shaivites' },
            
            // March 2025
            { date: '2025-03-13', name: 'Holi', type: 'hindu', description: 'Festival of Colors', significance: 'Celebrates the victory of good over evil and the arrival of spring' },
            { date: '2025-03-14', name: 'Dhuleti', type: 'hindu', description: 'Second day of Holi celebrations', significance: 'Day of playing with colors and water' },
            { date: '2025-03-31', name: 'Ugadi', type: 'hindu', description: 'Telugu and Kannada New Year', significance: 'Marks the beginning of a new year according to the lunar calendar' },
            
            // April 2025
            { date: '2025-04-06', name: 'Chaitra Navratri Begins', type: 'hindu', description: 'Nine-day festival dedicated to Goddess Durga', significance: 'Celebrates the divine feminine energy' },
            { date: '2025-04-13', name: 'Rama Navami', type: 'hindu', description: 'Birthday of Lord Rama', significance: 'Celebrates the birth of the seventh avatar of Vishnu' },
            { date: '2025-04-14', name: 'Baisakhi', type: 'hindu', description: 'Harvest festival and Sikh New Year', significance: 'Celebrates the spring harvest in Northern India' },
            { date: '2025-04-18', name: 'Good Friday', type: 'international', description: 'Christian holy day', significance: 'Commemorates the crucifixion of Jesus Christ' },
            
            // May 2025
            { date: '2025-05-12', name: 'Buddha Purnima', type: 'hindu', description: 'Birthday of Gautama Buddha', significance: 'Celebrates the birth, enlightenment, and death of Buddha' },
            
            // June 2025
            { date: '2025-06-21', name: 'International Yoga Day', type: 'international', description: 'Global celebration of yoga', significance: 'Promotes physical and mental well-being through yoga' },
            
            // July 2025
            { date: '2025-07-13', name: 'Guru Purnima', type: 'hindu', description: 'Day dedicated to spiritual teachers', significance: 'Honors the guru-disciple tradition' },
            
            // August 2025
            { date: '2025-08-15', name: 'Independence Day', type: 'cultural', description: 'National holiday celebrating Indian independence', significance: 'Commemorates freedom from British rule in 1947' },
            { date: '2025-08-16', name: 'Janmashtami', type: 'hindu', description: 'Birthday of Lord Krishna', significance: 'Celebrates the birth of the eighth avatar of Vishnu' },
            { date: '2025-08-31', name: 'Ganesh Chaturthi', type: 'hindu', description: 'Festival of Lord Ganesha', significance: 'Celebrates the elephant-headed god of wisdom and prosperity' },
            
            // September 2025
            { date: '2025-09-07', name: 'Onam', type: 'hindu', description: 'Kerala harvest festival', significance: 'Celebrates the homecoming of King Mahabali' },
            
            // October 2025
            { date: '2025-10-01', name: 'Navratri Begins', type: 'hindu', description: 'Nine-day festival of Goddess Durga', significance: 'Celebrates the triumph of good over evil' },
            { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'cultural', description: 'Birthday of Mahatma Gandhi', significance: 'Honors the father of the nation' },
            { date: '2025-10-10', name: 'Dussehra', type: 'hindu', description: 'Victory of Lord Rama over Ravana', significance: 'Symbolizes the victory of good over evil' },
            { date: '2025-10-20', name: 'Diwali', type: 'hindu', description: 'Festival of Lights', significance: 'Celebrates the return of Lord Rama and the triumph of light over darkness' },
            { date: '2025-10-21', name: 'Govardhan Puja', type: 'hindu', description: 'Day after Diwali', significance: 'Celebrates Lord Krishna lifting Mount Govardhan' },
            { date: '2025-10-22', name: 'Bhai Dooj', type: 'hindu', description: 'Festival celebrating brother-sister bond', significance: 'Sisters pray for their brothers well-being' },
            
            // November 2025
            { date: '2025-11-05', name: 'Chhath Puja', type: 'hindu', description: 'Festival dedicated to Sun God', significance: 'Thanks the Sun God for sustaining life on earth' },
            { date: '2025-11-15', name: 'Guru Nanak Jayanti', type: 'cultural', description: 'Birthday of Guru Nanak', significance: 'Celebrates the founder of Sikhism' },
            
            // December 2025
            { date: '2025-12-25', name: 'Christmas', type: 'international', description: 'Christian celebration of Jesus birth', significance: 'Celebrates the birth of Jesus Christ' },
            { date: '2025-12-31', name: 'New Year Eve', type: 'international', description: 'Last day of the Gregorian year', significance: 'Welcomes the coming year with celebrations' }
        ];
        
        // Convert to festivals object
        festivalData.forEach(festival => {
            festivals[festival.date] = {
                name: festival.name,
                type: festival.type,
                description: festival.description,
                significance: festival.significance,
                rituals: festival.rituals || ''
            };
        });
        
        return festivals;
    }

    getDefaultFestivals() {
        // Fallback festivals if data loading fails
        return {
            '2025-01-14': { name: 'Makar Sankranti', type: 'hindu', description: 'Harvest festival', significance: 'Celebrates the transition of sun' },
            '2025-03-13': { name: 'Holi', type: 'hindu', description: 'Festival of Colors', significance: 'Victory of good over evil' },
            '2025-04-13': { name: 'Rama Navami', type: 'hindu', description: 'Birthday of Lord Rama', significance: 'Birth of Vishnu avatar' },
            '2025-08-16': { name: 'Janmashtami', type: 'hindu', description: 'Birthday of Lord Krishna', significance: 'Birth of Krishna' },
            '2025-10-20': { name: 'Diwali', type: 'hindu', description: 'Festival of Lights', significance: 'Triumph of light over darkness' },
            '2025-12-25': { name: 'Christmas', type: 'international', description: 'Christian celebration', significance: 'Birth of Jesus Christ' }
        };
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing calendar...');
    setTimeout(() => {
        new FestivalCalendar();
    }, 100);
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Add sparkle animation to festival days
    const addSparkleEffect = () => {
        const festivalDays = document.querySelectorAll('.has-festival');
        festivalDays.forEach(day => {
            day.addEventListener('mouseenter', () => {
                if (!day.querySelector('.sparkle')) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        pointer-events: none;
                        background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
                        border-radius: 10px;
                        animation: sparkle 1.5s ease-in-out infinite;
                    `;
                    day.appendChild(sparkle);
                }
            });
        });
    };
    
    // Add CSS for sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
        }
        
        .calendar-day {
            position: relative;
            overflow: visible;
        }
        
        .calendar-day::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, transparent, rgba(255,215,0,0.2), transparent);
            border-radius: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .calendar-day.has-festival:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize sparkle effects after a short delay to ensure calendar is rendered
    setTimeout(addSparkleEffect, 500);
});
