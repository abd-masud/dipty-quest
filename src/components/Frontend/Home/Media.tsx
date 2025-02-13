import { LiaFacebookF } from "react-icons/lia";
import { FaLinkedinIn, FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { FaQuora } from "react-icons/fa";
import { FaMeetup } from "react-icons/fa";
import Link from "next/link";

export const Media = () => {
  return (
    <main className="bg-[#131226]">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <div className="flex text-white gap-4">
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.linkedin.com/in/diptyquest-a1225633a/"}
          >
            <span className="sr-only">Visit LinkedIn profile</span>
            <FaLinkedinIn />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://medium.com/@diptyquest"}
          >
            <span className="sr-only">Visit Medium profile</span>
            <FaMediumM />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://x.com/DDiptyquest"}
          >
            <span className="sr-only">Visit Twitter profile</span>
            <FaXTwitter />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.facebook.com/share/14qoQALzvp/?mibextid=wwXIfr"}
          >
            <span className="sr-only">Visit Facebook profile</span>
            <LiaFacebookF />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.pinterest.com/diptyquest/"}
          >
            <span className="sr-only">Visit Pinterest profile</span>
            <FaPinterestP />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.reddit.com/user/Equivalent_Horse3272/"}
          >
            <span className="sr-only">Visit Reddit profile</span>
            <FaRedditAlien />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.quora.com/profile/Dipty-Quest"}
          >
            <span className="sr-only">Visit Quora profile</span>
            <FaQuora />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.meetup.com/members/452183452/"}
          >
            <span className="sr-only">Visit Meetup profile</span>
            <FaMeetup />
          </Link>
        </div>
      </div>
    </main>
  );
};
