import Image from "next/image";

export default function Home() {
  return (
    <main
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/aset/blue.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* HERO */}
      <section className="relative flex h-full items-center justify-center">

        {/* Nama kiri */}
        <div className="absolute left-10 top-16">
          <h1
            className="text-[150px] leading-none text-white"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
          >
            Salsabila
          </h1>
        </div>

        {/* Nama kanan */}
        <div className="absolute right-10 top-56">
          <h1
            className="text-[130px] leading-none text-white"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
          >
            Al Zahir
          </h1>
        </div>

        {/* Foto */}
        <div className="relative z-20 mt-20">
          <Image
            src="/aset/porto-azzha.png"
            alt="Salsa"
            width={420}
            height={620}
            priority
            className="drop-shadow-2xl hover:scale-105 duration-500"
          />
        </div>

        {/* Skill */}
        <div className="absolute bottom-24 right-20 text-white">

          <h2 className="mb-5 text-3xl">
            My Skill
          </h2>

          <div className="flex gap-4">

            <div className="rounded-full bg-white/30 px-8 py-3 backdrop-blur-md">
              HTML
            </div>

            <div className="rounded-full bg-white/30 px-8 py-3 backdrop-blur-md">
              CSS
            </div>

            <div className="rounded-full bg-white/30 px-8 py-3 backdrop-blur-md">
              Tailwind
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}