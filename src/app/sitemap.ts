import { MetadataRoute } from 'next';

const EXCLUDED_PATHS = ['/api', '/dashboard', '/user-panel'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://diptyquest.com';

    const staticPaths = [
        '/',
        '/about',
        '/categories',
        '/create-account',
        '/find-job',
        '/gigs',
        '/offices',
        '/privacy-policy',
        '/refund-policy',
        '/terms-conditions',
        '/upcoming-events',
        '/authentication/login',
        '/create-account',
        '/authentication/student-registration',
        '/authentication/employer-registration',
        '/authentication/professional-registration',
        '/authentication/entrepreneur-registration',
    ];

    const allPaths = [...staticPaths
    ].filter(
        (path) => !EXCLUDED_PATHS.some((excluded) => path.startsWith(excluded))
    );

    return allPaths.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
    }));
}
