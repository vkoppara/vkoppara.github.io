// Festival Data Fetcher - Enhanced festival database with Telugu calendar integration
class FestivalDataService {
    constructor() {
        this.teluguCalendarUrl = 'https://www.drikpanchang.com/telugu/calendar/telugu-calendar.html?geoname-id=1273800&year=2025';
        this.festivals = {};
        this.loadEnhancedFestivalData();
    }

    // Since direct scraping is blocked by CORS, we'll create a comprehensive database
    // that includes Telugu/South Indian festivals along with pan-Indian festivals
         lData() {
        const enhancedFestivals = {
            // January 2025
            '2025-01-01': { name: 'New Year Day', type: 'international', description: 'Gregorian New Year celebration', significance: 'Beginning of the calendar year' },
            '2025-01-14': { name: 'Makar Sankranti', type: 'hindu', description: 'Harvest festival marking sun\'s northward journey', significance: 'Celebrates the end of winter solstice', rituals: 'Flying kites, eating sesame sweets, holy dips' },
            '2025-01-15': { name: 'Pongal (Tamil)', type: 'hindu', description: 'Tamil harvest festival', significance: 'Thanks the Sun God for good harvest', rituals: 'Boiling rice with milk and jaggery' },
            '2025-01-26': { name: 'Republic Day', type: 'cultural', description: 'National holiday celebrating Indian Constitution', significance: 'Commemorates India becoming a republic' },

            // February 2025
            '2025-02-03': { name: 'Vasant Panchami', type: 'hindu', description: 'Festival of Goddess Saraswati and spring', significance: 'Marks the arrival of spring season', rituals: 'Wearing yellow, worshipping books and instruments' },
            '2025-02-12': { name: 'Magh Purnima', type: 'hindu', description: 'Full moon day in Magh month', significance: 'Auspicious for holy baths and charity' },
            '2025-02-26': { name: 'Maha Shivratri', type: 'hindu', description: 'Great night of Lord Shiva', significance: 'Celebrates the cosmic dance of Shiva', rituals: 'Nightlong vigil, fasting, offering bel leaves' },

            // March 2025
            '2025-03-13': { name: 'Holi (Dhulandi)', type: 'hindu', description: 'Festival of Colors', significance: 'Victory of good over evil, arrival of spring', rituals: 'Playing with colors, dancing, feasting' },
            '2025-03-14': { name: 'Rangpanchami', type: 'hindu', description: 'Extended Holi celebrations', significance: 'Continues the color festival traditions' },
            '2025-03-30': { name: 'Ram Navami', type: 'hindu', description: 'Birthday of Lord Rama', significance: 'Birth of the seventh avatar of Vishnu', rituals: 'Reading Ramayana, processions, prayers' },

            // April 2025
            '2025-04-01': { name: 'Ugadi/Gudi Padwa', type: 'hindu', description: 'Telugu/Marathi New Year', significance: 'Beginning of new lunar year', rituals: 'Eating Ugadi pachadi, decorating with mango leaves' },
            '2025-04-06': { name: 'Chaitra Navratri Begins', type: 'hindu', description: 'Nine-day Goddess Durga festival', significance: 'Celebrates divine feminine energy' },
            '2025-04-13': { name: 'Baisakhi', type: 'hindu', description: 'Punjabi harvest festival', significance: 'Celebrates spring harvest and Sikh New Year', rituals: 'Bhangra dancing, visiting gurdwaras' },
            '2025-04-18': { name: 'Good Friday', type: 'international', description: 'Christian holy day', significance: 'Commemorates crucifixion of Jesus Christ' },

            // May 2025
            '2025-05-01': { name: 'May Day', type: 'international', description: 'International Workers Day', significance: 'Celebrates labor and workers rights' },
            '2025-05-12': { name: 'Buddha Purnima', type: 'hindu', description: 'Birthday of Gautama Buddha', significance: 'Celebrates birth, enlightenment, and death of Buddha', rituals: 'Meditation, visiting Buddhist temples, charity' },

            // June 2025
            '2025-06-21': { name: 'International Yoga Day', type: 'international', description: 'Global celebration of yoga', significance: 'Promotes physical and mental well-being' },

            // July 2025
            '2025-07-13': { name: 'Guru Purnima', type: 'hindu', description: 'Day dedicated to spiritual teachers', significance: 'Honors the guru-disciple tradition', rituals: 'Offering prayers to teachers, seeking blessings' },
            '2025-07-31': { name: 'Shravan Month Begins', type: 'hindu', description: 'Holy month for Lord Shiva', significance: 'Considered auspicious for Shiva worship' },

            // August 2025
            '2025-08-15': { name: 'Independence Day', type: 'cultural', description: 'National holiday celebrating freedom', significance: 'Commemorates independence from British rule' },
            '2025-08-16': { name: 'Janmashtami', type: 'hindu', description: 'Birthday of Lord Krishna', significance: 'Birth of eighth avatar of Vishnu', rituals: 'Midnight prayers, jhula ceremonies, fasting' },
            '2025-08-31': { name: 'Ganesh Chaturthi', type: 'hindu', description: 'Festival of Lord Ganesha', significance: 'Celebrates elephant-headed god of wisdom', rituals: 'Installing Ganesha idols, modak offerings' },

            // September 2025
            '2025-09-07': { name: 'Onam', type: 'hindu', description: 'Kerala harvest festival', significance: 'Celebrates homecoming of King Mahabali', rituals: 'Pookalam rangoli, Onasadya feast, boat races' },
            '2025-09-15': { name: 'Anant Chaturdashi', type: 'hindu', description: 'End of Ganesh festival', significance: 'Immersion of Ganesha idols' },

            // October 2025
            '2025-10-02': { name: 'Gandhi Jayanti', type: 'cultural', description: 'Birthday of Mahatma Gandhi', significance: 'Honors the father of the nation' },
            '2025-10-03': { name: 'Navratri Begins', type: 'hindu', description: 'Nine-day Goddess Durga festival', significance: 'Celebrates triumph of good over evil', rituals: 'Garba dancing, fasting, Goddess worship' },
            '2025-10-11': { name: 'Dussehra', type: 'hindu', description: 'Victory of Rama over Ravana', significance: 'Symbolizes victory of good over evil', rituals: 'Burning Ravana effigies, Ram Lila performances' },
            '2025-10-20': { name: 'Diwali/Deepavali', type: 'hindu', description: 'Festival of Lights', significance: 'Return of Lord Rama, triumph of light over darkness', rituals: 'Lighting diyas, fireworks, rangoli, sweets' },
            '2025-10-21': { name: 'Govardhan Puja', type: 'hindu', description: 'Day after Diwali', significance: 'Celebrates Krishna lifting Mount Govardhan' },
            '2025-10-23': { name: 'Bhai Dooj', type: 'hindu', description: 'Festival of brother-sister bond', significance: 'Sisters pray for brothers well-being', rituals: 'Tilaka ceremony, gift exchange' },

            // November 2025
            '2025-11-05': { name: 'Chhath Puja', type: 'hindu', description: 'Festival dedicated to Sun God', significance: 'Thanks Sun God for sustaining life', rituals: 'Standing in water, offering prayers to Sun' },
            '2025-11-15': { name: 'Guru Nanak Jayanti', type: 'cultural', description: 'Birthday of Guru Nanak', significance: 'Celebrates founder of Sikhism', rituals: 'Gurdwara visits, community service, langar' },

            // December 2025
            '2025-12-25': { name: 'Christmas', type: 'international', description: 'Christian celebration', significance: 'Birth of Jesus Christ', rituals: 'Church services, gift exchange, feasting' },
            '2025-12-31': { name: 'New Year Eve', type: 'international', description: 'Last day of Gregorian year', significance: 'Welcomes coming year with celebrations' },

            // Additional Telugu/South Indian specific festivals
            '2025-01-25': { name: 'Vasant Panchami (Telugu)', type: 'hindu', description: 'Telugu celebration of Saraswati', significance: 'Learning and knowledge worship' },
            '2025-02-18': { name: 'Ratha Saptami', type: 'hindu', description: 'Sun God\'s chariot festival', significance: 'Celebrates Sun\'s northward journey' },
            '2025-03-03': { name: 'Meena Sankranti', type: 'hindu', description: 'Telugu calendar month beginning', significance: 'Marks beginning of Meena month' },
            '2025-04-14': { name: 'Vishu (Malayalam)', type: 'hindu', description: 'Malayalam New Year', significance: 'Kerala New Year celebration' },
            '2025-05-21': { name: 'Vat Pournima', type: 'hindu', description: 'Married women\'s festival', significance: 'Prayers for husband\'s long life' },
            '2025-06-15': { name: 'Rath Yatra', type: 'hindu', description: 'Jagannath chariot festival', significance: 'Lord Jagannath\'s annual journey' },
            '2025-08-03': { name: 'Nag Panchami', type: 'hindu', description: 'Snake worship festival', significance: 'Honors snake deities' },
            '2025-09-01': { name: 'Ganesh Chaturthi (Telugu)', type: 'hindu', description: 'Telugu Ganesha festival', significance: 'Regional Ganesha celebrations' },
            '2025-11-01': { name: 'Karva Chauth', type: 'hindu', description: 'Married women\'s fasting', significance: 'Wives fast for husbands longevity' },
            '2025-12-15': { name: 'Dhanu Sankranti', type: 'hindu', description: 'Telugu month beginning', significance: 'Beginning of Dhanu month' }
        };

        this.festivals = enhancedFestivals;
        return this.festivals;
    }

