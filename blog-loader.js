/**
 * ════════════════════════════════════════════════════════════════
 *  blog-loader.js — OTOMATIS BACA ARTIKEL DARI FOLDER BLOG/
 * ════════════════════════════════════════════════════════════════
 *
 *  Cara Kerja:
 *  ──────────
 *  1. Script ini membaca semua file HTML di folder /Blog/
 *  2. Mengekstrak metadata dari <meta> tag di dalam <head>
 *  3. Menghasilkan file posts.js otomatis
 *
 *  Setup di HTML Artikel:
 *  ─────────────────────
 *  Tambahkan meta tag berikut di <head> setiap artikel:
 *
 *    <meta name="blog-id" content="1">
 *    <meta name="blog-title" content="Judul Artikel">
 *    <meta name="blog-category" content="Healthcare IT">
 *    <meta name="blog-catslug" content="healthcare-it">
 *    <meta name="blog-excerpt" content="Deskripsi singkat artikel...">
 *    <meta name="blog-image" content="https://...image.jpg">
 *    <meta name="blog-imagealt" content="Deskripsi gambar">
 *    <meta name="blog-date" content="26 Februari 2026">
 *    <meta name="blog-dateiso" content="2026-02-26">
 *    <meta name="blog-readtime" content="5 min read">
 *    <meta name="blog-tags" content="HIS, Nuclear Medicine, Simulation">
 *    <meta name="blog-featured" content="true"> <!-- OPSIONAL -->
 *
 * ════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Konfigurasi
const BLOG_DIR = path.join(__dirname, 'Blog'); // Folder tempat artikel HTML disimpan
const OUTPUT_FILE = path.join(__dirname, 'posts.js'); // Output posts.js

/**
 * Baca metadata dari file HTML
 */
function extractMetadata(filePath, htmlContent) {
  const $ = cheerio.load(htmlContent);
  const slug = path.basename(filePath);

  const metadata = {
    id: parseInt($ ('meta[name="blog-id"]').attr('content')) || 0,
    title: $('meta[name="blog-title"]').attr('content') || '',
    slug: slug,
    date: $('meta[name="blog-date"]').attr('content') || '',
    dateISO: $('meta[name="blog-dateiso"]').attr('content') || '',
    category: $('meta[name="blog-category"]').attr('content') || '',
    catSlug: $('meta[name="blog-catslug"]').attr('content') || '',
    excerpt: $('meta[name="blog-excerpt"]').attr('content') || '',
    image: $('meta[name="blog-image"]').attr('content') || '',
    imageAlt: $('meta[name="blog-imagealt"]').attr('content') || '',
    readTime: $('meta[name="blog-readtime"]').attr('content') || '5 min read',
    tags: ($('meta[name="blog-tags"]').attr('content') || '').split(',').map(t => t.trim()).filter(t => t),
    featured: $('meta[name="blog-featured"]').attr('content') === 'true' ? true : false
  };

  return metadata;
}

/**
 * Generate posts.js dari metadata yang dikumpulkan
 */
function generatePostsJS(posts) {
  // Sort by dateISO terbaru di atas
  posts.sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));

  // Pastikan hanya satu featured
  let hasFeatured = false;
  posts.forEach(p => {
    if (p.featured && !hasFeatured) {
      hasFeatured = true;
    } else {
      p.featured = false;
    }
  });

  // Generate array JavaScript
  let jsContent = `/**
 * ════════════════════════════════════════════════════════════════
 *  posts.js — AUTO-GENERATED DARI ARTIKEL DI FOLDER /Blog/
 *  Generated: ${new Date().toLocaleString('id-ID')}
 * ════════════════════════════════════════════════════════════════
 *
 *  ⚠️  FILE INI OTOMATIS DIHASILKAN
 *  Jangan edit manual! Edit file HTML artikel di /Blog/ dan
 *  jalankan: node blog-loader.js
 *
 * ════════════════════════════════════════════════════════════════
 */

const POSTS = [
`;

  posts.forEach((post, idx) => {
    jsContent += `
  /* Post ${idx + 1} */
  {
    id: ${post.id},
    title: ${JSON.stringify(post.title)},
    slug: ${JSON.stringify(post.slug)},
    date: ${JSON.stringify(post.date)},
    dateISO: ${JSON.stringify(post.dateISO)},
    category: ${JSON.stringify(post.category)},
    catSlug: ${JSON.stringify(post.catSlug)},
    excerpt: ${JSON.stringify(post.excerpt)},
    image: ${JSON.stringify(post.image)},
    imageAlt: ${JSON.stringify(post.imageAlt)},
    readTime: ${JSON.stringify(post.readTime)},
    tags: ${JSON.stringify(post.tags)},
    featured: ${post.featured}
  }${idx < posts.length - 1 ? ',' : ''}
`;
  });

  jsContent += `
];
`;

  return jsContent;
}

/**
 * Main function
 */
function main() {
  try {
    // Cek apakah folder Blog ada
    if (!fs.existsSync(BLOG_DIR)) {
      console.error(`❌ Error: Folder '${BLOG_DIR}' tidak ditemukan!`);
      process.exit(1);
    }

    // Baca semua file HTML di folder Blog
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.html'));

    if (files.length === 0) {
      console.warn(`⚠️  Tidak ada file HTML di folder ${BLOG_DIR}`);
      process.exit(0);
    }

    console.log(`📖 Ditemukan ${files.length} artikel`);

    // Extract metadata dari setiap file
    const posts = [];
    files.forEach(file => {
      const filePath = path.join(BLOG_DIR, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const metadata = extractMetadata(filePath, content);

        if (metadata.id && metadata.title) {
          posts.push(metadata);
          console.log(`  ✓ ${file} → ID: ${metadata.id}, Title: "${metadata.title}"`);
        } else {
          console.warn(`  ⚠️  ${file} → metadata tidak lengkap (skip)`);
        }
      } catch (err) {
        console.error(`  ❌ ${file} → ${err.message}`);
      }
    });

    if (posts.length === 0) {
      console.error(`❌ Tidak ada artikel dengan metadata lengkap!`);
      process.exit(1);
    }

    // Generate dan simpan posts.js
    const output = generatePostsJS(posts);
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log(`\n✅ posts.js berhasil dihasilkan! (${posts.length} artikel)\n`);

  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

main();
