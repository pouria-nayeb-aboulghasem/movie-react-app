import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Movie from "@/pages/Movie";
import Series from "@/pages/Series";
import Navbar from "./components/Navbar";

function CatalogLayout() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Outlet />
    </main>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.35em] text-amber-300">
        404
      </p>
      <h1 className="mt-3 text-3xl font-black text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">
        The page you are looking for does not exist.
      </p>
    </section>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CatalogLayout />}>
          <Route index element={<Navigate to="/movies" replace />} />
          <Route path="movies" element={<Movie />} />
          <Route path="series" element={<Series />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
