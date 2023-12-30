import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] my-4">
          ant ride
        </h1>
        <Link href="/create" className="btn btn-outline btn-lg">Create carpool</Link>
        <Link href="/join" className="btn btn-outline btn-lg">Join carpool</Link>
        <Link href="/edit-carpool" className="btn btn-outline btn-lg">Edit carpool as organizer</Link>
        <Link href="/edit-join" className="btn btn-outline btn-lg">Edit carpool as participant</Link>
      </div>      
    </main>
  );
}
