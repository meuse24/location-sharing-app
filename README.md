# Location Sharing App

Eine moderne Webanwendung zum Abrufen und Teilen von Standortdaten in verschiedenen Formaten.

## 🌟 Features

- **Standortabfrage**: Nutzt die Geolocation API für präzise Standortbestimmung
- **Multiple Formate**: Anzeige in Dezimalkoordinaten, Grad-Minuten-Sekunden und Google Maps Links
- **Einfaches Teilen**: Native Share-API mit Fallback für alle Browser
- **Responsive Design**: Optimiert für Mobile und Desktop
- **Offline-fähig**: Funktioniert ohne Internetverbindung nach dem ersten Laden

## 🚀 Live Demo

Öffne einfach die `index.html` Datei in deinem Browser oder hoste die Dateien auf einem Webserver.

**Wichtig**: Für die Standortabfrage ist HTTPS oder localhost erforderlich.

## 📱 Screenshot

Die App zeigt deine aktuelle Position in verschiedenen Formaten an:
- Dezimalkoordinaten (z.B. 52.520008, 13.404954)
- Grad-Minuten-Sekunden (z.B. 52° 31' 12" N, 13° 24' 17" O)
- Google Maps Link zum direkten Öffnen
- What3Words Hinweis (abhängig von der Genauigkeit)

## 🛠️ Technologie

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **APIs**: Geolocation API, Web Share API, Clipboard API
- **Styling**: CSS Grid/Flexbox, CSS Animations
- **Browser-Support**: Alle modernen Browser mit Fallbacks

## 💡 Verwendung

1. **Standort abrufen**: Klicke auf "Standort abrufen" und erlaube den Zugriff
2. **Format wählen**: Verschiedene Koordinatenformate werden automatisch angezeigt
3. **Kopieren**: Nutze die Kopieren-Buttons für einzelne Formate
4. **Teilen**: Verwende den Share-Button für natives Teilen (mobile Geräte)

## 📁 Projektstruktur

```
├── index.html          # Hauptseite mit UI-Elementen
├── styles.css          # Responsive Styling und Animationen
├── script.js           # LocationApp Klasse und Utilities
├── CLAUDE.md          # Entwickler-Dokumentation
└── README.md          # Projekt-Dokumentation
```

## 🔧 Entwicklung

### Lokaler Start
```bash
# Option 1: Einfacher HTTP Server (Python)
python -m http.server 8000

# Option 2: Node.js Live Server
npx live-server

# Option 3: Direkt in Browser öffnen (localhost)
```

### Browser-Kompatibilität
- Chrome/Edge: Vollständig unterstützt
- Firefox: Vollständig unterstützt  
- Safari: Vollständig unterstützt
- Mobile Browser: Native Share-API verfügbar

### Testing
- Teste auf verschiedenen Geräten (Mobile/Desktop)
- Prüfe HTTPS-Anforderung für Geolocation
- Verifiziere Fallback-Mechanismen

## 🔒 Datenschutz

- Keine Speicherung von Standortdaten
- Keine externe Server-Kommunikation
- Standortdaten bleiben lokal im Browser
- Teilen erfolgt nur auf explizite Nutzeraktion

## 🤝 Beitrag

1. Repository forken
2. Feature Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

---

**Entwickelt mit** ❤️ **und** [Claude Code](https://claude.ai/code)