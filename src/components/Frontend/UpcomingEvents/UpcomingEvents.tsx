import { Footer } from "../Footer/Footer";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { UpcomingEventsInfo } from "./UpcomingEventsInfo";

export const UpcomingEventsComponent = () => {
  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <UpcomingEventsInfo />
      <Footer />
    </main>
  );
};
