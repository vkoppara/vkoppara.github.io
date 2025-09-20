# Festival Calendar - Diwali & Indian Festivals

A modern, interactive calendar webpage showcasing Indian festivals with a focus on Diwali and other cultural celebrations. Built with vanilla JavaScript, HTML5, and CSS3.

## Features

### 🎨 Modern Design
- Beautiful scrollytelling-inspired interface
- Diwali-themed color palette (Gold, Orange-Red, Dark Blue)
- Smooth animations and transitions
- Responsive design for mobile and desktop

### 📅 Interactive Calendar
- Monthly calendar view with navigation
- Festival dates highlighted with special indicators
- Click on festival dates to see detailed information
- "Today" button for quick navigation
- Festival type indicators (Hindu, Cultural, International, Seasonal)

### 🔍 Search Functionality
- Real-time search for festivals by name, type, or description
- Click search results to navigate directly to festival dates
- Auto-complete dropdown with festival details

### 📊 Festival Statistics
- Monthly festival count display
- Upcoming festivals preview
- Festival type legend with color coding

### 🎊 Festival Information
- Detailed festival descriptions
- Cultural significance explanations
- Traditional rituals and customs
- Festival type classification

### 🌟 Enhanced Festival Database
- Comprehensive 2025 Indian festival calendar
- Telugu/South Indian festival integration
- Pan-Indian festivals included
- Accurate lunar calendar dates

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling**: CSS Custom Properties, Flexbox, CSS Grid
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Icons**: Unicode Emojis
- **Responsive**: Mobile-first design approach

## File Structure

```
├── calendar.html          # Main calendar page
├── calendar.css          # Calendar-specific styles
├── calendar.js           # Calendar functionality
├── festival-data.js      # Enhanced festival database
├── index.html           # Homepage
├── index.html         # Landing page
├── style.css           # Global styles
└── public/             # Assets directory
    └── garba.jpg       # Festival images
```

## Data Sources

The festival data is sourced from:
- Traditional Hindu lunar calendar calculations
- Telugu Panchang (drikpanchang.com reference)
- Regional festival variations
- Government holiday calendars

## Setup Instructions

1. **Clone or Download** the project files
2. **Open** `calendar.html` in a web browser
3. **For Development**: Use a local server (e.g., Python HTTP server)
   ```bash
   python3 -m http.server 8080
   ```
4. **Navigate** to `http://localhost:8080/calendar.html`

## Usage

### Navigation
- Use **← →** arrows to navigate between months
- Use the **search bar** to find specific festivals

### Festival Details
- Click on any **highlighted date** to see festival information
- View **significance**, **rituals**, and **descriptions**
- Festival types are **color-coded** in the legend

### Responsive Design
- **Desktop**: Full grid layout with sidebar
- **Tablet**: Stacked layout with collapsible panels
- **Mobile**: Optimized touch interface

## Cultural Sensitivity

This calendar represents Hindu and Indian festivals with cultural accuracy and respect:
- Authentic festival names and Sanskrit/Hindi terms
- Accurate ritual descriptions and significance
- Regional variations acknowledged
- Cultural context provided for each celebration

## Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: ES6 modules, CSS Grid, Flexbox, CSS Custom Properties

## Contributing

To add more festivals or improve the calendar:
1. Update `festival-data.js` with new festival entries
2. Follow the existing data structure
3. Include cultural significance and ritual information
4. Test across different devices

## License

This project is created for educational and cultural purposes. Festival information is based on traditional sources and public calendars.

---

**Note**: For production use with live data scraping from Telugu calendar sources, implement a server-side proxy to handle CORS restrictions.
