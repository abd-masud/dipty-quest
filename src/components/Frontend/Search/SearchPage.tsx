import { Footer } from "../Footer/Footer";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { SearchPageItems } from "./SearchPageItems";

export const SearchPageComponent = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <SearchPageItems />
      <Footer />
    </main>
  );
};
