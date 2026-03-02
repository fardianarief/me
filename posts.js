/**
 * ════════════════════════════════════════════════════════════════
 *  posts.js — CENTRAL BLOG POSTS DATA
 *  Digunakan oleh: index.html, blog.html
 * ════════════════════════════════════════════════════════════════
 *
 *  📖 CARA KERJA SISTEM:
 *  ─────────────────────
 *  Sistem ini menggunakan metadata yang tertanam di file HTML artikel.
 *  Script 'blog-loader.js' membaca metadata tersebut dan menghasilkan
 *  array POSTS secara otomatis.
 *
 *  ATAU untuk menambah manual (tanpa blog-loader):
 *  1. Buat file HTML artikel di folder Blog/
 *  2. Tambahkan objek baru di array POSTS di bawah (terbaru DI ATAS)
 *  3. Simpan — artikel langsung muncul di blog.html & index.html
 *
 *  FIELD WAJIB:
 *    id              → Nomor unik (increment)
 *    title           → Judul artikel
 *    slug            → Nama file HTML artikel (contoh: "artikel-1.html")
 *    date            → Tanggal tampil (contoh: "26 Februari 2026")
 *    dateISO         → Format ISO (YYYY-MM-DD) untuk sorting
 *    category        → Kategori artikel
 *    catSlug         → URL-safe slug kategori (lihat daftar valid di bawah)
 *    excerpt         → Deskripsi singkat (1-2 kalimat)
 *    image           → URL gambar thumbnail (minimal 600x400px)
 *    imageAlt        → Deskripsi gambar untuk accessibility
 *    readTime        → Estimasi waktu baca (contoh: "5 min read")
 *    tags            → Array tag (max 5, paling penting 2-3)
 *
 *  FIELD OPSIONAL:
 *    featured        → true/false (hanya SATU artikel boleh featured)
 *    author          → Nama penulis (jika berbeda dengan profil utama)
 *    views           → Jumlah views (untuk sorting future use)
 *
 *  KATEGORI VALID (catSlug):
 *    "healthcare-it"  → Healthcare IT
 *    "training"       → Training
 *    "career"         → Career
 *    "data"           → Data & Analytics
 * ════════════════════════════════════════════════════════════════
 */

