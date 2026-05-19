import { GoogleConfig } from './google.interface';
import { ServerConfig } from './server.interface';
import { SupabaseConfig } from './supabase.interface';

export * from './server.interface';

export interface EnvironmentConfig extends ServerConfig, GoogleConfig, SupabaseConfig {}
