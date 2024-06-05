import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] mx-2 text-center">
        The
        {' '}
        <span className="bg-gradient-to-r from-indigo-700 via-blue-500 to-green-600 inline-block text-transparent bg-clip-text">
          easiest
        </span>
        {' '}
        way to organize carpools.
      </h1>
      <div className="flex flex-col gap-4 w-96 justify-center">
        <Link href="/join" className="btn btn-outline btn-lg">Join event</Link>
        <Link href="/edit-participant" className="btn btn-outline btn-lg">Edit participant details</Link>
        <Link href="/create" className="btn btn-outline btn-lg">Create event</Link>
        <Link href="/edit-organizer" className="btn btn-outline btn-lg">Edit event details</Link>
      </div>
    </div>
  );
}
