import { Button } from "@/components/ui/button";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  
  return (
    <main className="min-h-screen bg-white text-black">
    <div className = "flex justify-center items-center">
      <section className="flex flex-col md:flex-row items-center justify-between py-20 text-left px-3 md:px-20">
        <div className="md:w-1/2">
          <h1 className="text-8xl font-extrabold mb-4 text-red-500 tracking-tight">
            Where the real teams are made.
          </h1>
          <p className="text-4xl mb-8 max-w-2xl">
            Discover and analyze the best teams in the VCT with our advanced
            analytics platform.
          </p>
          <Button className="bg-red-500 text-white font-bold hover:bg-red-600 py-6 px-10 text-lg">
            Get Started
          </Button>

        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <video
            className="w-full h-auto rounded-lg"
            src="https://i.imgur.com/6pTy9Vc.mp4" // Cambia esto con la ruta de tu video
            autoPlay
            loop
            muted
          />
        </div>
      </section>
    </div>
    </main>
  );
  
}


