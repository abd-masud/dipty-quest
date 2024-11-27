import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { NewPasswordForm } from "./NewPasswordForm";

export const NewPasswordPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <NewPasswordForm />
      <Footer />
    </main>
  );
};
