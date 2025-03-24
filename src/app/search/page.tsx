import { Suspense } from "react";
import { SearchPageComponent } from "@/components/Frontend/Search/SearchPage";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { Breadcrumbs } from "@/components/Frontend/Search/Breadcrumbs";
import { Footer } from "@/components/Frontend/Footer/Footer";
import Loader from "@/components/Loader";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main>
          <Media />
          <div className="sticky top-0 z-50">
            <Navigation />
          </div>
          <Breadcrumbs />
          <div className="py-20">
            <Loader></Loader>
          </div>
          <Footer />
        </main>
      }
    >
      <SearchPageComponent />
    </Suspense>
  );
}
