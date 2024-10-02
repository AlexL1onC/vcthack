'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";  // Importamos useEffect para la redirección
import { useRouter } from "next/navigation";  // Cambiamos a 'next/navigation'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  // Efecto para redirigir al usuario una vez autenticado
  useEffect(() => {
    if (user) {
      router.push('/membersonly');  // Redirigir a la página solo para miembros
    }
  }, [user, router]);  // Dependencia del usuario para ejecutar cuando cambie su estado

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="w-full bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Sneak.VI</div>
          <div className="flex space-x-6">
            <a 
              href="#features" 
              className="text-white hover:text-red-500 transform hover:scale-105 transition duration-300"
            >
              Features
            </a>
            <a 
              href="#community" 
              className="text-white hover:text-red-500 transform hover:scale-105 transition duration-300"
            >
              Community
            </a>
            {user ? (
              <a 
                href="/api/auth/logout" 
                className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-300"
              >
                Logout
              </a>
            ) : (
              <a 
                href="/api/auth/login" 
                className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-300"
              >
                Sign Up/Sign In
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {[
            "Advanced Analytics",
            "A true market analysis",
            "Computer Vision Analysis with AI",
            "24/7 Customer Support",
            
          ].map((feature, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {feature}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </main>
  );
}
