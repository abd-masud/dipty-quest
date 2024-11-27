import { FaLinkedinIn } from "react-icons/fa";
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
            href={"https://www.linkedin.com/in/dipty-quest-a1225633a/"}
          >
            <FaLinkedinIn />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://x.com/DDiptyquest"}
          >
            <FaXTwitter />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.pinterest.com/diptyquest/"}
          >
            <FaPinterestP />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.reddit.com/user/Equivalent_Horse3272/"}
          >
            <FaRedditAlien />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.quora.com/profile/Dipty-Quest"}
          >
            <FaQuora />
          </Link>
          <Link
            className="hover:text-[#FAB616] transition duration-300"
            href={"https://www.meetup.com/members/452183452/"}
          >
            <FaMeetup />
          </Link>
        </div>
        <div></div>
      </div>
    </main>
  );
};
