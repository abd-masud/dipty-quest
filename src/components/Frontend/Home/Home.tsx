import { Media } from "./Media";
import { Navigation } from "../Navigation/Navigation";
import { Welcome } from "./Welcome";
import { Sponsors } from "./Sponsors";
import { Events } from "./Events";
// import { Community } from "./Community";
// import { Reviews } from "./Reviews";
import { Footer } from "../Footer/Footer";
import { Categories } from "./Categories";
import { Gigs } from "./Gigs";
import { Jobs } from "./Jobs";

export const HomeComponent = () => {
  return (
    <>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Welcome />
      <Jobs />
      <Gigs />
      <Categories />
      <Sponsors />
      <Events />
      {/* <Community /> */}
      {/* <Reviews /> */}
      <Footer />
    </>
  );
};
