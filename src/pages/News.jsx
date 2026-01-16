import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

export default function News() {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setNewsItems(data);
            } catch (error) {
                console.error('Error fetching news:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-6 px-4 md:px-6 py-8">
            {/* Hero Featured News */}
            <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
            >
                <div
                    className="aspect-[21/9] w-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6_jmhbmKGRsWgVPBWXgv4AbrUAv80EJ2jJicOE55vnFRC0nNvMasYkE5sTOJXzGFxWSCQJSdd9RAnSJAarczMTVVP0TENSsKiGI4m2St7cKE4lNDSEvSeWWTgipLkWTcY4xLD6VbDHQ6d4Mgc9UU6MR_GxonXnpoKJVV7sAgfjyISqrb9knPBSwvknhPGaR17Ax8mHCmKrQOgqLhTfyrhaEPrFGoVx6NVEi-RAa7sPD0E09Oi99DFYsK9nl_3ZldimX4OUKoQVBk")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary text-background-dark px-3 py-1 rounded text-xs font-black uppercase tracking-widest">Destacado</span>
                        <span className="text-white/50 text-xs font-medium uppercase tracking-widest">• Oficial</span>
                    </div>
                    <h1 className="max-w-3xl text-2xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-4">Estadios listos: El camino a la gran final del 2026 inicia hoy</h1>
                    <p className="max-w-2xl text-white/70 text-base md:text-lg mb-6 line-clamp-2">Las sedes de México, Canadá y Estados Unidos presentan avances históricos en infraestructura para recibir a las 48 selecciones clasificadas.</p>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-background-dark hover:bg-primary transition-colors">
                            Leer artículo completo
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                        <span className="text-white/40 text-sm">Hace 2 horas</span>
                    </div>
                </div>
            </motion.section>

            {/* Filters */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Explorar Temas</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {[
                        { name: 'Todo', icon: 'grid_view' },
                        { name: 'Oficial', icon: 'verified' },
                        { name: 'Rumores', icon: 'trending_up' },
                        { name: 'Estadios', icon: 'stadium' },
                        { name: 'Equipos', icon: 'groups' },
                        { name: 'Entradas', icon: 'confirmation_number' }
                    ].map((filter, index) => (
                        <button
                            key={filter.name}
                            className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold text-sm transition-all ${index === 0 ? 'bg-primary text-background-dark' : 'bg-card-dark border border-border-dark text-white/70 hover:bg-border-dark'}`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
                            {filter.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* News Grid */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
                {loading ? (
                    <div className="col-span-full text-center text-white/50 py-20">Cargando noticias...</div>
                ) : newsItems.length === 0 ? (
                    <div className="col-span-full text-center text-white/50 py-20">No hay noticias recientes.</div>
                ) : (
                    newsItems.map((news) => (
                        <motion.article
                            key={news.id}
                            variants={item}
                            className="flex flex-col overflow-hidden rounded-xl bg-card-dark border border-border-dark hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer"
                        >
                            <div
                                className="relative aspect-video w-full bg-center bg-cover"
                                style={{ backgroundImage: `url("${news.image}")` }}
                            >
                                <div className="absolute top-3 left-3">
                                    <span className="bg-background-dark/80 backdrop-blur-md text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">{news.category}</span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="text-lg font-bold leading-tight mb-2 text-white">{news.title}</h3>
                                <p className="text-sm text-white/50 mb-4 flex-1 line-clamp-2">{news.excerpt}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-white/30">{news.time}</span>
                                    <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                        Leer más <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))
                )}

                {/* Special Text-only Card */}
                <motion.article variants={item} className="flex flex-col overflow-hidden rounded-xl bg-primary/10 border border-primary/20 p-5 transition-all hover:bg-primary/15 cursor-pointer">
                    <div className="mb-3">
                        <span className="material-symbols-outlined text-4xl text-primary/60">breaking_news</span>
                    </div>
                    <h3 className="text-lg font-black leading-tight mb-2 text-white">ÚLTIMA HORA: Se confirma la sede del sorteo final</h3>
                    <p className="text-sm text-white/50 mb-4 flex-1">La FIFA ha revelado que la ciudad de Vancouver será la anfitriona del sorteo de grupos en Diciembre de 2025.</p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-primary font-bold">ACTUALIZADO</span>
                        <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">
                            Ver detalles
                        </button>
                    </div>
                </motion.article>
            </motion.section>

            {/* Load More */}
            <div className="flex flex-col items-center justify-center py-10 gap-3">
                <button className="group flex items-center gap-2 rounded-full border border-border-dark bg-card-dark px-8 py-3 font-bold text-white transition-all hover:bg-primary hover:text-background-dark hover:border-primary">
                    Cargar más noticias
                    <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">refresh</span>
                </button>
                <p className="text-xs text-white/30 uppercase tracking-widest">Mostrando {newsItems.length} artículos</p>
            </div>
        </div>
    );
}
