import { Footer } from "../Footer/Footer";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { AboutHow } from "./AboutHow";
import { AboutQuotes } from "./AboutQuotes";
import { Breadcrumbs } from "./Breadcrumb";
import { WhatAndWhy } from "./WhatAndWhy";

export const AboutComponent = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
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
