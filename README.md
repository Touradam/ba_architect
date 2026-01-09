# Architecture Portfolio Website

A minimal, elegant, and high-impact portfolio website designed specifically for architects to showcase their work professionally.

## Features

- **Elegant Design**: Clean, minimal aesthetic that puts your work first
- **PDF Integration**: View and download portfolio PDF directly from the website
- **Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Subtle, professional animations and transitions
- **Fast Loading**: Lightweight and optimized for quick page loads
- **SEO Friendly**: Proper semantic HTML structure

## Quick Start

1. Open `index.html` in a web browser
2. Your portfolio PDF (`portfolio-1.pdf`) will be automatically linked

## Customization Guide

### 1. Update Personal Information

Edit `index.html` and update:

- **Contact email**: Line 119 - Replace `your.email@example.com`
- **LinkedIn URL**: Line 128 - Replace with your LinkedIn profile
- **About text**: Lines 70-74 - Write your personal bio
- **Stats**: Lines 76-86 - Update your experience numbers

### 2. Customize Colors

Edit `style.css` in the `:root` section (lines 13-21):

```css
--color-primary: #0a0a0a;    /* Main dark color */
--color-secondary: #1a1a1a;  /* Secondary dark */
--color-accent: #2a2a2a;     /* Accent color */
```

### 3. Update Typography

The site uses:
- **Playfair Display**: Elegant serif for headings
- **Inter**: Clean sans-serif for body text

To change fonts, update the Google Fonts link in `index.html` (line 9) and CSS variables in `style.css` (lines 23-24).

### 4. Replace PDF Portfolio

Simply replace `portfolio-1.pdf` with your own PDF file. Make sure to:
- Keep the same filename, OR
- Update the filename in `script.js` line 56: `const portfolioPDF = 'your-filename.pdf';`

### 5. Add Projects Gallery (Optional)

To add a visual project gallery before the PDF section, insert this code in `index.html` after line 95:

```html
<div class="projects-grid">
    <div class="project-item">
        <img src="project1.jpg" alt="Project Name">
        <h3>Project Title</h3>
        <p>Project description</p>
    </div>
    <!-- Add more project items -->
</div>
```

## Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Your site is live instantly

### Option 3: Custom Domain

Upload all files to your web hosting via FTP/SFTP to the public_html or www directory.

## File Structure

```
BA_Architect/
├── index.html          # Main HTML structure
├── style.css           # All styles and responsive design
├── script.js           # Interactive features and PDF viewer
├── portfolio-1.pdf     # Your portfolio PDF
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize PDF**: Compress your PDF to reduce file size (aim for under 10MB)
2. **Add Images**: If adding project images, compress them using tools like TinyPNG
3. **CDN Fonts**: Google Fonts are already loaded via CDN for optimal performance

## Customization Ideas

### Add Favicon
Add this to `<head>` in index.html:
```html
<link rel="icon" type="image/png" href="favicon.png">
```

### Add Social Links
Update the contact section in `index.html` with additional social profiles (Instagram, Behance, etc.)

### Analytics
Add Google Analytics by inserting the tracking code in `<head>` section of `index.html`

### Contact Form
For a contact form, consider using:
- [Formspree](https://formspree.io) (free)
- [Netlify Forms](https://www.netlify.com/products/forms/) (free tier available)

## Support

For issues or questions about customization, common solutions:

- **PDF not loading**: Check that the filename matches exactly in `script.js`
- **Styles not applying**: Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- **Mobile layout issues**: Test in actual devices, not just browser dev tools

## License

This template is free to use for personal and commercial projects.

## Credits

- Fonts: Google Fonts (Playfair Display, Inter)
- Icons: Inline SVG (lightweight and customizable)
- Design: Custom minimalist architecture portfolio design

---

**Made for architects who value simplicity, elegance, and professionalism.**


