# Wireframes

## Global Elements

### Header & Navigation

#### Desktop (1024px+)
- **Sticky Header**: Yes, with a blur effect on scroll
- **Left**: Logo (Purple Bags)
- **Center**: Links (Home, Collections, Design Your Bag, Gallery, Material Guide, Printing Options, Contact)
- **Right**: Request Quote (Primary Button), Catalog Download (Secondary Button)

#### Tablet (768px - 1023px)
- **Sticky Header**: Yes
- **Left**: Logo
- **Right**: Hamburger Menu Icon, Request Quote icon
- **Menu Drawer**: Slides in from right, containing all navigation links

#### Mobile (320px - 767px)
- **Sticky Header**: Yes (reduced height)
- **Left**: Logo (smaller)
- **Right**: Hamburger Menu Icon
- **Menu Drawer**: Full screen, containing all navigation links + Catalog Download

### Footer
- **Layout**: 4-column (Desktop), 2-column (Tablet), 1-column stacked (Mobile)
- **Column 1**: Brand Logo, Tagline, Address, Social Media Links
- **Column 2**: Quick Links (Home, Collections, Design Your Bag, Gallery)
- **Column 3**: Information (Material Guide, Printing Options, Manufacturing Process, Pan India Delivery, FAQ)
- **Column 4**: Contact Info (Phone, Email, WhatsApp)
- **Bottom Bar**: Copyright, Privacy Policy, Terms of Service

### Global Floating Actions
- WhatsApp Floating Button (Bottom Right)
- Call Floating Button (Bottom Right, above WhatsApp)
- Back To Top Button (Bottom Right, appears on scroll)

---

## Home Page Layout

### Hero Section
#### Desktop
- **Layout**: Split layout (50/50) or Full-width background image with overlay
- **Content**:
  - Headline (H1): Custom Wedding Bags Crafted For Your Special Day
  - Subheadline: Elegance in Every Stitch.
  - CTA Group: Request Quote (Primary), Design Your Bag (Secondary)
- **Animation**: GSAP text reveal, Hero Image slow zoom

#### Tablet/Mobile
- **Layout**: Stacked
- **Content**: Image above text or Image background with darkened overlay.
- **CTA**: Full-width buttons on Mobile.

### Trust Metrics Banner
#### Desktop
- **Layout**: Horizontal flexbox banner below hero
- **Items**: 1000+ Customers | 7+ Years Experience | Pan India Delivery | Own Manufacturing Unit | MOQ 100+
#### Mobile
- **Layout**: 2-column grid or horizontal scrolling marquee

### About Preview
#### Desktop/Tablet
- **Layout**: 2 columns
- **Left**: High-quality photo of manufacturing or founder
- **Right**: "Crafting Wedding Bags With Passion" text, CTA "Read More"
#### Mobile
- **Layout**: Stacked (Image top, Text bottom)

### Collections Showcase
#### Desktop
- **Layout**: 3-column grid
- **Items**: Top categories (Jute, Cotton, Premium)
- **Card**: Image, Title, "Explore" link
#### Mobile
- **Layout**: Horizontal scroll slider (Swiper) or 1-column stack

### Why Choose Us
#### Desktop
- **Layout**: 4-column icon grid
- **Items**: Own Manufacturing, Customization, Delivery, Quality
#### Mobile
- **Layout**: 2-column grid

### Catalog Download Section
#### Desktop/Tablet/Mobile
- **Layout**: Full-width banner
- **Content**: "Download Our Complete Wedding Bag Catalog"
- **CTA**: "Download Product Catalog (PDF)"
- **Benefits listed**: Lead generation, easy sharing

### Testimonials
#### Desktop
- **Layout**: Swiper Carousel (3 items visible)
- **Card Structure**:
  - Rating (5 Stars)
  - Review Text
  - Customer Name
  - Wedding Type (e.g., Traditional Hindu Wedding)
  - City (e.g., Chennai)
#### Mobile
- **Layout**: Swiper Carousel (1 item visible)

---

## Collections Page Layout

### Hero Section
- **Content**: "Explore Our Wedding Bag Collections"
- **Breadcrumbs**: Home > Collections

### Filter and Search Bar
#### Desktop
- **Layout**: Horizontal bar above grid
- **Search**: Text input with magnifying glass icon
- **Filters**: Dropdowns for Material (Jute, Cotton, Fabric), Style (Traditional, Modern), Price Range
- **Behavior**: Instant filtering (no page reload)
#### Mobile
- **Layout**: "Filter & Sort" button that opens a bottom sheet with filter options

### Product Grid
#### Desktop
- **Layout**: 4-column grid
- **Card Design**:
  - High-res Image
  - Title
  - Material Tag
  - "Request Quote" Button appearing on hover
#### Tablet
- **Layout**: 2 or 3-column grid
#### Mobile
- **Layout**: 2-column grid
- **Card Design**: Tappable entire card

