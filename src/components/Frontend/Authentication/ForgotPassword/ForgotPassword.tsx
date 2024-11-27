import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const ForgotPasswordPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <ForgotPasswordForm />
      <Footer />
    </main>
  );
};
