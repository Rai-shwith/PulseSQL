import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gradient tracking-tight">
          PulseSQL
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {isHome ? (
            <>
              <button onClick={() => scrollTo("problem")} className="hover:text-foreground transition-colors">Problem</button>
              <button onClick={() => scrollTo("solution")} className="hover:text-foreground transition-colors">Solution</button>
              <button onClick={() => scrollTo("roles")} className="hover:text-foreground transition-colors">Roles</button>
              <button onClick={() => scrollTo("security")} className="hover:text-foreground transition-colors">Security</button>
            </>
          ) : (
            <>
              <button onClick={() => scrollTo("architecture")} className="hover:text-foreground transition-colors">Architecture</button>
              <button onClick={() => scrollTo("schema")} className="hover:text-foreground transition-colors">Schema</button>
              <button onClick={() => scrollTo("diseases")} className="hover:text-foreground transition-colors">Diseases</button>
              <button onClick={() => scrollTo("team")} className="hover:text-foreground transition-colors">Team</button>
            </>
          )}
        </div>

        <Link
          to={isHome ? "/architecture" : "/"}
          className="px-4 py-2 rounded-lg text-sm font-medium glass-card hover:glow-indigo transition-all duration-300 text-foreground"
        >
          {isHome ? "View Architecture →" : "← Back to Home"}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