### Pagination Behavior
- "Load More" button at the bottom of the grid
- Appends items to the grid without page refresh

### Catalog Download CTA
- Sticky banner on the right sidebar or placed between grid rows (e.g., after 8 items)

---

## Design Your Bag Page (The USP)

### Desktop Layout
This is a complex 3-pane layout for maximum usability on desktop screens.

#### Left Sidebar: Product Selection (Width: 25%)
- **Tabs**: Bag Style, Material, Color, Templates
- **Bag Style**: Grid of bag shapes
- **Material**: Selectors for Jute, Cotton, Non-Woven
- **Color**: Color swatch grid
- **Templates**: Pre-designed layouts the user can start from

#### Center Canvas (Width: 50%)
- **Fabric.js Canvas Area**: Large interactive area showing the selected bag.
- **Controls**: Zoom in/out, Undo/Redo, Clear All
- **Interaction**: Drag and drop text and images within the safe print zone

#### Right Sidebar: Customization Controls (Width: 25%)
- **Accordion Panels**:
  - **Text Controls**: Input fields for Bride Name, Groom Name, Wedding Date. Font family selector, Font size, Font color picker.
  - **Upload Controls**: "Upload Logo", "Upload Custom Artwork" buttons. File format guidelines displayed.
  - **Layers**: Simple layer management (bring to front, send to back, delete).
- **Sticky Footer Action**: "Preview & Download", "Request Quote"

### Tablet Layout
- **Left Sidebar**: Collapsible drawer
- **Center Canvas**: Main view
- **Right Sidebar**: Collapsible drawer on the right

### Mobile Layout
- **Canvas**: Fixed at the top half of the screen
- **Controls**: Bottom sheet with horizontal scrolling tabs (Material, Color, Text, Upload)
- **Action**: Floating action bar at the very bottom "Request Quote"

---

## Gallery Page Layout

### Strategy
Showcase real customized wedding bags to build trust and inspire users.

### Categories
- Traditional Weddings
- Luxury Weddings
- Jute Bags
- Premium Bags
- Custom Printed Bags
- Manufacturing Photos

### Filter Behavior
#### Desktop
- Horizontal pill-shaped buttons for each category
- **Behavior**: Clicking a category instantly filters the masonry grid using animations (Framer Motion)
#### Mobile
- Scrollable horizontal list of pills

### Masonry Grid Layout
#### Desktop
- 4-column masonry grid (varying image heights)
#### Tablet
- 3-column masonry grid
#### Mobile
- 2-column masonry grid

### Lightbox Behavior
- Clicking an image opens LightGallery
- **Features**: Full-screen view, zoom, pan, next/previous arrows, close button
- **Caption**: Displays the bag details (e.g., "Jute Bag with Gold Screen Print - Chennai Wedding")

---

## Content Pages (Material Guide, Printing Options, Manufacturing, Pan India)

### Layout Structure
#### Desktop
- **Hero**: Page title and short description
- **Content**: Wide center column (max 800px) for readability
- **Side Panel**: Quick links or "Request Quote" CTA banner
#### Mobile
- **Content**: 100% width with appropriate padding

### Compare Materials Section (Material Guide)
- **Desktop**: 5-column comparison table (Material, Durability, Look, Cost, Best For)
- **Mobile**: Stacked cards for each material with comparison points listed

### Printing Comparison Section (Printing Options)
- **Desktop**: Side-by-side split layout (Image left, Explanation right) alternating down the page.
- **Mobile**: Stacked layout (Image top, Text bottom)

---

## Contact & Quote Page Layout

### Split Layout (Desktop)
#### Left Column: Contact Information
- Address details
- Phone numbers, Email
- Google Maps Embed
- Office Hours

#### Right Column: Quote Form
- **Fields**: Name, Phone, Email, Event Date, Quantity, Material Preference, Notes
- **Behavior**: Client-side validation (Zod). On success, display a success message and show a "Message us on WhatsApp instead?" button with pre-filled details.

### Mobile Layout
- Stacked: Form on top, Contact Info and Map below.

---

## Testimonials Strategy
To build maximum trust, reviews follow a structured format.

### Review Structure
- **Customer Name**: e.g., Priya & Rahul
- **City**: e.g., Chennai
- **Wedding Type**: e.g., Traditional South Indian Wedding
- **Review**: Detailed feedback about the quality and delivery.
- **Rating**: 5 Stars

### Display Locations
- Home Page Carousel
- Dedicated section on "Design Your Bag" page (to build confidence during customization)
- Bottom of "Collections" page

---

## Catalog Download Strategy

### Features
- Captures lead information (Optional Name/Email) before downloading, or offers direct download.
- PDF includes full collection, pricing tiers, and material guides.

### Display Locations
- Home Page Banner
- Sticky sidebar on Collections Page
- Footer link
- Exit-intent popup (optional)
