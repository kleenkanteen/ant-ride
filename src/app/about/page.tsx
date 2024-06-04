"use client";

import ImageModal from "@/components/imageModal";
import Link from "next/link";

export default function About() {
  const list = [
    "Eliminates manual coordination by automatching all participants into carpool 24 hours before the event starts.",
    "Allows the creation of the most optimal carpool routes based on everyone’s location.",
  ];

  return (
    <>
      <div className="flex justify-center pb-5">
        <Link href="/" className="btn btn-outline btn-sm">
          Home
        </Link>
      </div>
      <div className="space-y-6">
        <p className=" text-center text-2xl font-semibold lg:text-center lg:text-3xl">
          Make carpooling as easy and efficient as possible.
        </p>
        <p className="text-center">
          <a
            className="underline-offset cursor-pointer text-center text-white underline"
            href=""
          >
            Video demo
          </a>
        </p>

        <section className="space-y-2">
          <p className=" text-lg font-bold">Unique features:</p>
          <div className="pl-4">
            <ul className=" flex flex-col items-start justify-start space-y-3">
              {list.map((text) => (
                <li
                  key={text}
                  className="flex items-baseline justify-center gap-x-2"
                >
                  {<CheckMark />}
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="space-y-5">
          <p className="">
            Ant Ride sends Google Maps routes to drivers and riders 24 hours
            before the event. For example:
          </p>
          <div className="flex">
            <ImageModal
              path={"/about-page-images/google-maps-route-sample.png"}
              alt={"google maps sample route"}
              className="w-full"
            />
          </div>
        </section>
      </div>
    </>
  );
}

function CheckMark() {
  return (
    <svg
      className="h-3.5 w-3.5 flex-shrink-0 text-green-500 dark:text-green-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  );
}
