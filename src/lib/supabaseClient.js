import { createClient } from '@supabase/supabase-js';

// Estas variables vendrán de tu archivo .env
// Es importante que empiecen con VITE_ para que Vite las pueda leer
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Faltan las variables de entorno de Supabase. Asegúrate de tener el archivo .env configurado.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
