import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-primary font-bold relative after:content-[""] after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-primary'
      : 'text-white/70 hover:text-white transition-colors';
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-display text-white selection:bg-primary/30 bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] h-[72px] items-center justify-between px-4 md:px-6">
          {/* Left: Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-background-dark font-bold">sports_soccer</span>
            </div>
            <span className="hidden text-xl font-black tracking-tight text-white md:block">Mundial 2026</span>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className={`text-sm tracking-wide ${isActive('/')}`}>
              Noticias
            </Link>
            <Link to="/matches" className={`text-sm tracking-wide ${isActive('/matches')}`}>
              Partidos
            </Link>
            <Link to="/predictions" className={`text-sm tracking-wide ${isActive('/predictions')}`}>
              Pronósticos
            </Link>
            <Link to="/ranking" className={`text-sm tracking-wide ${isActive('/ranking')}`}>
              Ranking
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-white/30">search</span>
              <input
                type="text"
                placeholder="Buscar noticias..."
                className="h-10 w-64 rounded-full border border-border-dark bg-card-dark pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Profile Dropdown Trigger */}
            <div className="relative group cursor-pointer">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-border-dark bg-card-dark transition-colors group-hover:border-primary">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Simple Dropdown for Logout */}
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-card-dark border border-border-dark rounded-xl shadow-xl z-50 p-1">
                <div className="px-4 py-3 border-b border-border-dark">
                  <p className="text-sm font-bold text-white truncate">Fan ID: #8291</p>
                  <p className="text-xs text-white/50 truncate">{user?.email || 'fan@copa2026.com'}</p>
                </div>
                <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors text-left">
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav (Bottom) */}
      <nav className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-border-dark bg-background-dark/95 backdrop-blur-md md:hidden">
        <div className="grid h-full grid-cols-4 items-center justify-items-center">
          <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-primary' : 'text-white/40'}`}>
            <span className="material-symbols-outlined">newspaper</span>
            <span className="text-[10px] font-bold">Noticias</span>
          </Link>
          <Link to="/matches" className={`flex flex-col items-center gap-1 ${location.pathname === '/matches' ? 'text-primary' : 'text-white/40'}`}>
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-[10px] font-bold">Partidos</span>
          </Link>
          <Link to="/predictions" className={`flex flex-col items-center gap-1 ${location.pathname === '/predictions' ? 'text-primary' : 'text-white/40'}`}>
            <span className="material-symbols-outlined">sports_score</span>
            <span className="text-[10px] font-bold">Quiniela</span>
          </Link>
          <Link to="/ranking" className={`flex flex-col items-center gap-1 ${location.pathname === '/ranking' ? 'text-primary' : 'text-white/40'}`}>
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="text-[10px] font-bold">Ranking</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="hidden md:block py-10 px-6 border-t border-border-dark bg-background-dark/50">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">sports_soccer</span>
              </div>
              <span className="font-bold text-lg">Road to WC 2026</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              La plataforma definitiva hecha por fans para fans. Sigue cada detalle del evento deportivo más grande del mundo en 2026.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Secciones</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-primary transition-colors">Noticias</Link></li>
              <li><Link to="/matches" className="hover:text-primary transition-colors">Calendario</Link></li>
              <li><Link to="/predictions" className="hover:text-primary transition-colors">Quiniela</Link></li>
              <li><Link to="/ranking" className="hover:text-primary transition-colors">Ranking Global</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Síguenos</h4>
            <div className="flex gap-2">
              <button className="size-10 rounded-full bg-border-dark flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-lg">public</span>
              </button>
              <button className="size-10 rounded-full bg-border-dark flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
              <button className="size-10 rounded-full bg-border-dark flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-lg">mail</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] border-t border-border-dark pt-8 flex items-center justify-between text-xs text-white/30 uppercase tracking-widest">
          <p>© 2026 Road to WC. Contenido hecho por fans.</p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
            Servidor Online
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
