import Image from "next/image"
import BlankCard from "./components/matches"
import MatchFinder from "./components/scrims"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-8">
        {/* Imagen en la parte superior */}
        <div className="w-full h-48 relative">
          <Image
            src="/placeholder.svg?height=200&width=1200"
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Contenedor para los componentes lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card en blanco */}
          <div>
            <BlankCard />
          </div>

          {/* Componente de búsqueda de partidas */}
          <div>
            <MatchFinder />
          </div>
        </div>
      </div>
    </div>
  )
}