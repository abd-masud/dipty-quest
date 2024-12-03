import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { EntrepreneurRegistrationForm } from "./EntrepreneurRegistrationForm";

export const EntrepreneurRegistrationPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <EntrepreneurRegistrationForm />
      <Footer />
    </main>
  );
};
