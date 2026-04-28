'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import QRCode from 'qrcode';
import { JournalArticle, SITE_URL } from '@/data/journal';

interface JournalPageProps {
  article: JournalArticle;
}

export function JournalPage({ article }: JournalPageProps) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrBottomRef = useRef<HTMLCanvasElement>(null);
  const articleUrl = `${SITE_URL}/journal/${article.slug}`;

  // Generate QR codes on both canvases
  useEffect(() => {
    const opts = {
      width: 160,
      margin: 2,
      color: { dark: '#1A1A18', light: '#FFFFFF' },
    };

    if (qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, articleUrl, opts);
    }
    if (qrBottomRef.current) {
      QRCode.toCanvas(qrBottomRef.current, articleUrl, { ...opts, width: 200 });
    }
  }, [articleUrl, shareOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = articleUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `frames-and-truth-${article.slug}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${article.title} — Frames & Truth by Studio 74`
    )}&url=${encodeURIComponent(articleUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${article.title} — Frames & Truth\n${articleUrl}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
  };

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">

      {/* Article Content */}
      <main className="pt-28 md:pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">

          {/* Inline Action Bar — sits below the global ViewportGrid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-between mb-16 relative"
          >
            <Link
              href="/"
              className="font-label text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-surface)] opacity-50 hover:opacity-100 hover:text-[var(--color-primary)] transition-all duration-300"
            >
              ← Back to Studio
            </Link>

            <button
              onClick={() => setShareOpen(!shareOpen)}
              className="font-label text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-surface)] opacity-50 hover:opacity-100 hover:text-[var(--color-primary)] transition-all duration-300 cursor-pointer border border-[var(--outline-variant)]/20 px-4 py-2 hover:border-[var(--color-primary)]"
            >
              {shareOpen ? '✕ Close' : 'Share'}
            </button>

            {/* Share Panel Dropdown — anchored to the share button */}
            {shareOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-3 z-[70] bg-[var(--color-surface-container-low)] border border-[var(--outline-variant)]/20 p-6 shadow-2xl min-w-[280px]"
              >
                <p className="font-label text-[10px] tracking-[0.15em] uppercase text-[var(--color-primary)] mb-4">
                  Share this article
                </p>

                {/* Copy Link */}
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-between py-3 px-4 mb-2 border border-[var(--outline-variant)]/10 hover:border-[var(--color-primary)] transition-all duration-300 cursor-pointer group"
                >
                  <span className="font-label text-[11px] tracking-[0.08em] uppercase opacity-70 group-hover:opacity-100">
                    {copied ? '✓ Copied!' : 'Copy Link'}
                  </span>
                  <span className="text-sm opacity-50">🔗</span>
                </button>

                {/* Social Links */}
                {Object.entries(shareLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between py-3 px-4 mb-2 border border-[var(--outline-variant)]/10 hover:border-[var(--color-primary)] transition-all duration-300 group block"
                  >
                    <span className="font-label text-[11px] tracking-[0.08em] uppercase opacity-70 group-hover:opacity-100 capitalize">
                      {platform}
                    </span>
                    <span className="text-sm opacity-50">→</span>
                  </a>
                ))}

                {/* QR Code */}
                <div className="mt-4 pt-4 border-t border-[var(--outline-variant)]/10 flex flex-col items-center">
                  <p className="font-label text-[10px] tracking-[0.1em] uppercase opacity-50 mb-3">
                    Scan to read
                  </p>
                  <canvas
                    ref={qrCanvasRef}
                    width={160}
                    height={160}
                    className="bg-white p-2"
                  />
                  <button
                    onClick={handleDownloadQR}
                    className="mt-3 font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-primary)] opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Download QR
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Click-away overlay for share panel */}
          {shareOpen && (
            <div
              className="fixed inset-0 z-[65] cursor-pointer"
              onClick={() => setShareOpen(false)}
            />
          )}
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Volume Badge */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-label text-[10px] tracking-[0.15em] uppercase text-[var(--color-primary)] border border-[var(--color-primary)] px-3 py-1">
                {article.volume}
              </span>
              <span className="font-label text-[10px] tracking-[0.1em] uppercase opacity-40">
                Frames & Truth
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-[2.5rem] md:text-[4.5rem] lg:text-[6rem] leading-[0.9] tracking-[-0.03em] uppercase text-[var(--color-on-surface)] mb-8">
              {article.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 mb-12 font-label text-[11px] tracking-[0.08em] uppercase opacity-50">
              <span>By {article.author}</span>
              <span className="hidden md:inline">•</span>
              <span>{formattedDate}</span>
              <span className="hidden md:inline">•</span>
              <span>{article.readTime}</span>
            </div>

            {/* Divider */}
            <div className="w-24 h-[2px] bg-[var(--color-primary)] mb-16" />
          </motion.header>

          {/* Article Body */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {article.sections.map((section, i) => {
              switch (section.type) {
                case 'heading':
                  return (
                    <h2
                      key={i}
                      className="font-display font-bold text-[1.5rem] md:text-[2rem] leading-[1.1] tracking-[-0.01em] uppercase mt-8 text-[var(--color-on-surface)]"
                    >
                      {section.content}
                    </h2>
                  );

                case 'quote':
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-[var(--color-primary)] pl-6 md:pl-8 italic opacity-90 my-4 font-body text-[1.15rem] md:text-[1.4rem] leading-[1.7]"
                    >
                      &ldquo;{section.content}&rdquo;
                    </blockquote>
                  );

                case 'list':
                  return (
                    <ul
                      key={i}
                      className="list-disc pl-8 flex flex-col gap-3 font-body text-[1.1rem] md:text-[1.3rem] leading-[1.7] opacity-80 font-light"
                    >
                      {section.items?.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );

                case 'paragraph':
                default:
                  return (
                    <p
                      key={i}
                      className="font-body text-[1.1rem] md:text-[1.3rem] leading-[1.8] text-[var(--color-on-surface)] opacity-80 font-light"
                    >
                      {section.content.split('\n').map((line, j, arr) => (
                        <span key={j}>
                          {line}
                          {j < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  );
              }
            })}

            {/* Sign-off */}
            <p className="mt-8 italic opacity-60 font-body text-[1.1rem] md:text-[1.3rem] leading-[1.8]">
              Until the next frame.
              <br />— {article.author}
            </p>

            {/* Footer Rule */}
            <div className="mt-16 pt-8 border-t border-[var(--outline-variant)]/20">
              <p className="font-label text-[12px] tracking-[0.12em] uppercase text-[var(--color-primary)]">
                Frames & Truth — Where story meets intention.
              </p>
            </div>
          </motion.article>

          {/* Bottom Share Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-[var(--outline-variant)]/10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="font-label text-[10px] tracking-[0.15em] uppercase text-[var(--color-primary)] mb-2">
                  Share this article
                </p>
                <p className="font-body text-[0.9rem] opacity-50 font-light">
                  {articleUrl}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="font-label text-[10px] tracking-[0.12em] uppercase px-5 py-3 border border-[var(--outline-variant)]/20 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 cursor-pointer"
                >
                  {copied ? '✓ Copied' : 'Copy Link'}
                </button>

                {Object.entries(shareLinks)
                  .slice(0, 3)
                  .map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label text-[10px] tracking-[0.12em] uppercase px-5 py-3 border border-[var(--outline-variant)]/20 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 capitalize"
                    >
                      {platform}
                    </a>
                  ))}
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mt-16 flex flex-col items-center">
              <p className="font-label text-[10px] tracking-[0.15em] uppercase opacity-40 mb-4">
                Scan to share
              </p>
              <canvas
                ref={qrBottomRef}
                className="bg-white p-3 border border-[var(--outline-variant)]/10"
              />
              <button
                onClick={handleDownloadQR}
                className="mt-4 font-label text-[10px] tracking-[0.12em] uppercase text-[var(--color-primary)] opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                [ Download QR Code ]
              </button>
            </div>
          </motion.div>

          {/* Back to Home */}
          <div className="mt-20 text-center">
            <Link
              href="/"
              className="font-label text-[11px] tracking-[0.12em] uppercase text-[var(--color-on-surface)] opacity-40 hover:opacity-100 hover:text-[var(--color-primary)] transition-all duration-300"
            >
              ← Back to Studio 74
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