const POSTS = [

  /* ─────────────────────────────────────────────────────────────
     POST 1 — TERBARU & FEATURED (⭐)
  ───────────────────────────────────────────────────────────── */
  {
    id: 1,
    title: "Simulasi HIS di Unit Nuclear Medicine: Tantangan & Pelajaran Nyata dari Lapangan",
    slug: "Simulasi-HIS-di-Unit-Nuclear-Medicine.html",
    date: "26 Februari 2026",
    dateISO: "2026-02-26",
    category: "Healthcare IT",
    catSlug: "healthcare-it",
    excerpt: "Unit Nuclear Medicine adalah salah satu unit paling kompleks di rumah sakit — tidak hanya dari sisi klinis, tetapi juga dari sisi alur kerja sistem informasi. Bagaimana proses simulasi HIS berlangsung di sana, apa tantangan nyata yang dihadapi, dan pelajaran apa yang dapat diterapkan ke unit lain?",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxm8gPKbnLjytmHn4m3wNHwFVWdve-d-pfn_bZsCKloaF5zM_Cgba0OHBq8CPXxCitEylhLNhJsGFdD5My3y8gGFW0Q7Xyi2WlVM8Ip9_KsBidqyhKwsfm27pRd-4fmKVZnrnBb0YT-aQZhNd9Pi6IBCZT0Q0XjsFtAhvN6rqX7XOM32OHK8dS-pyHVM7X/s16000/1000111553.jpg",
    imageAlt: "Simulasi HIS Nuclear Medicine",
    readTime: "5 min read",
    tags: ["HIS", "Nuclear Medicine", "Simulation", "Workflow"],
    featured: true
  },

  /* ─────────────────────────────────────────────────────────────
     POST 2
  ───────────────────────────────────────────────────────────── */
  {
    id: 2,
    title: "HIS Training untuk New User: Strategi Efektif Onboarding Tenaga Kesehatan",
    slug: "HIS-Training-untuk-New-User.html",
    date: "23 Januari 2026",
    dateISO: "2026-01-23",
    category: "Training",
    catSlug: "training",
    excerpt: "Mendidik tenaga kesehatan menggunakan sistem baru bukan sekadar soal demo fitur. Ini tentang membangun kepercayaan, menjawab ketakutan, dan menciptakan pengalaman belajar yang relevan. Temukan pendekatan yang terbukti efektif untuk membuat new user merasa siap dan percaya diri menggunakan HIS sejak hari pertama.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsPSSbof0vVS_grnWevqGhKx5P2mTrx6TTqZdn6ECO-x9ga21qt4RuIyFm_CS6xt7frQYTAXf0xLrXGnre_QJG4RmZaa2T61z_9D9p5DDYG-q1zP-et5FcllDbiNVTpSB-mbennH2Ff2AuwmtPg0bTnDrzrbXu5IGHq4TbReS3gI6qmHIH35ZSverStz6G/s16000/1000111550.jpg",
    imageAlt: "HIS Training New User",
    readTime: "4 min read",
    tags: ["Training", "Onboarding", "HIS"],
    featured: false
  },

  /* ─────────────────────────────────────────────────────────────
     POST 3
  ───────────────────────────────────────────────────────────── */
  {
    id: 3,
    title: "Dari Perawat ke HIS Officer: Perjalanan yang Tidak Pernah Saya Rencanakan",
    slug: "Dari-Perawat-ke-HIS-Officer.html",
    date: "10 November 2025",
    dateISO: "2025-11-10",
    category: "Career",
    catSlug: "career",
    excerpt: "Transisi karier dari bangsal anak ke ruang sistem informasi bukan sebuah rencana matang — itu adalah serangkaian keputusan kecil yang didorong rasa ingin tahu. Apa yang membuat seorang perawat memilih jalan ini? Dan apa yang perlu disiapkan oleh siapapun yang ingin melakukan hal serupa?",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjU2QE1pIt0TQwBYnxwDBnxOxAxSK_u6MPxSL1axGn4ThNladAM7xgzxXV5tcxrddNnKQEtsm5ggqfr9dLRQdU6kmpT98d7feZnby4Yw-PsorRtZEO2QQQiYwNVZAAGFrWMcF9seYcvGvyiXGI_5iSSssMe0OkbR6zTI5uS31-AYSzbwudRinTp4fXx2m1c/s16000/Training%20HIS%203.jpg",
    imageAlt: "Dari Perawat ke HIS Officer",
    readTime: "6 min read",
    tags: ["Career", "Story", "Nursing"],
    featured: false
  },

  /* ─────────────────────────────────────────────────────────────
     POST 4
  ───────────────────────────────────────────────────────────── */
  {
    id: 4,
    title: "Data-Driven Decision Making di Rumah Sakit: Bukan Hanya Urusan IT",
    slug: "Data-Driven-Decision-di-Rumah-Sakit.html",
    date: "15 September 2025",
    dateISO: "2025-09-15",
    category: "Data & Analytics",
    catSlug: "data",
    excerpt: "Keputusan berbasis data bukan milik eksklusif tim teknologi. Di lingkungan klinis, data adalah alat yang seharusnya ada di tangan setiap kepala ruangan, manajer keperawatan, hingga dokter spesialis. Bagaimana membangun budaya ini di rumah sakit yang belum siap?",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwPxXlCVnq1rQOkPIvc4Yt6GzyX1siNkmitFcAmFwp2PAOmf0GGYH6nURHWoHBhWC8nyTqfBYvNSJ2rRy_j_mbUet8lojmmh6gj8CKEgsnHWrUSBWuW8FYHMdvNpaxRP-zkHENOJj3eU3UubeTPPGsc9DDWR4l41aJzwCs8t0XcSjPSZbKuVyQsoBV9o27/s16000/training%20HIS%201.jpg",
    imageAlt: "Data-Driven Healthcare",
    readTime: "7 min read",
    tags: ["Data", "BI", "Healthcare"],
    featured: false
  },

  /* ─────────────────────────────────────────────────────────────
     POST 5
  ───────────────────────────────────────────────────────────── */
  {
    id: 5,
    title: "EMR untuk Nursing: Mengapa Implementasi Sering Gagal dan Cara Memperbaikinya",
    slug: "EMR-untuk-Nursing.html",
    date: "8 Juli 2025",
    dateISO: "2025-07-08",
    category: "Healthcare IT",
    catSlug: "healthcare-it",
    excerpt: "Banyak rumah sakit yang sudah memiliki EMR tetapi perawatnya masih menggunakan kertas. Bukan karena sistemnya buruk — melainkan karena proses implementasinya tidak menyentuh kebutuhan pengguna yang sesungguhnya. Artikel ini membahas akar masalah dan strategi yang benar-benar bekerja.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCZlS8WcJ7mNQ9vEEBPztowhGMTs6ZctT2h2LTe0xejryn6dNnJts_caUiOdVd4e533ml4je-MU8RfPHVazqSFqmPYRbS3fF8gJAQHxCUBOq52fX-5-qFQfJt3sXfkp9BtppEPFXcKtyNj8I6uzhnfVPi3-k-YaFaBGfdB3QuAPa3aCUL0ZEQkHAjoFuwo/s16000/training%20HIS%202.jpg",
    imageAlt: "EMR Nursing Workflow",
    readTime: "5 min read",
    tags: ["EMR", "Nursing", "Implementation"],
    featured: false
  }

];

/**
 * ════════════════════════════════════════════════════════════════
 * TEMPLATE UNTUK ARTIKEL BARU (Copy dan edit)
 * ════════════════════════════════════════════════════════════════

  ,{
    id: 6,
    title: "Judul Artikel Anda di Sini",
    slug: "Nama-File-Artikel.html",
    date: "1 Maret 2026",
    dateISO: "2026-03-01",
    category: "Healthcare IT",
    catSlug: "healthcare-it",
    excerpt: "Deskripsi singkat artikel (1-2 kalimat yang menarik pembaca)...",
    image: "https://link-gambar-anda.com/image.jpg",
    imageAlt: "Deskripsi singkat untuk gambar",
    readTime: "5 min read",
    tags: ["Tag1", "Tag2", "Tag3"],
    featured: false
  }

 * ════════════════════════════════════════════════════════════════
 */
