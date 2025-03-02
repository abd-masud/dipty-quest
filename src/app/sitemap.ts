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

    const dynamicPaths = await getDynamicPaths();

    const allPaths = [...staticPaths, ...dynamicPaths].filter(
        (path) => !EXCLUDED_PATHS.some((excluded) => path.startsWith(excluded))
    );

    return allPaths.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
    }));
}

async function getDynamicPaths(): Promise<string[]> {
    try {
        const categories = await fetchApi('/api/categories');
        const events = await fetchApi('/api/events');
        const gigs = await fetchApi('/api/gigs');
        const jobDetails = await fetchApi('/api/job-app');

        const categoryPaths = categories.map((category: { id: number, title: string }) =>
            `/categories/${encodeURIComponent(slugify(category.title))}-${category.id}`);
        const eventPaths = events.map((event: { id: number, event: string }) =>
            `/upcoming-events/${encodeURIComponent(slugify(event.event))}-${event.id}`);
        const gigPaths = gigs.map((gig: { id: number, title: string }) =>
            `/gigs/${encodeURIComponent(slugify(gig.title))}-${gig.id}`);
        const jobPaths = jobDetails.map((job: { id: number, jobTitle: string }) =>
            `/job-details/${encodeURIComponent(slugify(job.jobTitle))}-${job.id}`);

        return [...categoryPaths, ...eventPaths, ...gigPaths, ...jobPaths];
    } catch {
        return [];
    }
}

async function fetchApi(endpoint: string): Promise<any[]> {
    try {
        const res = await fetch(`https://diptyquest.com${endpoint}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }
        return await res.json();
    } catch {
        return [];
    }
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
