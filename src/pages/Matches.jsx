import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Fetch matches from Supabase
                // Assumes table 'matches' with columns: 
                // id, date, home_team (code/name), away_team, venue, status (scheduled, live, finished)
                const { data, error } = await supabase
                    .from('matches')
                    .select('*')
                    .order('date', { ascending: true });

                if (error) throw error;
                if (data) setMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-8 text-white">
            {/* Section: Host Nations */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-10"
            >
                <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Sedes Anfitrionas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* USA */}
                    <div className="group cursor-pointer">
                        <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10" />
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrdjnNDT_k4O0t-YYptzJx7wtriA7gfurvf9XliYlktgnULVoXsV2R2PHk2dDum4UbUvJlgh-I7CAwHN0ysfnUI3Y01lp9Eu7mQgFCETtwMQLlSoOUWJ-Rud-dqLOncixCGdJA4IAAmW0w4yxxVCuP0xVS_x_DMB-S3lAQkK-UJVoLSYZCS7etIVwKOtPZxcX-ZEPMc_Ajq9V5zNA_tGDXvlToiSKxddYAH2Ih1QOR--QlphG7QgYi6OhWYZWhUqBSB1MT8LIWToA" alt="USA" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="bg-primary text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest">Host</span>
                                <p className="text-xl font-bold text-white mt-1">Estados Unidos</p>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm font-medium">11 sedes confirmadas</p>
                    </div>

                    {/* Mexico */}
                    <div className="group cursor-pointer">
                        <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10" />
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbSi34h3bcJCt3fIvgytOg41zR8GisGuvXR144k1ZrV9O2RfnWxHpnLS2WTjO2f7vLW2AOC6KfhD3yktYoPACVfnLi-nAd01dFaeM-DdsEoiQaitqc_aGk802ZxA0H8tzulFtrsR_ECAeg_EebMMLdGPeX1X8lC6x_XQSZ4OQhhI3QVw0MkyaqrLWGDRUVkv8YTx3y6PTdOUGzos1AdTMtkBDl30cjPe7gU0q1sIl-X17MPL-z9eFvIP5n7x0MIh9hhrcCqW7UFRU" alt="Mexico" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="bg-yellow-400 text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest">Inauguración</span>
                                <p className="text-xl font-bold text-white mt-1">México</p>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm font-medium">3 sedes confirmadas</p>
                    </div>

                    {/* Canada */}
                    <div className="group cursor-pointer">
                        <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10" />
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKjJpCQle8icyAHOWhRoUvTZtW1hivF0_fiXuWgKLRwlOlhgX7mBkBbQDsfuWfrUJAfTr67kZL7GwAO2GcLKNSHitgEQyJfy-QFlDbxs3COpDR-XaWXDBjPGwimyAtuix_cdtw4-DcTC2XXba9f7IYj8_9AWwi58o0upy7FXr6_h6NZeFBvz6ECWTtqcjqyfE9ayDjHAIHScjaeeWF29Mef3Kctr9QCvJYA6ZjIns7cg_CDY-EPkEXKUog0g5JqqnR5QD_60GzE2U" alt="Canada" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="bg-white/20 backdrop-blur text-white text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest">Expansión</span>
                                <p className="text-xl font-bold text-white mt-1">Canadá</p>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm font-medium">2 sedes confirmadas</p>
                    </div>
                </div>
            </motion.section>

            {/* Filters & Match Tabs */}
            <section className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-dark pb-px">
                    <div className="flex gap-6 overflow-x-auto no-scrollbar">
                        <button className="pb-4 border-b-2 border-primary text-sm font-bold whitespace-nowrap text-white">Próximos Partidos</button>
                        <button className="pb-4 border-b-2 border-transparent text-white/40 hover:text-white/60 text-sm font-medium whitespace-nowrap transition-colors">Fase de Grupos</button>
                        <button className="pb-4 border-b-2 border-transparent text-white/40 hover:text-white/60 text-sm font-medium whitespace-nowrap transition-colors">Eliminatorias</button>
                        <button className="pb-4 border-b-2 border-transparent text-white/40 hover:text-white/60 text-sm font-medium whitespace-nowrap transition-colors">Sedes Geográficas</button>
                    </div>
                    <div className="flex items-center gap-2 pb-4 sm:pb-0">
                        <button className="p-2 rounded-lg bg-card-dark border border-border-dark text-white/50 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                        <button className="p-2 rounded-lg bg-card-dark border border-border-dark text-white/50 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">map</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Upcoming Matches Grid */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
            >
                {loading ? (
                    <div className="col-span-full text-center text-white/50 py-20">Cargando partidos...</div>
                ) : matches.length === 0 ? (
                    <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <span className="material-symbols-outlined text-4xl text-white/20 mb-3">sports_soccer</span>
                        <p className="text-white/50 font-medium">No hay partidos programados aún.</p>
                        <p className="text-white/30 text-xs mt-1">Vuelve pronto para ver el calendario oficial.</p>
                    </div>
                ) : (
                    matches.map((match) => (
                        <motion.div
                            key={match.id}
                            variants={item}
                            className="bg-card-dark border border-border-dark p-5 rounded-xl flex flex-col gap-4 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Match #{String(match.id).padStart(3, '0')} • {formatDate(match.date)}</span>
                                {match.status === 'live' ? (
                                    <span className="flex items-center gap-1 text-primary text-[10px] font-bold">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        EN VIVO
                                    </span>
                                ) : (
                                    <span className="text-white/30 text-[10px] font-bold uppercase">{match.status || 'PROGRAMADO'}</span>
                                )}
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="flex flex-col items-center gap-2 w-1/3">
                                    <div className="size-12 rounded-full bg-border-dark flex items-center justify-center font-bold text-lg text-white">
                                        {match.home_team_code || 'TBD'}
                                    </div>
                                    <span className="text-xs font-bold text-center text-white">{match.home_team || 'Por definir'}</span>
                                </div>
                                <div className="text-2xl font-black text-white/30">VS</div>
                                <div className="flex flex-col items-center gap-2 w-1/3">
                                    <div className="size-12 rounded-full bg-border-dark flex items-center justify-center font-bold text-lg text-white/50">
                                        {match.away_team_code || 'TBD'}
                                    </div>
                                    <span className="text-xs font-bold text-center text-white/50">{match.away_team || 'Por definir'}</span>
                                </div>
                            </div>
                            <div className="border-t border-border-dark pt-3 flex flex-col gap-2">
                                <p className="text-xs text-white/40 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span> {match.venue || 'Estadio por definir'}
                                </p>
                                <button className="mt-1 w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-bold transition-all">
                                    Pronosticar
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.section>

            {/* Stadium Showcase */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight">Estadios Emblemáticos</h2>
                        <p className="text-white/40 font-medium">Arquitectura y capacidad de primer nivel.</p>
                    </div>
                    <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                        Ver los 16 estadios <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stadium 1 */}
                    <div className="group relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEqs6zKGRfY6z6gSa65HcHm8t1Srk-2ioF0pB-uOfvVJICE7I_6ypuXN4loRqVrJC_1u8-CKEjUtBVZapON6MjmVoOD3WPtEi3mhHCO83TEvD8wNV-jeiu94rXvFps-zwkOfHxMw0MHnbIKX1V2dy1quaNf4cd0Yodg5W3_2BcGd3AB8TLCXkQBh5-nuNaXCpO_pFdhE5o4r2HkAVf33mtJtF-MeFwT6r8J8BQHb6jc7w6wPrJ4Nc1Q5Aiy0f4s0yvG8PrMrPnMps" alt="Estadio Azteca" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent"></div>

                        {/* Countdown badge */}
                        <div className="absolute top-4 left-4 bg-background-dark/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border-dark">
                            <p className="text-[8px] text-primary font-bold uppercase tracking-widest mb-1">Cuenta Regresiva</p>
                            <div className="flex gap-3 text-white">
                                <div className="text-center">
                                    <p className="text-sm font-black">812</p>
                                    <p className="text-[8px] text-white/40 uppercase">Días</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black">14</p>
                                    <p className="text-[8px] text-white/40 uppercase">Hrs</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black">22</p>
                                    <p className="text-[8px] text-white/40 uppercase">Min</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-extrabold text-white mb-1">Estadio Azteca</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/60 text-sm font-medium flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span> Ciudad de México
                                        </span>
                                        <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/30">87,523 CAP</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                                    <span className="material-symbols-outlined text-white text-2xl">sports_soccer</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stadium 2 */}
                    <div className="group relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW1H_gnbYD8tRaOLZY-mnJawZd2OcLxbzZpFwR6Ea7xzQ_6XZuZvgw7kmd6uv7VX8q0h4Dvlla9OVR6VT2Dy0T8Yw8cALJ12rwxMs_MikQYxRKcudsYKcGyITYll6kDQjvbwGkizsDORlHZ777QxrqHStDKx364wLPxp1WCR0YmKk-MSgiaML0_6ppWiAp-vWXnLd5-PRdobOB6YaEOjnVB2ZOojxLay90YE3uLs60weriLkhnnIcHGN3X65NMewXSHlzMtAh4ws4" alt="MetLife Stadium" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent"></div>

                        {/* Calendar button */}
                        <div className="absolute top-4 right-4">
                            <button className="bg-white text-background-dark px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm hover:bg-primary transition-colors">
                                Calendario
                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                            </button>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-extrabold text-white mb-1">MetLife Stadium</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/60 text-sm font-medium flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span> New York / New Jersey
                                        </span>
                                        <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/30">82,500 CAP</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                                    <span className="material-symbols-outlined text-white text-2xl">emoji_events</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
