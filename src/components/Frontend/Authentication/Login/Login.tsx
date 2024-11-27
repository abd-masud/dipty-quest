import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <LoginForm />
      <Footer />
    </main>
  );
};
