import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProfessionalRegistrationForm } from "./ProfessionalRegistrationForm";

export const ProfessionalRegistrationPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <ProfessionalRegistrationForm />
      <Footer />
    </main>
  );
};