    // Method to potentially fetch from Telugu calendar (would require server-side proxy)
    async fetchFromTeluguCalendar() {
        // This would require a server-side proxy to avoid CORS issues
        // For now, we return the enhanced local data
        console.log('Note: Direct web scraping blocked by CORS. Using enhanced local festival database.');
        return this.festivals;
    }

    // Get festivals for a specific month
    getFestivalsForMonth(year, month) {
        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
        const monthlyFestivals = {};
        
        Object.entries(this.festivals).forEach(([dateKey, festival]) => {
            if (dateKey.startsWith(monthKey)) {
                monthlyFestivals[dateKey] = festival;
            }
        });
        
        return monthlyFestivals;
    }

    // Get upcoming festivals
    getUpcomingFestivals(limit = 10) {
        const today = new Date();
        const upcoming = [];
        
        Object.entries(this.festivals).forEach(([dateKey, festival]) => {
            const festivalDate = new Date(dateKey);
            if (festivalDate >= today) {
                upcoming.push({
                    date: festivalDate,
                    dateKey: dateKey,
                    festival: festival
                });
            }
        });
        
        return upcoming.sort((a, b) => a.date - b.date).slice(0, limit);
    }

    // Search festivals by name or type
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

    // Get all festivals
    getAllFestivals() {
        return this.festivals;
    }
}

// Export for use in calendar.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FestivalDataService;
} else if (typeof window !== 'undefined') {
    window.FestivalDataService = FestivalDataService;
}
