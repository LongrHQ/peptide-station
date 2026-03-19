/**
 * Peptide Station — Google Sheet Product Seeder
 *
 * Usage (from packages/medsy-minimal):
 *   node scripts/seed-products.js
 *
 * Reads credentials from .env.local, clears the first sheet,
 * sets the header row, and inserts all 10 launch products.
 */

const fs = require('fs');
const path = require('path');

// ── Load .env.local ──────────────────────────────────────────
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌  .env.local not found at', envPath);
  process.exit(1);
}

fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) return;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  });

// ── Validate env vars ────────────────────────────────────────
const {
  GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  GOOGLE_SPREADSHEET_ID_PRODUCT,
} = process.env;

if (
  !GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL ||
  !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ||
  !GOOGLE_SPREADSHEET_ID_PRODUCT
) {
  console.error(
    '❌  Missing required env vars:\n' +
    '   GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL\n' +
    '   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY\n' +
    '   GOOGLE_SPREADSHEET_ID_PRODUCT'
  );
  process.exit(1);
}

// ── Product data ─────────────────────────────────────────────
const HEADERS = [
  'id', 'name', 'slug', 'tagline', 'description', 'long_description',
  'image', 'price', 'subscription_price', 'manufacturer', 'type',
  'quantity', 'dosage', 'substance', 'benefits', 'how_to_use', 'warnings',
  'badge', 'featured', 'in_stock', 'research_summary', 'coa_url',
  'related_products', 'category_ids', 'meta_title', 'meta_description',
];

