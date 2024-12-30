export async function GET() {
  const baseUrl = 'https://diptyquest.com';

  return new Response(
    `
User-agent: *
Disallow: /dashboard/
Allow: /


Sitemap: ${baseUrl}/sitemap.xml
    `.trim(),
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
