import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] my-4 mx-2 text-center">
        The
        {' '}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          easiest
        </span>
        {' '}
        way to organize carpools.
      </h1>
      <div className="flex flex-col gap-4 w-96 justify-center">
        <Link href="/create" className="btn btn-outline btn-lg">Create carpool</Link>
        <Link href="/join" className="btn btn-outline btn-lg">Join carpool</Link>
        <Link href="/edit-organizer" className="btn btn-outline btn-lg">Edit carpool as organizer</Link>
        <Link href="/edit-participant" className="btn btn-outline btn-lg">Edit carpool as participant</Link>
      </div>
    </div>
  );
}
