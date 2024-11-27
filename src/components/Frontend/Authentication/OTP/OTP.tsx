import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { OTPForm } from "./OTPForm";

export const OTPPage = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <OTPForm />
      <Footer />
    </main>
  );
};
