// CONSTANTS
export const CURRENCY = '$';

// ──────────────────────────────────────────────────────────────────
// Google Sheet → Product field map
//
// Column order must match the Google Sheet header row exactly.
// Multi-value fields (benefits, how_to_use, warnings, related_products)
// use pipe | as separator in the sheet, parsed at render time.
// ──────────────────────────────────────────────────────────────────
export const productKeys = [
  'id',                 // Unique numeric ID
  'name',               // Display name
  'slug',               // URL slug e.g. bpc-157-pen
  'tagline',            // One-line hero statement for product page
  'description',        // Short description (2 sentences — used in card)
  'long_description',   // Full product page description
  'image',              // Primary image path e.g. /images/bpc-157-pen.jpg
  'price',              // Single purchase price (USD, no $ sign)
  'subscription_price', // Monthly subscription price (empty if N/A)
  'manufacturer',       // Always "Peptide Station" for now
  'type',               // peptide-pen | bundle | starter-kit | accessory | refill-pack
  'quantity',           // e.g. "1 pen (5mg cartridge)"
  'dosage',             // e.g. "250–500mcg/day subcutaneous"
  'substance',          // Active compound(s)
  'benefits',           // Pipe-separated bullet points
  'how_to_use',         // Pipe-separated numbered steps
  'warnings',           // Pipe-separated warning statements
  'badge',              // Optional chip: "Most Popular", "Trending", "Best Value" etc.
  'featured',           // TRUE | FALSE — shown in featured section
  'in_stock',           // TRUE | FALSE
  'research_summary',   // Brief research context (1–2 sentences)
  'coa_url',            // Path to Certificate of Analysis PDF
  'related_products',   // Comma-separated product IDs
  'category_ids',       // Comma-separated category IDs
  'meta_title',         // SEO <title>
  'meta_description',   // SEO meta description
];

// ──────────────────────────────────────────────────────────────────
// Product categories (for sidebar filtering)
// ──────────────────────────────────────────────────────────────────
export const categories = [
  { id: '1', name: 'Recovery', slug: 'recovery' },
  { id: '2', name: 'Anti-Aging', slug: 'anti-aging' },
  { id: '3', name: 'Skin & Hair', slug: 'skin-hair' },
  { id: '4', name: 'Growth Hormone', slug: 'growth-hormone' },
  { id: '5', name: 'Kits & Accessories', slug: 'kits-accessories' },
];
