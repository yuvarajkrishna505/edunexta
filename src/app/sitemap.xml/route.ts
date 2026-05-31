import { NextResponse } from 'next/server';
import { initialCourses } from '@/utils/data';

export async function GET() {
  const baseUrl = 'https://www.edunexta.com';

  // Seed static pages
  const staticPages = [
    '',
    '/courses',
    '/success-stories',
    '/about',
    '/contact',
    '/admin'
  ];

  // Dynamic course slugs from database
  const coursesPages = initialCourses.map((c) => `/courses/${c.slug}`);
  const allUrls = [...staticPages, ...coursesPages];

  // Compile valid XML sitemap string
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${url === '' ? '1.0' : url.includes('/courses/') ? '0.9' : '0.7'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
    }
  });
}