const PRODUCTS = [
  {
    id: '1',
    name: 'BPC-157 Pen',
    slug: 'bpc-157-pen',
    tagline: "The world's most studied recovery peptide. In a pen.",
    description: 'Pre-mixed BPC-157 pen for gut healing, tendon repair, and inflammation. No syringes. No mixing. Just dial and inject.',
    long_description: "Body Protection Compound 157 (BPC-157) is a synthetic peptide derived from a protein found in the stomach. Research suggests it may support healing of tendons, ligaments, gut tissue, and muscles. With 301,000+ monthly US searches, it's the most sought-after peptide in the biohacking community. Our pre-mixed pen delivers a precise dose every time — no reconstitution required.",
    image: '/images/products/bpc-157-pen.jpg',
    price: '59.99',
    subscription_price: '49.99',
    manufacturer: 'Peptide Station',
    type: 'peptide-pen',
    quantity: '1 pen (5mg cartridge)',
    dosage: '250–500mcg/day subcutaneous',
    substance: 'BPC-157 (Body Protection Compound 157)',
    benefits: 'Gut & GI tract healing|Tendon & ligament repair|Anti-inflammatory|Wound healing & tissue repair|Joint pain relief',
    how_to_use: 'Dial your dose (start at 250mcg)|Remove needle cap|Pinch skin at injection site|Insert needle at 45° angle|Inject slowly and remove|Replace cap and refrigerate',
    warnings: 'For research use only. Not for human consumption. WADA prohibited — not for competitive athletes. Keep refrigerated at 2–8°C.',
    badge: 'Most Popular',
    featured: 'TRUE',
    in_stock: 'TRUE',
    research_summary: 'BPC-157 has been studied in numerous animal models showing accelerated healing of tendons and GI tissue. Human clinical data is limited; most evidence is preclinical.',
    coa_url: '/coa/bpc-157-batch-001.pdf',
    related_products: '2,7,8',
    category_ids: '1,2',
    meta_title: 'BPC-157 Pen | Pre-Mixed Peptide | Peptide Station',
    meta_description: 'BPC-157 pen — the #1 recovery peptide. Pre-mixed and precision-dosed. Free shipping on orders over $100.',
  },
  {
    id: '2',
    name: 'TB-500 Pen',
    slug: 'tb-500-pen',
    tagline: 'Tissue repair. Accelerated.',
    description: "Pre-mixed TB-500 (Thymosin Beta-4 Fragment) pen for injury recovery and tissue repair. The athlete's recovery peptide.",
    long_description: 'TB-500 is a synthetic fragment of Thymosin Beta-4, a protein naturally produced in the body that plays a key role in tissue repair and regeneration. Widely used in the biohacking and sports recovery community, TB-500 is most commonly stacked with BPC-157 for a comprehensive healing protocol.',
    image: '/images/products/tb-500-pen.jpg',
    price: '64.99',
    subscription_price: '54.99',
    manufacturer: 'Peptide Station',
    type: 'peptide-pen',
    quantity: '1 pen (5mg cartridge)',
    dosage: '2–2.5mg twice weekly subcutaneous',
    substance: 'TB-500 (Thymosin Beta-4 Fragment)',
    benefits: 'Injury recovery & healing|Muscle repair|Reduced inflammation|Joint & tendon support|Improved flexibility',
    how_to_use: 'Dial your dose (2mg recommended)|Remove needle cap|Pinch skin at injection site|Insert needle at 45° angle|Inject slowly and remove|Replace cap and refrigerate',
    warnings: 'For research use only. Not for human consumption. Keep refrigerated at 2–8°C.',
    badge: '',
    featured: 'TRUE',
    in_stock: 'TRUE',
    research_summary: 'TB-500 has demonstrated tissue repair properties in animal models. Commonly studied for musculoskeletal recovery. Human data is limited.',
    coa_url: '/coa/tb-500-batch-001.pdf',
    related_products: '1,7,8',
    category_ids: '1,2',
    meta_title: 'TB-500 Pen | Recovery Peptide | Peptide Station',
    meta_description: 'TB-500 pre-mixed pen — the injury recovery peptide. Stack with BPC-157 for the ultimate healing protocol.',
  },
  {
    id: '3',
    name: 'GHK-Cu Pen',
    slug: 'ghk-cu-pen',
    tagline: 'The copper peptide rewriting skin science.',
    description: 'GHK-Cu (Copper Peptide) pen for skin regeneration and hair growth. The fastest-growing peptide in the US biohacking market.',
    long_description: 'GHK-Cu (Glycine-Histidine-Lysine-Copper) is a naturally occurring copper complex with extensive research backing its role in skin regeneration, collagen synthesis, and hair follicle stimulation. It has seen explosive growth in the US biohacking community (5x search volume increase in 12 months), particularly popular with the female longevity audience.',
    image: '/images/products/ghk-cu-pen.jpg',
    price: '74.99',
    subscription_price: '62.99',
    manufacturer: 'Peptide Station',
    type: 'peptide-pen',
    quantity: '1 pen (50mg cartridge)',
    dosage: '1–2mg/day subcutaneous',
    substance: 'GHK-Cu (Glycine-Histidine-Lysine-Copper Complex)',
    benefits: 'Skin regeneration & collagen synthesis|Hair follicle stimulation|Anti-aging & wound healing|Antioxidant protection|Improved skin elasticity & tone',
    how_to_use: 'Dial your dose (1mg recommended starting dose)|Remove needle cap|Pinch skin at injection site|Insert needle at 45° angle|Inject slowly and remove|Replace cap and refrigerate',
    warnings: 'For research use only. Not for human consumption. Keep refrigerated at 2–8°C.',
    badge: 'Trending',
    featured: 'TRUE',
    in_stock: 'TRUE',
    research_summary: 'GHK-Cu has one of the strongest evidence bases of any cosmetic peptide with extensive research on collagen stimulation and skin repair. Multiple human studies exist for topical applications.',
    coa_url: '/coa/ghk-cu-batch-001.pdf',
    related_products: '4,8',
    category_ids: '3,4',
    meta_title: 'GHK-Cu Pen | Copper Peptide | Anti-Aging | Peptide Station',
    meta_description: "GHK-Cu copper peptide pen — skin regeneration and hair growth. Pre-mixed and precision-dosed. The biohacker's favourite skin peptide.",
  },
  {
    id: '4',
    name: 'Sermorelin Pen',
    slug: 'sermorelin-pen',
    tagline: 'Your natural growth hormone. Optimised.',
    description: 'Sermorelin stimulates natural GH production — better sleep, fat loss, and vitality. The accessible alternative to synthetic HGH.',
    long_description: 'Sermorelin is a synthetic analogue of Growth Hormone-Releasing Hormone (GHRH). Unlike synthetic HGH, Sermorelin stimulates the pituitary gland to produce growth hormone naturally. Research suggests benefits including improved sleep quality, body composition, and recovery. Telehealth companies charge $200–400/month; Peptide Station offers the same compound at a fraction of the cost.',
    image: '/images/products/sermorelin-pen.jpg',
    price: '79.99',
    subscription_price: '64.99',
    manufacturer: 'Peptide Station',
    type: 'peptide-pen',
    quantity: '1 pen (2mg cartridge)',
    dosage: '200–500mcg/day subcutaneous before sleep',
    substance: 'Sermorelin Acetate (GHRH analogue)',
    benefits: 'Stimulates natural GH production|Improved sleep quality & recovery|Body composition & fat loss|Anti-aging & vitality|More physiological than synthetic HGH',
    how_to_use: 'Dial your dose (200mcg recommended start)|Remove needle cap|Inject subcutaneously before sleep (GH release is nocturnal)|Insert needle at 45° angle|Inject slowly and remove|Replace cap and refrigerate',
    warnings: 'For research use only. Not for human consumption. Inject before sleep for optimal GH pulse. Keep refrigerated at 2–8°C.',
    badge: '',
    featured: 'TRUE',
    in_stock: 'TRUE',
    research_summary: 'Sermorelin has an FDA approval history (Geref) and substantial clinical literature. Research supports GH-stimulating effects and improved sleep quality.',
    coa_url: '/coa/sermorelin-batch-001.pdf',
    related_products: '5,6,8',
    category_ids: '2,4',
    meta_title: 'Sermorelin Pen | GH Secretagogue | Peptide Station',
    meta_description: 'Sermorelin pen — stimulate natural growth hormone production. Better sleep and anti-aging at a fraction of telehealth prices.',
  },
  {
    id: '5',
    name: 'Ipamorelin Pen',
    slug: 'ipamorelin-pen',
    tagline: 'Clean GH release. No cortisol spike. No hunger surge.',
    description: 'Ipamorelin is the precision growth hormone secretagogue. Selective GH release with minimal side effects — ideal for body composition and longevity.',
    long_description: 'Ipamorelin is a selective Growth Hormone secretagogue and ghrelin receptor agonist. Unlike other GH-releasing peptides, it stimulates GH release without significantly increasing cortisol or prolactin — making it one of the cleanest GH peptides available. Most commonly stacked with CJC-1295.',
    image: '/images/products/ipamorelin-pen.jpg',
    price: '54.99',
    subscription_price: '44.99',
    manufacturer: 'Peptide Station',
    type: 'peptide-pen',
    quantity: '1 pen (2mg cartridge)',
    dosage: '200–300mcg 2–3x daily subcutaneous',
    substance: 'Ipamorelin (selective GH secretagogue)',
    benefits: 'Selective GH release without cortisol spike|No excessive hunger|Body composition & lean muscle|Improved recovery & sleep|Stack with CJC-1295 for enhanced effect',
    how_to_use: 'Dial your dose (200mcg recommended start)|Remove needle cap|Inject subcutaneously (morning and/or pre-sleep)|Insert needle at 45° angle|Inject slowly and remove|Replace cap and refrigerate',
    warnings: 'For research use only. Not for human consumption. Keep refrigerated at 2–8°C.',
    badge: '',
    featured: 'FALSE',
    in_stock: 'TRUE',
    research_summary: 'Ipamorelin has been studied for selective GH-releasing properties with a favourable side effect profile. Often used in combination with GHRH peptides like CJC-1295.',
    coa_url: '/coa/ipamorelin-batch-001.pdf',
    related_products: '6,4,8',
    category_ids: '2,4',
    meta_title: 'Ipamorelin Pen | GH Secretagogue | Peptide Station',
    meta_description: 'Ipamorelin pre-mixed pen — clean GH release with no cortisol spike. Stack with CJC-1295 for best results.',
  },
  {
    id: '6',
    name: 'CJC-1295 Pen',
    slug: 'cjc-1295-pen',
    tagline: 'Sustained GH release. Extended half-life.',
    description: 'CJC-1295 extends growth hormone-releasing hormone signalling. Stack with Ipamorelin for the most studied GH protocol in biohacking.',
    long_description: 'CJC-1295 (without DAC) is a modified GHRH analogue with an extended half-life. It amplifies the body\'s natural GH pulse — particularly effective when combined with Ipamorelin, which acts synergistically to maximise GH release while minimising side effects. The CJC-1295/Ipamorelin stack is the most widely used GH optimisation protocol in the biohacking community.',
    image: '/images/products/cjc-1295-pen.jpg',
    price: '59.99',
    subscription_price: '49.99',
    manufacturer: 'Peptide Station',
    type: 'peptide-pen',
    quantity: '1 pen (2mg cartridge)',
    dosage: '100–300mcg 2–3x weekly subcutaneous',
    substance: 'CJC-1295 (modified GHRH analogue — no DAC)',
    benefits: 'Extended GH-releasing hormone signalling|Synergistic with Ipamorelin|Body composition & anti-aging|Improved sleep and recovery|More sustained GH pulse than native GHRH',
    how_to_use: 'Dial your dose (100mcg recommended start)|Stack with Ipamorelin for best results|Inject subcutaneously|Insert needle at 45° angle|Inject slowly and remove|Replace cap and refrigerate',
    warnings: 'For research use only. Not for human consumption. Monitor for water retention at higher doses. Keep refrigerated at 2–8°C.',
    badge: '',
    featured: 'FALSE',
    in_stock: 'TRUE',
    research_summary: 'CJC-1295 has been studied for extended GHRH signalling properties. Research supports GH-releasing activity with a prolonged half-life. Most clinical research involves combination with ghrelin mimetics.',
    coa_url: '/coa/cjc-1295-batch-001.pdf',
    related_products: '5,4,8',
    category_ids: '2,4',
    meta_title: 'CJC-1295 Pen | GHRH Analogue | Peptide Station',
    meta_description: 'CJC-1295 pre-mixed pen — extended GH signalling. Stack with Ipamorelin for the ultimate GH protocol.',
  },
  {
    id: '7',
    name: 'Recovery Stack',
    slug: 'recovery-stack',
    tagline: 'The Complete Recovery Protocol. Two pens. One mission.',
    description: "BPC-157 + TB-500 — the #1 healing stack in the biohacking community. Two pre-mixed pens, the most discussed protocol on r/Peptides.",
    long_description: 'The BPC-157 + TB-500 Recovery Stack is the most popular peptide protocol in the biohacking community. BPC-157 addresses gut integrity and tendon/ligament healing at the site of injury. TB-500 promotes systemic tissue repair and reduces inflammation. Together they address healing from multiple angles — local and systemic. Includes one pen of each compound.',
    image: '/images/products/recovery-stack.jpg',
    price: '119.99',
    subscription_price: '99.99',
    manufacturer: 'Peptide Station',
    type: 'bundle',
    quantity: '2 pens (BPC-157 5mg + TB-500 5mg)',
    dosage: 'BPC-157: 250–500mcg/day | TB-500: 2–2.5mg twice weekly',
    substance: 'BPC-157 (Body Protection Compound 157) + TB-500 (Thymosin Beta-4 Fragment)',
    benefits: 'Comprehensive tissue healing (local + systemic)|Gut & GI tract healing|Musculoskeletal recovery|Reduced inflammation|#1 stack on r/Peptides (745K members)',
    how_to_use: 'Take BPC-157 daily (250mcg) subcutaneously|Take TB-500 twice weekly (2mg) systemically|Typical protocol: 8–12 weeks|Inject subcutaneously|Refrigerate both pens at 2–8°C',
    warnings: 'For research use only. Not for human consumption. BPC-157 is WADA prohibited — not for competitive athletes. Keep refrigerated at 2–8°C.',
    badge: 'Best Value',
    featured: 'TRUE',
    in_stock: 'TRUE',
    research_summary: 'BPC-157 and TB-500 have complementary mechanisms — BPC-157 acts locally at injury sites while TB-500 promotes systemic healing. Both have substantial preclinical evidence.',
    coa_url: '/coa/recovery-stack-batch-001.pdf',
    related_products: '1,2,8',
    category_ids: '1,2',
    meta_title: 'Recovery Stack | BPC-157 + TB-500 Bundle | Peptide Station',
    meta_description: 'The BPC-157 + TB-500 Recovery Stack — the #1 healing protocol in biohacking. Two pre-mixed pens. Save vs buying separately.',
  },
  {
    id: '8',
    name: 'Starter Kit',
    slug: 'starter-kit',
    tagline: 'Everything you need to start. Nothing you don\'t.',
    description: 'The Peptide Station Starter Kit: branded pen + first cartridge of your choice + needles, swabs, sharps bin, and guide.',
    long_description: 'The Starter Kit removes every barrier to starting your peptide protocol. Includes the Peptide Station branded metal pen, your first cartridge (choice of BPC-157, TB-500, GHK-Cu, or Sermorelin), 20 sterile 28G needle tips, alcohol swabs, compact sharps bin, and a beautifully designed dosing guide. Gift-ready in a premium matte box.',
    image: '/images/products/starter-kit.jpg',
    price: '89.99',
    subscription_price: '',
    manufacturer: 'Peptide Station',
    type: 'starter-kit',
    quantity: '1 pen device + 1 cartridge (choice) + accessories',
    dosage: 'See chosen peptide cartridge',
    substance: "Customer's choice of peptide",
    benefits: 'Includes everything needed to start|Branded metal pen (premium feel)|20x sterile 28G needle tips|Alcohol swabs & compact sharps bin|Plain-English dosing guide with QR tutorial|Gift-ready premium matte packaging',
    how_to_use: 'Choose your cartridge at checkout|Load cartridge into pen|Follow the included quick-start guide|Scan QR code for video tutorial|Dial dose and inject subcutaneously|Refrigerate loaded pen at 2–8°C',
    warnings: 'For research use only. Not for human consumption. Read the specific warnings for your chosen peptide cartridge. Keep refrigerated at 2–8°C.',
    badge: 'Start Here',
    featured: 'TRUE',
    in_stock: 'TRUE',
    research_summary: 'See individual peptide cartridge pages for research summaries.',
    coa_url: '',
    related_products: '1,2,3,4',
    category_ids: '5',
    meta_title: 'Peptide Starter Kit | Everything to Start | Peptide Station',
    meta_description: 'The Peptide Station Starter Kit — pen, first cartridge, needles, swabs, sharps bin & guide. Everything to start your protocol.',
  },
  {
    id: '9',
    name: 'Pen Device',
    slug: 'pen-device',
    tagline: 'The pen that changes how you think about peptides.',
    description: 'The Peptide Station precision pen. Metal body. 60-unit dial. Compatible with all Peptide Station cartridges.',
    long_description: 'The Peptide Station pen is a reusable metal-bodied insulin-style pen for subcutaneous peptide delivery. The 60-unit dial delivers precise doses in 0.01mL increments. Compatible with all Peptide Station cartridges and standard 3mL pen cartridges. Sold without a cartridge — for customers adding a second pen or who already have cartridges.',
    image: '/images/products/pen-device.jpg',
    price: '34.99',
    subscription_price: '',
    manufacturer: 'Peptide Station',
    type: 'accessory',
    quantity: '1 pen device (cartridge not included)',
    dosage: 'N/A',
    substance: 'N/A',
    benefits: 'Precision 60-unit dial (0.01mL increments)|Durable metal body — premium feel|Compatible with all Peptide Station cartridges|Accepts standard 28–33G pen needles|Reusable — reduces waste vs disposable pens',
    how_to_use: 'Load compatible cartridge|Attach needle (28–33G pen needle recommended)|Dial dose|Inject subcutaneously|Remove needle after injection|Store refrigerated when cartridge loaded',
    warnings: 'Always use a new sterile needle for each injection. Dispose of needles safely in a sharps bin.',
    badge: '',
    featured: 'FALSE',
    in_stock: 'TRUE',
    research_summary: 'N/A',
    coa_url: '',
    related_products: '8,1,2,3,4',
    category_ids: '5',
    meta_title: 'Peptide Pen Device | Precision Injector | Peptide Station',
    meta_description: 'The Peptide Station precision pen — metal body and 60-unit dial. Compatible with all Peptide Station cartridges. Reusable and premium.',
  },
  {
    id: '10',
    name: 'Cartridge Refill Pack',
    slug: 'cartridge-refill-pack',
    tagline: 'Keep your protocol running. Never run out.',
    description: '3x pre-mixed peptide cartridges — your choice of compound. The most cost-effective way to continue your ongoing protocol.',
    long_description: 'The Cartridge Refill Pack contains 3 pre-mixed peptide cartridges of your chosen compound, ready to load into any Peptide Station pen. Each cartridge is third-party tested for purity, pre-mixed with bacteriostatic water, and cold-shipped. Subscribe and save an additional $30/month.',
    image: '/images/products/cartridge-refill.jpg',
    price: '159.99',
    subscription_price: '129.99',
    manufacturer: 'Peptide Station',
    type: 'refill-pack',
    quantity: "3 cartridges (customer's choice of peptide)",
    dosage: 'See chosen peptide',
    substance: "Customer's choice of peptide",
    benefits: '3 pre-mixed cartridges per pack|Most cost-effective per-dose price|Same third-party tested purity|Cold-shipped for integrity|Subscribe for maximum savings',
    how_to_use: 'Choose your peptide at checkout|Load cartridges into Peptide Station pen|Follow dosing guide for chosen compound|Refrigerate unused cartridges at 2–8°C|Dispose of used cartridges responsibly',
    warnings: 'For research use only. Not for human consumption. Keep refrigerated at 2–8°C. See individual compound warnings.',
    badge: 'Best Price',
    featured: 'FALSE',
    in_stock: 'TRUE',
    research_summary: 'See individual peptide pages for compound-specific research.',
    coa_url: '',
    related_products: '1,2,3,4,9',
    category_ids: '5',
    meta_title: 'Peptide Cartridge Refill Pack (x3) | Peptide Station',
    meta_description: '3x pre-mixed peptide cartridges — same third-party tested quality. Subscribe and save $30/month. Keep your protocol running.',
  },
];

// ── Seed ─────────────────────────────────────────────────────
async function seed() {
  const { JWT } = require('google-auth-library');
  const { GoogleSpreadsheet } = require('google-spreadsheet');

  console.log('🔑  Authenticating with Google Sheets...');

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID_PRODUCT, serviceAccountAuth);
  await doc.loadInfo();

  console.log(`📄  Connected to: "${doc.title}"`);

  const sheet = doc.sheetsByIndex[0];
  console.log(`📊  Using sheet: "${sheet.title}"`);

  // Clear existing content
  await sheet.clear();
  console.log('🗑   Sheet cleared.');

  // Set header row
  await sheet.setHeaderRow(HEADERS);
  console.log('📋  Headers written:', HEADERS.length, 'columns');

  // Add all products
  await sheet.addRows(PRODUCTS);
  console.log(`✅  ${PRODUCTS.length} products inserted successfully.`);
  console.log('\n🎉  Sheet is ready. Restart your Next.js dev server to see products.');
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err.message || err);
  process.exit(1);
});
