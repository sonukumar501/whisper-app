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
    <div className="grid grid-cols-12 p-2.5 gap-16 bg-white shadow shadow-indigo-50 font-medium">
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
              className="transition-colors hover:text-indigo-600 font-sans font-semibold"
              href={item.link}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex col-start-10 col-end-12 justify-center gap-8 items-center font-sans font-semibold text-sm w-full ">
        <button className="w-28 bg-white-200 ml-4 text-nowrap bg-indigo-50 text-indigo-700 shadow-xs p-2 px-6 rounded-sm  hover:bg-indigo-100 hover:text-indigo-700 ">
          Log in
        </button>
        <button className="text-nowrap text-white bg-indigo-600 rounded-sm ">
          <Link
            href="/sign-up"
            className=" mr-2 inline-flex items-center justify-center px-3 py-2 text-nowrap "
          >
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
}
