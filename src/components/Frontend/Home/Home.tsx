import { Navigation } from "../Navigation/Navigation";
import { Courses } from "./Courses";
import { Community } from "./Community";
import { Featured } from "./Featured";
import { Sponsors } from "./Sponsors";
import { Welcome } from "./Welcome";
import { Events } from "./Events";
import { Reviews } from "./Reviews";
import { Footer } from "../Footer/Footer";

export const HomeComponent = () => {
  return (
    <main>
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
