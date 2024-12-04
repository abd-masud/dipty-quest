import { Media } from "./Media";
import { Navigation } from "../Navigation/Navigation";
import { Welcome } from "./Welcome";
import { Sponsors } from "./Sponsors";
import { Featured } from "./Featured";
import { Events } from "./Events";
import { Community } from "./Community";
import { Reviews } from "./Reviews";
import { Footer } from "../Footer/Footer";
import { Categories } from "./Categories";

export const HomeComponent = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Welcome />
      <Sponsors />
      <Categories />
      <Featured />
      <Events />
      <Community />
      <Reviews />
      <Footer />
    </main>
  );
};
