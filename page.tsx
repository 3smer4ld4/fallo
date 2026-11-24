
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

type Categoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
};

// Fotografías de las categorías
const imagenesPorCategoria: Record<string, string> = {
  "plantas-interior":
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",

  "plantas-exterior":
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",

  cactus:
    "https://images.unsplash.com/photo-1509423350716-97f2360af7e4",

  suculentas:
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411",

  "plantas-acuaticas":
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",

  "plantas-carnivoras":
    "https://images.unsplash.com/photo-1463936575829-25148e1abc6b",

  "plantas-ornamentales":
    "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a",

  "plantas-comestibles":
    "https://images.unsplash.com/photo-1540420773420-3366772f4999",

  "plantas-medicinales":
    "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",

  "plantas-aromaticas":
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",

  arboles:
    "https://images.unsplash.com/photo-1448375240586-882707db888b",

  arbustos:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",

  "plantas-trepadoras":
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946",

  "plantas-epifitas":
    "https://images.unsplash.com/photo-1509423350716-97f2360af7e4",

  "nativas-el-salvador":
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",

  "endemicas-el-salvador":
    "https://images.unsplash.com/photo-1511497584788-876760111969",
};

async function ListaCategorias() {
  const supabase = await createClient();

  const { data: categorias, error } = await supabase
    .from("categorias")
    .select("id, nombre, slug, descripcion")
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error al cargar categorías:", error.message);

    return (
      <p className="text-center text-red-700">
        No fue posible cargar las categorías.
      </p>
    );
  }

  const listaCategorias = (categorias ?? []) as Categoria[];

  if (listaCategorias.length === 0) {
    return (
      <p className="text-center text-stone-600">
        Todavía no hay categorías registradas.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listaCategorias.map((categoria) => (
        <Link
          key={categoria.id}
          href={`/categorias/${categoria.slug}`}
          className="group overflow-hidden rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-700 hover:shadow-lg"
        >
          {/* Imagen de la categoría */}
          <div className="mb-5 h-44 w-full overflow-hidden rounded-xl bg-emerald-50">
            {imagenesPorCategoria[categoria.slug] ? (
              <img
                src={`${imagenesPorCategoria[categoria.slug]}?auto=format&fit=crop&w=900&q=80`}
                alt={categoria.nombre}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-5xl">
                🌿
              </div>
            )}
          </div>

          {/* Información de la categoría */}
          <h3 className="min-h-12 font-semibold text-emerald-950 group-hover:text-emerald-700">
            {categoria.nombre}
          </h3>

          <p className="mt-2 min-h-12 text-sm leading-6 text-stone-600">
            {categoria.descripcion ||
              "Descubre las plantas de esta categoría."}
          </p>

          <span className="mt-5 inline-block text-sm font-semibold text-emerald-800">
            Explorar categoría →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbf7] text-stone-800">
      {/* Navegación */}
      <header className="border-b border-emerald-900/10 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-emerald-950"
          >
            Plantitis{" "}
            <span className="text-emerald-600">Informativa</span>
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium text-stone-600">
            <a
              href="#categorias"
              className="transition hover:text-emerald-700"
            >
              Categorías
            </a>

            <a
              href="#nosotros"
              className="transition hover:text-emerald-700"
            >
              Nosotros
            </a>
          </div>
        </nav>
      </header>

      {/* Portada */}
      <section className="relative overflow-hidden bg-[#eaf2e8]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <span className="mb-6 inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-emerald-800">
              🌱 Explora el mundo vegetal
            </span>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-emerald-950 md:text-6xl">
              Un mundo de plantas por descubrir.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Aprende sobre especies vegetales, sus características,
              cuidados, distribución y la diversidad de nuestro planeta.
            </p>

            <a
              href="#categorias"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-emerald-800 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explorar catálogo →
            </a>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-[2rem] bg-[#d5e6d3] p-10">
            <div className="text-center">
              <span className="text-9xl">🪴</span>
              <p className="mt-5 text-sm font-medium tracking-wide text-emerald-900">
                CONOCE · APRENDE · CONSERVA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section
        id="categorias"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Nuestro catálogo
          </span>

          <h2 className="mt-4 text-3xl font-bold text-emerald-950 md:text-4xl">
            Explora por categorías
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-600">
            Encuentra diferentes grupos de plantas y descubre sus
            características, diversidad y formas de cultivo.
          </p>
        </div>

        <Suspense
          fallback={
            <p className="py-12 text-center text-stone-500">
              Cargando categorías...
            </p>
          }
        >
          <ListaCategorias />
        </Suspense>
      </section>

      {/* Presentación */}
      <section id="nosotros" className="bg-[#eaf2e8] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-4xl">🌳</span>

          <h2 className="mt-5 text-3xl font-bold text-emerald-950">
            Conocer las plantas es valorar la naturaleza
          </h2>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            Plantitis Informativa es un espacio dedicado al conocimiento
            botánico, la identificación de especies y la divulgación
            responsable de información sobre el mundo vegetal.
          </p>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-emerald-950 px-6 py-8 text-center text-sm text-emerald-100">
        <p>
          Plantitis Informativa · Un mundo de plantas por descubrir.
        </p>
      </footer>
    </main>
  );
}
