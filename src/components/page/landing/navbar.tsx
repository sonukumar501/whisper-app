import Log from "./log";
import Link from "next/link";
export default function Navbar() {
  const navigationItems = [
    { name: "About", link: "#" },
    { name: "Features", link: "#" },
    { name: "Plans", link: "#" },
    { name: "reviews", link: "#" },
  ];

  return (
    <div className="grid grid-cols-12 p-2 gap-16">
      <div className="col-start-2 col-end-3 items-center">
        <Log />
      </div>
      <ul
        className="
  flex col-start-4 col-end-10
  justify-center items-center gap-18
  rounded-3xl
  bg-white/70
  backdrop-blur-xl
  border border-indigo-100
  shadow-[0_8px_30px_rgba(79,70,229,0.08)]
  px-4 py-2
  text-sm font-medium text-gray-600
"
      >
        {navigationItems.map((item, index) => (
          <li key={index}>
            <a
              className="transition-colors hover:text-indigo-600"
              href={item.link}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex col-start-10 col-end-12 justify-center gap-10 items-center text-sm font-medium text-gray-600 bg-white border border-indigo-100 rounded-3xl">
        <button className="w-full bg-white-200 ml-4 text-nowrap">Log in</button>
        <button className="text-nowrap">
          <Link
            href="/sign-up"
            className="
    mr-2
    inline-flex items-center justify-center
    rounded-3xl
    bg-linear-to-r from-[#6d5bf0] to-[#e05bc4]
    px-3 py-2.5
    text-nowrap
    text-sm font-medium text-white
    shadow-lg shadow-indigo-500/20
    transition-all duration-200
    hover:shadow-xl hover:shadow-indigo-500/30
  "
          >
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
}
