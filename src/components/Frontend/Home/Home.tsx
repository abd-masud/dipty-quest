import { Media } from "./Media";
import { Navigation } from "../Navigation/Navigation";
import { Welcome } from "./Welcome";
import { Sponsors } from "./Sponsors";
import { Footer } from "../Footer/Footer";
import { AuthCheckOne } from "./AuthCheckOne";
import { AuthCheckTwo } from "./AuthCheckTwo";

export const HomeComponent = () => {
  return (
    <>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Welcome />
      <AuthCheckOne />
      <Sponsors />
      <AuthCheckTwo />
      <Footer />
    </>
  );
};
