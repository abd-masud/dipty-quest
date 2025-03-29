import { MetadataRoute } from 'next';

const EXCLUDED_PATHS = ['/api', '/dashboard', '/user-panel'];

interface Category {
    id: number;
    title: string;
}

interface Event {
    id: number;
    event: string;
}

interface Gig {
    id: number;
    title: string;
}

interface Job {
    id: number;
    jobTitle: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://diptyquest.com';

    const staticPaths = [
        '/',
        '/about',
        '/categories',
        '/find-job',
        '/gigs',
        '/offices',
        '/cart',
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
        const categories = await fetchApi<Category[]>('/api/categories');
        const events = await fetchApi<Event[]>('/api/events');
        const gigs = await fetchApi<Gig[]>('/api/gigs');
        const jobDetails = await fetchApi<Job[]>('/api/job-app');

        const categoryPaths = categories.map((category) =>
            `/categories/${encodeURIComponent(slugify(category.title))}-${category.id}`);
        const eventPaths = events.map((event) =>
            `/upcoming-events/${encodeURIComponent(slugify(event.event))}-${event.id}`);
        const gigPaths = gigs.map((gig) =>
            `/gigs/${encodeURIComponent(slugify(gig.title))}-${gig.id}`);
        const jobPaths = jobDetails.map((job) =>
            `/job-details/${encodeURIComponent(slugify(job.jobTitle))}-${job.id}`);

        return [...categoryPaths, ...eventPaths, ...gigPaths, ...jobPaths];
    } catch (error) {
        console.error('Error generating dynamic paths:', error);
        return [];
    }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
    try {
        const res = await fetch(`https://diptyquest.com${endpoint}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }
        return await res.json() as T;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [] as unknown as T;
    }
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
