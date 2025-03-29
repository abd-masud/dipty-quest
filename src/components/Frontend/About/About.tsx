import { Footer } from "../Footer/Footer";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumb";
import { WhatAndWhy } from "./WhatAndWhy";
import { AboutQuotes } from "./AboutQuotes";
import { AboutHow } from "./AboutHow";

export const AboutComponent = () => {
  return (
    <main className="bg-gray-50">
      <Media />
      <div className="sticky top-0 z-50 shadow-sm">
        <Navigation />
      </div>
      <Breadcrumbs />
      <WhatAndWhy />
      <AboutQuotes />
      <AboutHow />
      <Footer />
    </main>
  );
};
