# Parallel Market Tracker

A real-time web application that tracks parallel market exchange rates for multiple countries including Argentina, Nigeria, and Egypt. The app displays official rates alongside parallel/black market rates and calculates the percentage difference.

## Features

- **Multi-Country Support**: Track rates for 3 countries
  - 🇦🇷 Argentina (ARS) - Dolar Blue vs Official
  - 🇳🇬 Nigeria (NGN) - Parallel vs Official  
  - 🇪🇬 Egypt (EGP) - Black Market vs Official

- **Real-time Data**: Auto-refresh every 5 minutes
- **Individual Refresh**: Refresh rates for specific countries
- **Keyboard Shortcuts**: Quick refresh controls
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Graceful fallbacks when data sources fail

## Countries & Currencies

### Argentina (ARS)
- **Official Rate**: Yahoo Finance
- **Dolar Blue**: Multiple sources with fallbacks
- **Typical Premium**: 100-150% above official

### Nigeria (NGN)  
- **Official Rate**: Yahoo Finance
- **Parallel Rate**: Multiple sources with fallbacks
- **Typical Premium**: 20-40% above official

### Egypt (EGP)
- **Official Rate**: Yahoo Finance  
- **Black Market**: Multiple sources with premium calculation
- **Typical Premium**: 30-50% above official

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd parallel-market-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Local Development

### Quick Start
The easiest way to run the app locally is using the provided script:

```bash
./start.sh
```

This script will:
- Kill any existing processes on port 3000
- Install dependencies if needed
- Start the server on http://localhost:3000

### Manual Start
If you prefer to start manually:

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start

# Or specify a different port
PORT=3001 npm start
```

### Development Mode
For development with auto-restart on file changes:

```bash
npm run dev
```

**Note**: Make sure you have `nodemon` installed globally or as a dev dependency.

## Usage

### Web Interface
- **Refresh All**: Click "Refresh All Rates" button
- **Individual Refresh**: Use country-specific refresh buttons
- **Auto-refresh**: Rates update automatically every 5 minutes

### Keyboard Shortcuts
- `Ctrl/Cmd + R` or `Spacebar`: Refresh all rates
- `A`: Refresh Argentina rates only
- `N`: Refresh Nigeria rates only  
- `E`: Refresh Egypt rates only

## API Endpoints

### Get All Rates
```
GET /api/rates
```
Returns rates for all countries.

### Get Country-Specific Rates
```
GET /api/rates/argentina
GET /api/rates/nigeria  
GET /api/rates/egypt
```

### Health Check
```
GET /api/health
```

## Data Sources

### Official Rates
- Yahoo Finance API for real-time official exchange rates

### Parallel/Black Market Rates
- Multiple web scraping sources with fallbacks
- Premium calculations based on market conditions
- Error handling with realistic fallback values

## Technical Details

- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Fetching**: Axios for HTTP requests
- **Web Scraping**: Cheerio for HTML parsing
- **Styling**: Modern CSS with gradients and animations
- **Responsive**: Mobile-first design approach

## Error Handling

The application includes comprehensive error handling:
- Network request failures
- Invalid data responses
- Rate limiting from sources
- Graceful fallbacks to static values
- User-friendly error messages

## Disclaimer

This application displays real-time exchange rates for informational purposes only. Parallel market rates represent unofficial market conditions and may vary significantly from official rates. Always verify rates before making financial decisions. The developers are not responsible for any financial losses or decisions made based on the displayed rates.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions, please open an issue on the GitHub repository. 