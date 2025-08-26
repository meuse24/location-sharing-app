# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side web application for location sharing built with vanilla HTML, CSS, and JavaScript. The app requests user location via the Geolocation API and displays coordinates in multiple formats with sharing capabilities.

## Architecture

### Core Components
- **LocationApp class** (`script.js`): Main application controller managing location requests, coordinate conversion, and sharing functionality
- **HTML structure** (`index.html`): Single-page layout with format sections for different coordinate representations
- **CSS styling** (`styles.css`): Responsive design with mobile-first approach and CSS animations

### Key Features
- Geolocation API integration with high accuracy settings
- Multiple coordinate format display (decimal, DMS, Google Maps links)
- Native Web Share API with clipboard fallback
- Cross-browser compatibility with feature detection

## Development Notes

### Testing
- Requires HTTPS or localhost for Geolocation API to function
- Test on mobile devices for native share functionality
- Verify clipboard operations across different browsers

### Browser Compatibility
- Uses feature detection for Web Share API and Clipboard API
- Fallback mechanisms implemented for older browsers
- Responsive design tested on mobile and desktop

### Coordinate Formats
- Decimal degrees with 6-digit precision
- Degree-Minute-Second (DMS) format with cardinal directions
- Google Maps URL generation for location sharing
- What3Words integration placeholder (accuracy-dependent)

## File Structure
- `index.html` - Main application page
- `script.js` - LocationApp class and utility functions
- `styles.css` - Complete styling with animations and responsive breakpoints