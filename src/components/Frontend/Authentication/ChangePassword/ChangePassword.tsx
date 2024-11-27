import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const ChangePasswordPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <ChangePasswordForm />
      <Footer />
    </main>
  );
};
