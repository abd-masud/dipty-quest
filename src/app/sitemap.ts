import { MetadataRoute } from 'next';

const EXCLUDED_PATHS = ['/api', '/dashboard', '/user-panel'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://diptyquest.com';

    const staticPaths = [
        '/',
        '/about',
        '/categories',
        '/create-account',
        '/employers',
        '/find-job',
        '/gigs',
        '/job-details',
        '/offices',
        '/privacy-policy',
        '/refund-policy',
        '/terms-conditions',
        '/upcoming-events',
    ];

    // const dynamicPaths = await fetchDynamicPaths();

    const allPaths = [...staticPaths
        // , ...dynamicPaths
    ].filter(
        (path) => !EXCLUDED_PATHS.some((excluded) => path.startsWith(excluded))
    );

    return allPaths.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
    }));
}

// async function fetchDynamicPaths(): Promise<string[]> {
//     return [
//         '/jobs/1',
//         '/jobs/2',
//     ];
// }
