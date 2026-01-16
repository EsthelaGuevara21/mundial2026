import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

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

export default function Ranking() {
    const { user } = useAuth();
    const [ranking, setRanking] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                // Fetch Top 50 Users
                // Assumes 'profiles' table with: id, username, points, avatar_url, badge
                const { data, error } = await supabase
                    .from('profiles')
                    .select('id, username, points, avatar_url, badge')
                    .order('points', { ascending: false })
                    .limit(50);

                if (error) throw error;
                if (data) {
                    // Add rank position
                    const rankedData = data.map((profile, index) => ({
                        ...profile,
                        rank: index + 1
                    }));
                    setRanking(rankedData);

                    // Find current user's rank
                    if (user) {
                        const currentUser = rankedData.find(u => u.id === user.id);
                        if (currentUser) {
                            setUserRank(currentUser);
                        } else {
                            // If not in top 50, fetch individual rank (simplified for now)
                            // In real app we might need a separate query or huge count
                            setUserRank({ rank: '50+', points: 0, badge: 'Rookie' });
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching ranking:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, [user]);

    return (
        <div className="mx-auto w-full max-w-[1200px] flex-1 flex-col gap-8 p-6 md:p-10 text-white">
            {/* Profile Hero Section */}
            {user && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                    {/* User Stats Card */}
                    <div className="lg:col-span-8 flex flex-col gap-6 rounded-xl border border-border-dark bg-[#1c2526] p-8 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 size-40 bg-primary/10 blur-[60px] rounded-full"></div>
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="size-24 md:size-32 rounded-full border-4 border-primary/20 bg-cover bg-center ring-4 ring-primary" style={{ backgroundImage: `url('${user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}')` }}></div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white">{user.email?.split('@')[0] || 'Fan'}</h1>
                                    <p className="text-primary font-medium">Hincha Oficial</p>
                                    <div className="mt-2 flex gap-2">
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">Top {userRank?.rank || 'New'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex flex-col gap-1 rounded-lg border border-border-dark bg-background-dark/50 p-4 text-center">
                                <p className="text-3xl font-extrabold text-white">{userRank?.points || 0}</p>
                                <p className="text-xs uppercase tracking-widest text-[#9eb5b7] font-semibold">Puntos Totales</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg border border-primary/30 bg-primary/5 p-4 text-center ring-1 ring-primary/20">
                                <p className="text-3xl font-extrabold text-primary">#{userRank?.rank || '-'}</p>
                                <p className="text-xs uppercase tracking-widest text-primary/80 font-semibold">Ranking Global</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Global Leaderboard Section */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-extrabold text-white italic uppercase">Ranking Global</h2>
                    <p className="text-[#9eb5b7]">Compite con los mejores fans alrededor del mundo.</p>
                </div>

                {/* Leaderboard Table */}
                <div className="overflow-hidden rounded-xl border border-border-dark bg-[#1c2526]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-dark bg-background-dark/30">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#9eb5b7]">Rango</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#9eb5b7]">Usuario</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#9eb5b7]">Insignia</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#9eb5b7] text-right">Puntos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark/50">
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-8 text-white/50">Cargando ranking...</td></tr>
                                ) : ranking.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-8 text-white/50">No hay datos de ranking disponibles.</td></tr>
                                ) : (
                                    ranking.map((profile) => (
                                        <motion.tr variants={item} key={profile.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <span className={`flex size-8 items-center justify-center rounded-full ${profile.rank <= 3 ? 'bg-primary text-background-dark' : 'text-[#9eb5b7]'} font-extrabold text-sm`}>{profile.rank}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-10 rounded-full border ${profile.rank === 1 ? 'border-[#FFD700]' : 'border-border-dark'} bg-cover bg-center`} style={{ backgroundImage: `url('${profile.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.username}')` }}></div>
                                                    <span className={`font-bold text-white ${profile.rank === 1 ? 'italic text-[#FFD700]' : ''}`}>
                                                        {profile.username || 'Usuario'}
                                                        {user?.id === profile.id && <span className="ml-2 text-xs text-primary">(Tú)</span>}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-[#9eb5b7]">
                                                    <span className="material-symbols-outlined text-[18px]">{profile.rank === 1 ? 'workspace_premium' : 'star'}</span>
                                                    <span className="text-xs font-bold uppercase">{profile.badge || 'Rookie'}</span>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-5 text-right font-extrabold text-xl ${profile.rank === 1 ? 'text-[#FFD700]' : 'text-white'}`}>{profile.points}</td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
