import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { EmployerRegistrationForm } from "./EmployerRegistrationForm";

export const EmployerRegistrationPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <EmployerRegistrationForm />
      <Footer />
    </main>
  );
};
