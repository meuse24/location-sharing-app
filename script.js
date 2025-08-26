class LocationApp {
    constructor() {
        this.currentLocation = null;
        this.map = null;
        this.marker = null;
        this.mapVisible = true;
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        const getLocationBtn = document.getElementById('getLocationBtn');
        const shareBtn = document.getElementById('shareBtn');
        const centerMapBtn = document.getElementById('centerMapBtn');
        const toggleMapBtn = document.getElementById('toggleMapBtn');
        const themeToggle = document.getElementById('themeToggle');
        
        getLocationBtn.addEventListener('click', () => this.getCurrentLocation());
        shareBtn.addEventListener('click', () => this.shareLocation());
        centerMapBtn.addEventListener('click', () => this.centerMap());
        toggleMapBtn.addEventListener('click', () => this.toggleMap());
        themeToggle.addEventListener('click', () => this.toggleTheme());
        
        this.initTheme();
        this.initMap();
        this.addModernInteractions();
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation wird von diesem Browser nicht unterstützt.');
            return;
        }

        const getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.innerHTML = '🔄 Standort wird abgerufen...';
        getLocationBtn.disabled = true;
        getLocationBtn.classList.add('loading');

        navigator.geolocation.getCurrentPosition(
            (position) => this.onLocationSuccess(position),
            (error) => this.onLocationError(error),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    onLocationSuccess(position) {
        this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
        };

        this.displayLocation();
        this.resetButton();
        this.hideError();
    }

    onLocationError(error) {
        let errorMessage = 'Fehler beim Abrufen des Standorts: ';
        
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage += 'Standortzugriff wurde verweigert.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage += 'Standortinformationen sind nicht verfügbar.';
                break;
            case error.TIMEOUT:
                errorMessage += 'Zeitüberschreitung beim Abrufen des Standorts.';
                break;
            default:
                errorMessage += 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }
        
        this.showError(errorMessage);
        this.resetButton();
    }

    displayLocation() {
        const { latitude, longitude } = this.currentLocation;
        
        // Dezimalformat
        document.getElementById('decimal').textContent = 
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        
        // Grad, Minuten, Sekunden Format
        const dmsLat = this.decimalToDMS(latitude, 'lat');
        const dmsLng = this.decimalToDMS(longitude, 'lng');
        document.getElementById('dms').textContent = `${dmsLat}, ${dmsLng}`;
        
        // Google Maps Link
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        document.getElementById('googleMaps').innerHTML = 
            `<a href="${googleMapsUrl}" target="_blank">${googleMapsUrl}</a>`;
        
        // What3Words Hinweis basierend auf Genauigkeit
        const what3wordsEl = document.getElementById('what3words');
        if (this.currentLocation.accuracy > 100) {
            what3wordsEl.textContent = 'Standort zu ungenau für What3Words (Genauigkeit: ' + 
                Math.round(this.currentLocation.accuracy) + 'm)';
        } else {
            what3wordsEl.textContent = 'What3Words: Für genaue Adresse What3Words App verwenden';
        }
        
        // locationInfo anzeigen
        document.getElementById('locationInfo').classList.remove('hidden');
        
        // Karte aktualisieren und Größe korrigieren nach DOM-Update
        setTimeout(() => {
            this.updateMap();
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 100);
    }

    decimalToDMS(decimal, type) {
        const absolute = Math.abs(decimal);
        const degrees = Math.floor(absolute);
        const minutesFloat = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesFloat);
        const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
        
        let direction;
        if (type === 'lat') {
            direction = decimal >= 0 ? 'N' : 'S';
        } else {
            direction = decimal >= 0 ? 'O' : 'W';
        }
        
        return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
    }

    shareLocation() {
        if (!this.currentLocation) return;

        const { latitude, longitude, accuracy } = this.currentLocation;
        
        // Alle Koordinatenformate generieren
        const decimalCoords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        const dmsLat = this.decimalToDMS(latitude, 'lat');
        const dmsLng = this.decimalToDMS(longitude, 'lng');
        const dmsCoords = `${dmsLat}, ${dmsLng}`;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        // Formatierte Nachricht mit allen Formaten
        const shareText = `📍 Mein Standort

` +
            `🎯 Koordinaten (Dezimal):
${decimalCoords}

` +
            `🧭 Koordinaten (Grad/Min/Sek):
${dmsCoords}

` +
            `🗺 Google Maps:
${googleMapsUrl}

` +
            `🎯 Genauigkeit: ±${Math.round(accuracy)}m`;

        const shareData = {
            title: 'Mein Standort',
            text: shareText
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Standort erfolgreich geteilt'))
                .catch((error) => console.log('Fehler beim Teilen:', error));
        } else {
            // Fallback für Browser ohne Web Share API
            this.fallbackShare(shareData);
        }
    }

    fallbackShare(shareData) {
        const shareText = shareData.text;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText)
                .then(() => {
                    alert('Alle Standortdaten in Zwischenablage kopiert!');
                })
                .catch(() => {
                    this.showShareOptions(shareText);
                });
        } else {
            this.showShareOptions(shareText);
        }
    }

    showShareOptions(shareText) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); display: flex; align-items: center;
            justify-content: center; z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 400px; width: 90%;">
                <h3>Standort teilen</h3>
                <textarea readonly style="width: 100%; height: 100px; margin: 1rem 0; padding: 0.5rem;">${shareText}</textarea>
                <div style="text-align: center;">
                    <button onclick="this.closest('div').parentElement.remove()" 
                            style="padding: 0.5rem 1rem; margin: 0.25rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Schließen
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    resetButton() {
        const getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.innerHTML = '🗺️ Standort erneut abrufen';
        getLocationBtn.disabled = false;
        getLocationBtn.classList.remove('loading');
    }

    showError(message) {
        const errorEl = document.getElementById('error');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }

    hideError() {
        document.getElementById('error').classList.add('hidden');
    }

    initMap() {
        const mapElement = document.getElementById('map');
        
        // Warten bis DOM bereit ist
        if (!mapElement) {
            console.log('Map element not found, retrying...');
            setTimeout(() => this.initMap(), 100);
            return;
        }
        
        // Warten bis Leaflet geladen ist
        if (typeof L === 'undefined') {
            console.log('Leaflet not loaded, retrying...');
            setTimeout(() => this.initMap(), 100);
            return;
        }
        
        // Standardposition (Berlin) falls noch kein Standort verfügbar
        const defaultLat = 52.5200;
        const defaultLng = 13.4050;
        
        try {
            // Karte löschen falls bereits vorhanden
            if (this.map) {
                this.map.remove();
            }
            
            // Neue Karte erstellen
            this.map = L.map('map').setView([defaultLat, defaultLng], 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(this.map);
            
            // Karten-Größe nach kurzer Verzögerung korrigieren
            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 100);
            
            console.log('Karte erfolgreich initialisiert');
            
        } catch (error) {
            console.error('Fehler beim Initialisieren der Karte:', error);
            this.showMapError();
        }
    }

    updateMap() {
        if (!this.map || !this.currentLocation) return;
        
        const { latitude, longitude, accuracy } = this.currentLocation;
        
        // Karten-Größe vor Update korrigieren
        this.map.invalidateSize();
        
        // Karte zur neuen Position bewegen
        this.map.setView([latitude, longitude], 15);
        
        // Alten Marker entfernen falls vorhanden
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        
        // Neuen Marker hinzufügen
        this.marker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup(`
                <strong>Deine Position</strong><br>
                ${latitude.toFixed(6)}, ${longitude.toFixed(6)}<br>
                Genauigkeit: ±${Math.round(accuracy)}m
            `);
        
        // Genauigkeitskreis hinzufügen falls Genauigkeit verfügbar
        if (accuracy && accuracy < 1000) {
            L.circle([latitude, longitude], {
                radius: accuracy,
                color: '#667eea',
                fillColor: '#667eea',
                fillOpacity: 0.1,
                weight: 2
            }).addTo(this.map);
        }
        
        // Karte anzeigen falls versteckt
        if (!this.mapVisible) {
            this.toggleMap();
        }
    }

    centerMap() {
        if (!this.map || !this.currentLocation) {
            this.showError('Kein Standort verfügbar zum Zentrieren der Karte.');
            return;
        }
        
        const { latitude, longitude } = this.currentLocation;
        this.map.setView([latitude, longitude], 15);
        
        if (this.marker) {
            this.marker.openPopup();
        }
    }

    toggleMap() {
        const mapContainer = document.getElementById('map');
        const toggleBtn = document.getElementById('toggleMapBtn');
        
        if (!mapContainer || !toggleBtn) return;
        
        if (this.mapVisible) {
            // Karte ausblenden
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
            mapContainer.innerHTML = '<div class="map-placeholder">Karte ist ausgeblendet</div>';
            toggleBtn.textContent = 'Karte einblenden';
            this.mapVisible = false;
        } else {
            // Karte einblenden
            mapContainer.innerHTML = '';
            toggleBtn.textContent = 'Karte ausblenden';
            this.mapVisible = true;
            
            // Karte neu initialisieren
            setTimeout(() => {
                this.initMap();
                if (this.currentLocation) {
                    this.updateMap();
                }
            }, 100);
        }
    }

    showMapError() {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-placeholder">
                    <div style="text-align: center;">
                        <div style="margin-bottom: 0.5rem;">⚠️ Karte konnte nicht geladen werden</div>
                        <div style="font-size: 0.9em; color: #a0aec0;">
                            Möglicherweise ist keine Internetverbindung verfügbar
                        </div>
                    </div>
                </div>
            `;
        }
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeToggle();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeToggle();
        this.showNotification(`${this.theme === 'dark' ? '🌙 Dark' : '☀️ Light'} Mode aktiviert`);
    }

    updateThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = this.theme === 'light' ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', `Zu ${this.theme === 'light' ? 'Dark' : 'Light'} Mode wechseln`);
    }

    addModernInteractions() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });

        // Feature card interactions
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Intersection Observer for animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.format-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: var(--space-lg);
            background: ${type === 'success' ? 'var(--success-gradient)' : 'var(--error)'};
            color: white;
            padding: var(--space-md);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform var(--transition-base);
            max-width: 300px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    addCopyFeedback(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Kopiert!';
        button.style.background = 'var(--success-gradient)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const button = event.target;
    let textToCopy = element.textContent;
    
    if (elementId === 'googleMaps') {
        const link = element.querySelector('a');
        if (link) {
            textToCopy = link.href;
        }
    }
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                window.locationApp.addCopyFeedback(button);
                window.locationApp.showNotification(`📋 ${getFormatName(elementId)} in Zwischenablage kopiert!`);
            })
            .catch(err => {
                console.error('Fehler beim Kopieren:', err);
                fallbackCopyToClipboard(textToCopy);
            });
    } else {
        fallbackCopyToClipboard(textToCopy);
    }
}

function getFormatName(elementId) {
    const names = {
        'decimal': 'Dezimalkoordinaten',
        'dms': 'DMS Koordinaten', 
        'googleMaps': 'Google Maps Link'
    };
    return names[elementId] || 'Inhalt';
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback();
        } else {
            alert('Kopieren fehlgeschlagen. Text manuell auswählen und kopieren.');
        }
    } catch (err) {
        console.error('Fallback-Kopieren fehlgeschlagen:', err);
        alert('Kopieren nicht möglich. Text manuell auswählen und kopieren.');
    }
    
    document.body.removeChild(textArea);
}

// Removed - replaced with modern notification system

// App initialisieren
document.addEventListener('DOMContentLoaded', () => {
    window.locationApp = new LocationApp();
    
    // Service Worker für PWA (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registriert'))
            .catch(() => console.log('Service Worker nicht verfügbar'));
    }
    
    // Installable Web App Prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
        window.locationApp.showNotification('📥 App kann installiert werden!');
    });
});