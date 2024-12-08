import { Footer } from "../Footer/Footer";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { TermsConditionsInfo } from "./TermsConditionsInfo";

export const TermsConditionsComponent = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <TermsConditionsInfo />
      <Footer />
    </main>
  );
};
