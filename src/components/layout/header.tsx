import Log from "./log";
import Link from "next/link";
export default function Navbar() {
  const navigationItems = [
    { name: "About", link: "#" },
    { name: "Features", link: "#" },
    { name: "reviews", link: "#" },
    { name: "Plans", link: "#" },
  ];

  return (
    <div className="grid grid-cols-12 p-2 gap-16 bg-white border-b border-2 font-medium">
      <div className="col-start-2 col-end-3 items-center">
        <Log />
      </div>
      <ul
        className="
  flex col-start-4 col-end-10
  justify-center items-center gap-18
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
      <div className="flex col-start-10 col-end-12 justify-center gap-10 items-center ">
        <button className="w-full bg-white-200 ml-4 text-nowrap">Log in</button>
        <button className="text-nowrap">
          <Link
            href="/sign-up"
            className=" mr-2 inline-flex items-center justify-center px-3 py-2.5 text-nowrap font-semibold"
          >
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
}
