# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MEUSE24 • GeoShare** is a modern, professional web application for location sharing built with vanilla HTML, CSS, and JavaScript. The app features a sophisticated design system, interactive mapping, and comprehensive coordinate format support.

## Architecture

### Core Components

#### **LocationApp Class** (`script.js`)
- Main application controller with state management
- Theme system with localStorage persistence
- Modern interaction handlers and notification system
- Geolocation API integration with error handling
- Map management with Leaflet.js integration

#### **Design System** (`styles.css`)
- CSS custom properties with comprehensive color palette
- Dark/Light theme support with data attributes
- Responsive breakpoint system (mobile-first)
- Animation system with keyframes and transitions
- Accessibility features (focus states, reduced motion)

#### **UI Architecture** (`index.html`)
- Hero section with glassmorphism feature cards
- Grid-based responsive layout system
- Semantic HTML structure with ARIA labels
- Progressive enhancement approach

### Key Features

#### **Location Services**
- High-accuracy Geolocation API with retry mechanisms
- Multiple coordinate format display (decimal, DMS, Google Maps)
- Interactive Leaflet.js map with markers and accuracy circles
- Real-time coordinate conversion and formatting

#### **Sharing Capabilities**
- Comprehensive share functionality with all formats in one message
- Native Web Share API with intelligent fallbacks
- Individual format copying with visual feedback
- Formatted messages with emojis and structure

#### **Modern UX**
- Dark/Light mode toggle with theme persistence
- Smooth animations and micro-interactions
- Loading states and visual feedback systems
- Intersection Observer for scroll-triggered animations
- Modern notification system with slide animations

## Development Guidelines

### **CSS Architecture**
- Uses CSS custom properties for consistent theming
- BEM-inspired naming conventions
- Mobile-first responsive design approach
- Component-based styling with utility classes

### **JavaScript Patterns**
- ES6+ class-based architecture
- Event delegation and modern DOM APIs
- Async/await for API interactions
- LocalStorage for state persistence
- Feature detection for progressive enhancement

### **Browser Compatibility**
- Modern browser support (ES6+ required)
- Feature detection for Web APIs
- Graceful degradation for unsupported features
- Cross-platform touch and mouse event handling

## Technical Requirements

### **Development Environment**
- HTTPS or localhost required for Geolocation API
- Modern browser with ES6+ support
- No build process required (vanilla implementation)

### **External Dependencies**
- **Leaflet.js**: Interactive mapping library
- **Inter Font**: Typography via Google Fonts
- **OpenStreetMap**: Tile provider for maps

### **Performance Considerations**
- Lazy loading for map tiles
- Debounced resize handlers
- Efficient CSS animations using transforms
- Minimal JavaScript bundle size

## Testing Approach

### **Core Functionality**
- Location accuracy across different devices
- Map rendering and interaction on various screen sizes
- Theme switching and persistence
- Share functionality on mobile vs desktop
- Copy-to-clipboard across browsers

### **Responsive Testing**
- Mobile portrait/landscape orientations
- Tablet breakpoints and interactions
- Desktop hover states and keyboard navigation
- High-DPI display compatibility

### **Accessibility Testing**
- Keyboard navigation flow
- Screen reader compatibility
- Focus indicator visibility
- Color contrast in both themes

## File Structure

```
├── index.html          # Main application with hero section and UI
├── script.js           # LocationApp class with modern JS features
├── styles.css          # Complete design system with CSS variables
├── CLAUDE.md          # This developer documentation
└── README.md          # User-facing project documentation
```

## Development Notes

### **Map Integration**
- Fixed 400px height for consistent display (350px on mobile)
- Multiple invalidateSize() calls for proper Leaflet rendering
- Enhanced map controls with touch optimization
- Custom styling for map container integration

### **Theme System**
- Uses `data-theme` attribute on document root
- CSS custom property switching for themes
- LocalStorage persistence with fallback detection
- Smooth transitions between theme states

### **Error Handling**
- Comprehensive Geolocation API error management
- User-friendly error messages with visual feedback
- Fallback mechanisms for unsupported browsers
- Loading states for better UX during API calls

### **Modern Features**
- PWA-ready with service worker hooks
- Install prompt integration
- Advanced CSS features (backdrop-filter, clamp(), grid)
- Modern JavaScript APIs (Intersection Observer, Web Share)

## Deployment Considerations

- Requires HTTPS for production (Geolocation API requirement)
- Static hosting compatible (no server-side requirements)
- CDN-friendly with external font/library loading
- Optimized for modern browser performance