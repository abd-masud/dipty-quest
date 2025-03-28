import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import CanonicalURL from "./server/CanonicalURL";
import OpenGraphURL from "./server/OpenGraphURL";
import AuthWrapper from "./server/AuthWrapper";
import QueryProvider from "./server/QueryProvider";
import Script from "next/script";
import ScrollProgress from "@/components/ScrollProgress";
// import Window from "./server/Window";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>DiptyQuest | Empowering Careers, Ideas, Ventures & Growth</title>
        <link rel="shortcut icon" href="/images/logo.webp" type="image/png" />
        <CanonicalURL />
        <meta name="release-date" content="2024-12-20"></meta>
        <meta
          name="description"
          content="DiptyQuest is a platform for job seekers, idea sharing, venture capital, and skill development. Connect, collaborate, and grow."
        />
        <meta
          name="keywords"
          content="job seekers, venture capital, idea sharing, skill development, career growth, job opportunities, collaboration, personal development, startups, networking, professional growth"
        />
        <meta
          property="og:title"
          content="DiptyQuest | Empowering Careers, Ideas, Ventures & Growth"
        />
        <meta
          property="og:description"
          content="DiptyQuest is a platform for job seekers, idea sharing, venture capital, and skill development. Connect, collaborate, and grow."
        />
        <meta
          property="og:image"
          content="https://diptyquest.com/images/logo.webp"
        />
        <OpenGraphURL />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="DiptyQuest | Empowering Careers, Ideas, Ventures & Growth"
        />
        <meta
          name="twitter:description"
          content="DiptyQuest is a platform for job seekers, idea sharing, venture capital, and skill development. Connect, collaborate, and grow."
        />
        <meta name="twitter:image" content="/images/logo.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dhaka",
              addressRegion: "Bangladesh",
              streetAddress: "Road - 06, Avenue -01, Mirpur DOHS",
            },
            description:
              "DiptyQuest | Empowering Careers, Ideas, Ventures & Growth",
            name: "DiptyQuest",
            telephone: "09647123456",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://diptyquest.com/",
            potentialAction: [
              {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://diptyquest.com/search?q={search_term_string}",
                },
                "query-input": {
                  "@type": "PropertyValueSpecification",
                  valueRequired: "http://schema.org/True",
                  valueName: "search_term_string",
                },
              },
              {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "android-app://com.diptyquest.android/diptyquest/search?q={search_term_string}",
                },
                "query-input": {
                  "@type": "PropertyValueSpecification",
                  valueRequired: "http://schema.org/True",
                  valueName: "search_term_string",
                },
              },
            ],
          })}
        </script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WS4GF5R5PQ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WS4GF5R5PQ');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <AuthWrapper>
          <QueryProvider>
            <Providers>
              {/* <Window> */}
              {children}
              <ScrollProgress />
              {/* </Window> */}
            </Providers>
          </QueryProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
