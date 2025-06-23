class ParallelMarketTracker {
    constructor() {
        this.elements = {
            // Argentina elements
            arsOfficialRate: document.getElementById('ars-official-rate'),
            arsDolarBlueRate: document.getElementById('ars-dolar-blue-rate'),
            arsPercentageDifference: document.getElementById('ars-percentage-difference'),
            
            // Nigeria elements
            ngnOfficialRate: document.getElementById('ngn-official-rate'),
            ngnParallelRate: document.getElementById('ngn-parallel-rate'),
            ngnPercentageDifference: document.getElementById('ngn-percentage-difference'),
            
            // Egypt elements
            egpOfficialRate: document.getElementById('egp-official-rate'),
            egpBlackMarketRate: document.getElementById('egp-black-market-rate'),
            egpPercentageDifference: document.getElementById('egp-percentage-difference'),
            
            // Common elements
            lastUpdated: document.getElementById('last-updated'),
            refreshBtn: document.getElementById('refresh-btn'),
            refreshArgentinaBtn: document.getElementById('refresh-argentina-btn'),
            refreshNigeriaBtn: document.getElementById('refresh-nigeria-btn'),
            refreshEgyptBtn: document.getElementById('refresh-egypt-btn')
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadAllRates();
        this.startAutoRefresh();
    }

    bindEvents() {
        this.elements.refreshBtn.addEventListener('click', () => {
            this.loadAllRates();
        });
        
        this.elements.refreshArgentinaBtn.addEventListener('click', () => {
            this.loadArgentinaRates();
        });
        
        this.elements.refreshNigeriaBtn.addEventListener('click', () => {
            this.loadNigeriaRates();
        });
        
        this.elements.refreshEgyptBtn.addEventListener('click', () => {
            this.loadEgyptRates();
        });
    }

    async loadAllRates() {
        this.setLoadingState(true, 'all');
        
        try {
            // Clear cache first to get fresh data
            await fetch('/api/clear-cache', { method: 'POST' });
            
            const response = await fetch('/api/rates');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateAllRates(data);
            this.setLoadingState(false, 'all');
            
        } catch (error) {
            console.error('Error loading all rates:', error);
            this.showError('all');
            this.setLoadingState(false, 'all');
        }
    }

    async loadArgentinaRates() {
        this.setLoadingState(true, 'argentina');
        
        try {
            // Clear cache first to get fresh data
            await fetch('/api/clear-cache', { method: 'POST' });
            
            const response = await fetch('/api/rates/argentina');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateArgentinaRates(data);
            this.setLoadingState(false, 'argentina');
            
        } catch (error) {
            console.error('Error loading Argentina rates:', error);
            this.showError('argentina');
            this.setLoadingState(false, 'argentina');
        }
    }

    async loadNigeriaRates() {
        this.setLoadingState(true, 'nigeria');
        
        try {
            // Clear cache first to get fresh data
            await fetch('/api/clear-cache', { method: 'POST' });
            
            const response = await fetch('/api/rates/nigeria');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateNigeriaRates(data);
            this.setLoadingState(false, 'nigeria');
            
        } catch (error) {
            console.error('Error loading Nigeria rates:', error);
            this.showError('nigeria');
            this.setLoadingState(false, 'nigeria');
        }
    }

    async loadEgyptRates() {
        this.setLoadingState(true, 'egypt');
        
        try {
            // Clear cache first to get fresh data
            await fetch('/api/clear-cache', { method: 'POST' });
            
            const response = await fetch('/api/rates/egypt');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateEgyptRates(data);
            this.setLoadingState(false, 'egypt');
            
        } catch (error) {
            console.error('Error loading Egypt rates:', error);
            this.showError('egypt');
            this.setLoadingState(false, 'egypt');
        }
    }

    updateAllRates(data) {
        // Update Argentina rates
        if (data.argentina) {
            this.updateArgentinaRates(data.argentina);
        }
        
        // Update Nigeria rates
        if (data.nigeria) {
            this.updateNigeriaRates(data.nigeria);
        }
        
        // Update Egypt rates
        if (data.egypt) {
            this.updateEgyptRates(data.egypt);
        }
        
        // Update timestamp
        const timestamp = new Date(data.timestamp);
        this.elements.lastUpdated.textContent = timestamp.toLocaleString();
        
        // Add success animation
        this.addSuccessAnimation();
    }

    updateArgentinaRates(data) {
        // Update official rate
        this.elements.arsOfficialRate.innerHTML = `
            <span class="success">${this.formatCurrency(data.official, 'ARS')}</span>
        `;

        // Update Dolar Blue rate
        this.elements.arsDolarBlueRate.innerHTML = `
            <span class="success">${this.formatCurrency(data.dolarBlue, 'ARS')}</span>
        `;

        // Update percentage difference
        const percentage = parseFloat(data.percentageDifference);
        const differenceClass = percentage > 0 ? 'success' : 'error';
        const sign = percentage > 0 ? '+' : '';
        
        this.elements.arsPercentageDifference.innerHTML = `
            <span class="${differenceClass}">${sign}${percentage}%</span>
        `;
    }

    updateNigeriaRates(data) {
        // Update official rate
        this.elements.ngnOfficialRate.innerHTML = `
            <span class="success">${this.formatCurrency(data.official, 'NGN')}</span>
        `;

        // Update parallel rate
        this.elements.ngnParallelRate.innerHTML = `
            <span class="success">${this.formatCurrency(data.parallel, 'NGN')}</span>
        `;

        // Update percentage difference
        const percentage = parseFloat(data.percentageDifference);
        const differenceClass = percentage > 0 ? 'success' : 'error';
        const sign = percentage > 0 ? '+' : '';
        
        this.elements.ngnPercentageDifference.innerHTML = `
            <span class="${differenceClass}">${sign}${percentage}%</span>
        `;
    }

    updateEgyptRates(data) {
        // Update official rate
        this.elements.egpOfficialRate.innerHTML = `
            <span class="success">${this.formatCurrency(data.official, 'EGP')}</span>
        `;

        // Update black market rate
        this.elements.egpBlackMarketRate.innerHTML = `
            <span class="success">${this.formatCurrency(data.blackMarket, 'EGP')}</span>
        `;

        // Update percentage difference
        const percentage = parseFloat(data.percentageDifference);
        const differenceClass = percentage > 0 ? 'success' : 'error';
        const sign = percentage > 0 ? '+' : '';
        
        this.elements.egpPercentageDifference.innerHTML = `
            <span class="${differenceClass}">${sign}${percentage}%</span>
        `;
    }

    formatCurrency(value, currency) {
        const options = {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        
        if (currency === 'NGN') {
            // For NGN, use Nigerian locale
            return new Intl.NumberFormat('en-NG', options).format(value);
        } else if (currency === 'EGP') {
            // For EGP, use English locale to avoid Arabic text display issues
            try {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'EGP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(value);
            } catch (error) {
                // Fallback to simple formatting if locale fails
                return `EGP ${value.toFixed(2)}`;
            }
        } else {
            // For ARS, use Argentine locale
            return new Intl.NumberFormat('es-AR', options).format(value);
        }
    }

    setLoadingState(isLoading, type) {
        const buttons = {
            'all': [this.elements.refreshBtn],
            'argentina': [this.elements.refreshArgentinaBtn],
            'nigeria': [this.elements.refreshNigeriaBtn],
            'egypt': [this.elements.refreshEgyptBtn]
        };
        
        const targetButtons = buttons[type] || buttons.all;
        
        targetButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            
            if (isLoading) {
                btn.classList.add('loading');
                btn.disabled = true;
                icon.style.transform = 'rotate(0deg)';
            } else {
                btn.classList.remove('loading');
                btn.disabled = false;
                icon.style.transform = 'rotate(180deg)';
                
                // Reset icon rotation after animation
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 300);
            }
        });
    }

    showError(type) {
        if (type === 'all' || type === 'argentina') {
            this.elements.arsOfficialRate.innerHTML = `
                <span class="error">Error loading data</span>
            `;
            this.elements.arsDolarBlueRate.innerHTML = `
                <span class="error">Error loading data</span>
            `;
            this.elements.arsPercentageDifference.innerHTML = `
                <span class="error">--</span>
            `;
        }
        
        if (type === 'all' || type === 'nigeria') {
            this.elements.ngnOfficialRate.innerHTML = `
                <span class="error">Error loading data</span>
            `;
            this.elements.ngnParallelRate.innerHTML = `
                <span class="error">Error loading data</span>
            `;
            this.elements.ngnPercentageDifference.innerHTML = `
                <span class="error">--</span>
            `;
        }
        
        if (type === 'all' || type === 'egypt') {
            this.elements.egpOfficialRate.innerHTML = `
                <span class="error">Error loading data</span>
            `;
            this.elements.egpBlackMarketRate.innerHTML = `
                <span class="error">Error loading data</span>
            `;
            this.elements.egpPercentageDifference.innerHTML = `
                <span class="error">--</span>
            `;
        }
        
        if (type === 'all') {
            this.elements.lastUpdated.textContent = 'Error occurred';
        }
    }

    addSuccessAnimation() {
        const cards = document.querySelectorAll('.rate-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            }, index * 20);
        });
    }

    startAutoRefresh() {
        // Auto-refresh every 5 minutes
        setInterval(() => {
            this.loadAllRates();
        }, 5 * 60 * 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParallelMarketTracker();
});

// Add some additional utility functions
const utils = {
    // Format number with thousands separator
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    // Calculate time difference
    getTimeDifference: (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = Math.floor((now - time) / 1000); // difference in seconds

        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #4CAF50;' : 
              type === 'error' ? 'background: #f44336;' : 
              'background: #2196F3;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R to refresh all
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        document.getElementById('refresh-btn').click();
    }
    
    // Spacebar to refresh all
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        document.getElementById('refresh-btn').click();
    }
    
    // 'A' key to refresh Argentina only
    if (e.key === 'a' && e.target === document.body) {
        e.preventDefault();
        document.getElementById('refresh-argentina-btn').click();
    }
    
    // 'N' key to refresh Nigeria only
    if (e.key === 'n' && e.target === document.body) {
        e.preventDefault();
        document.getElementById('refresh-nigeria-btn').click();
    }
    
    // 'E' key to refresh Egypt only
    if (e.key === 'e' && e.target === document.body) {
        e.preventDefault();
        document.getElementById('refresh-egypt-btn').click();
    }
}); 