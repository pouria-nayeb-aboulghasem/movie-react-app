import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="relative z-10 mx-auto flex max-w-7xl gap-2 px-5 pt-6 sm:px-8"
    >
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `rounded-full px-4 py-2 text-sm font-semibold transition ${
            isActive
              ? "bg-amber-300 text-slate-950"
              : "border border-white/10 text-slate-300 hover:border-amber-300/40 hover:text-white"
          }`
        }
      >
        Movies
      </NavLink>
      <NavLink
        to="/series"
        className={({ isActive }) =>
          `rounded-full px-4 py-2 text-sm font-semibold transition ${
            isActive
              ? "bg-amber-300 text-slate-950"
              : "border border-white/10 text-slate-300 hover:border-amber-300/40 hover:text-white"
          }`
        }
      >
        TV Series
      </NavLink>
    </nav>
  );
}

export default Navbar;
