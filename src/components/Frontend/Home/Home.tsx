import { Media } from "./Media";
import { Navigation } from "../Navigation/Navigation";
import { Welcome } from "./Welcome";
import { Sponsors } from "./Sponsors";
import { Courses } from "./Courses";
import { Featured } from "./Featured";
import { Events } from "./Events";
import { Community } from "./Community";
import { Reviews } from "./Reviews";
import { Footer } from "../Footer/Footer";

export const HomeComponent = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Welcome />
      <Sponsors />
      <Courses />
      <Featured />
      <Events />
      <Community />
      <Reviews />
      <Footer />
    </main>
  );
};
