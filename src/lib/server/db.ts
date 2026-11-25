import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

export interface ProjectTool {
	id: string;
	name: string;
	description: string;
	url: string;
	iconUrl?: string;
	videoUrl?: string;
	githubUrl?: string | null;
	status: 'Concepto' | 'Desarrollo' | 'En Pruebas' | 'Produccion';
	tags: string[];
	createdAt: string;
}

// Fallback demo projects for portfolio preview if DB is not connected yet
const SAMPLE_PROJECTS: ProjectTool[] = [
	{
		id: 'demo-1',
		name: 'Cloud Infrastructure Optimizer',
		description: 'Automated cost analysis and cloud resource optimization platform built with TypeScript, Node.js, and Terraform.',
		url: 'https://github.com/LastGentlman',
		iconUrl: '',
		videoUrl: 'https://youtube.com',
		githubUrl: 'https://github.com/LastGentlman',
		status: 'Produccion',
		tags: ['Cloud', 'DevOps', 'TypeScript', 'resume'],
		createdAt: new Date().toISOString()
	},
	{
		id: 'demo-2',
		name: 'AI Document Knowledge Graph',
		description: 'High-throughput RAG engine that transforms unstructured technical documentation into interactive knowledge graphs.',
		url: 'https://github.com/LastGentlman',
		iconUrl: '',
		videoUrl: '',
		githubUrl: 'https://github.com/LastGentlman',
		status: 'Produccion',
		tags: ['AI / ML', 'Python', 'FastAPI', 'resume'],
		createdAt: new Date().toISOString()
	},
	{
		id: 'demo-3',
		name: 'Realtime Logistics & Dispatch Hub',
		description: 'High-concurrency fleet management and dispatch coordination platform with live geofencing and real-time alerts.',
		url: 'https://github.com/LastGentlman',
		iconUrl: '',
		videoUrl: '',
		githubUrl: 'https://github.com/LastGentlman',
		status: 'En Pruebas',
		tags: ['truck stop', 'Logistics', 'SvelteKit', 'resume'],
		createdAt: new Date().toISOString()
	},
	{
		id: 'demo-4',
		name: 'Enterprise Workflow Engine',
		description: 'Declarative workflow orchestration platform enabling custom webhook routing, job queues, and automated reporting.',
		url: 'https://github.com/LastGentlman',
		iconUrl: '',
		videoUrl: '',
		githubUrl: 'https://github.com/LastGentlman',
		status: 'Desarrollo',
		tags: ['Full Stack', 'PostgreSQL', 'API', 'resume'],
		createdAt: new Date().toISOString()
	}
];

export class Database {
	private supabase: SupabaseClient | null = null;

	private getClient(): SupabaseClient | null {
		if (this.supabase) return this.supabase;

		const url = env.SUPABASE_URL?.trim();
		const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();

		if (!url || !key) {
			console.warn('[Showcase DB] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing. Using showcase demo items.');
			return null;
		}

		try {
			this.supabase = createClient(url, key, {
				auth: { persistSession: false }
			});
			return this.supabase;
		} catch (error) {
			console.error('[Showcase DB] Connection error:', error);
			return null;
		}
	}

	async getProjects(selectedTag?: string): Promise<{ projects: ProjectTool[]; allTags: string[] }> {
		const client = this.getClient();

		let rawProjects: ProjectTool[] = [];

		if (!client) {
			rawProjects = SAMPLE_PROJECTS;
		} else {
			try {
				const { data, error } = await client
					.from('tools')
					.select('*')
					.order('created_at', { ascending: false });

				if (error) {
					console.error('[Showcase DB] Error querying tools:', error);
					rawProjects = SAMPLE_PROJECTS;
				} else {
					rawProjects = (data || []).map((row) => ({
						id: row.id,
						name: row.name,
						description: row.description,
						url: row.url,
						iconUrl: row.icon_url || '',
						videoUrl: row.video_url || '',
						githubUrl: row.github_url || null,
						status: row.status,
						tags: Array.isArray(row.tags) && row.tags.length > 0 ? row.tags : ['truck stop'],
						createdAt: row.created_at
					}));
				}
			} catch (err) {
				console.error('[Showcase DB] Unexpected error:', err);
				rawProjects = SAMPLE_PROJECTS;
			}
		}

		// Collect distinct tags across all projects
		const tagsSet = new Set<string>();
		for (const p of rawProjects) {
			for (const t of p.tags) {
				if (t && t.trim()) tagsSet.add(t.trim());
			}
		}
		const allTags = Array.from(tagsSet).sort();

		// Apply tag filter if requested
		let projects = rawProjects;
		if (selectedTag && selectedTag !== 'All' && selectedTag !== 'Todos') {
			projects = rawProjects.filter((p) =>
				p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
			);
		}

		return { projects, allTags };
	}
}

export const db = new Database();
export const getProjects = (tag?: string) => db.getProjects(tag);
