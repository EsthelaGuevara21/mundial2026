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

export default function Predictions() {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);
    const [predictions, setPredictions] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({});

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // 1. Fetch Matches
                const { data: matchesData, error: matchesError } = await supabase
                    .from('matches')
                    .select('*')
                    .order('date', { ascending: true });

                if (matchesError) throw matchesError;

                // 2. Fetch User's existing predictions
                const { data: predictionsData, error: predictionsError } = await supabase
                    .from('predictions')
                    .select('match_id, home_score, away_score')
                    .eq('user_id', user.id);

                if (predictionsError) throw predictionsError;

                setMatches(matchesData || []);

                // Convert array to object for easier access
                const predsMap = {};
                predictionsData?.forEach(p => {
                    predsMap[p.match_id] = { home: p.home_score, away: p.away_score };
                });
                setPredictions(predsMap);

            } catch (error) {
                console.error('Error loading data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handlePredictionChange = async (matchId, type, value) => {
        // Update local state immediately for UI responsiveness
        setPredictions(prev => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                [type]: value
            }
        }));

        // Debounce or save mechanism could be improved, but here we save on blur or distinct action
        // For simplicity in this demo, we'll save logic in a separate "Save" button or simpler effect.
        // Actually, let's auto-save after the user types.
    };

    const savePrediction = async (matchId) => {
        const pred = predictions[matchId];
        if (!pred || pred.home === '' || pred.away === '') return;

        setSaving(prev => ({ ...prev, [matchId]: true }));
        try {
            const { error } = await supabase
                .from('predictions')
                .upsert({
                    user_id: user.id,
                    match_id: matchId,
                    home_score: parseInt(pred.home),
                    away_score: parseInt(pred.away)
                });

            if (error) throw error;
            // Success feedback?
        } catch (error) {
            console.error('Error saving prediction:', error.message);
            alert('Error al guardar predicción');
        } finally {
            setSaving(prev => ({ ...prev, [matchId]: false }));
        }
    };

    if (loading) return <div className="text-center py-20 text-white/50">Cargando quiniela...</div>;

    return (
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-8 space-y-8 text-white">
            {/* Dashboard Header - Simplified for functionality */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight mb-2">Tu Quiniela</h2>
                        <p className="text-white/50">Pronostica los resultados y gana puntos.</p>
                    </div>
                </div>
            </motion.div>

            {/* Match Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                {matches.length === 0 ? (
                    <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <p className="text-white/50 font-medium">No hay partidos disponibles para pronosticar.</p>
                    </div>
                ) : (
                    matches.map((match) => (
                        <motion.div
                            key={match.id}
                            variants={item}
                            className="bg-card-dark rounded-xl border border-border-dark p-5 relative group transition-all hover:border-primary/30"
                        >
                            <div className="flex justify-between items-start mb-5">
                                <div>
                                    <span className="text-[10px] font-black bg-white/10 text-white/50 px-2 py-1 rounded uppercase tracking-widest">Match #{match.id.substring(0, 4)}</span>
                                    <p className="text-xs text-white/40 mt-2">{new Date(match.date).toLocaleDateString()}</p>
                                </div>
                                {saving[match.id] ? (
                                    <span className="text-[10px] text-primary animate-pulse">Guardando...</span>
                                ) : (
                                    <span className="text-[10px] text-white/30">PENDIENTE</span>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="size-12 rounded-full bg-border-dark flex items-center justify-center font-bold text-lg text-white">
                                        {match.home_team_code || 'H'}
                                    </div>
                                    <span className="font-bold text-xs text-center text-white truncate max-w-[80px]">{match.home_team}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={predictions[match.id]?.home || ''}
                                        onChange={(e) => handlePredictionChange(match.id, 'home', e.target.value)}
                                        onBlur={() => savePrediction(match.id)}
                                        className="w-12 h-14 bg-background-dark border border-border-dark rounded-lg text-2xl font-black text-center focus:ring-2 focus:ring-primary focus:border-primary text-white"
                                    />
                                    <span className="text-white/40 font-bold text-xl">:</span>
                                    <input
                                        type="number"
                                        value={predictions[match.id]?.away || ''}
                                        onChange={(e) => handlePredictionChange(match.id, 'away', e.target.value)}
                                        onBlur={() => savePrediction(match.id)}
                                        className="w-12 h-14 bg-background-dark border border-border-dark rounded-lg text-2xl font-black text-center focus:ring-2 focus:ring-primary focus:border-primary text-white"
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="size-12 rounded-full bg-border-dark flex items-center justify-center font-bold text-lg text-white">
                                        {match.away_team_code || 'A'}
                                    </div>
                                    <span className="font-bold text-xs text-center text-white truncate max-w-[80px]">{match.away_team}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
}
