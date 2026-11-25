<script lang="ts">
	import { ExternalLink, Github, Youtube, Copy, Check, Terminal, Globe, Cpu, Database } from 'lucide-svelte';
	import type { ProjectTool } from '$lib/server/db';

	interface Props {
		project: ProjectTool;
		onSelectTag?: (tag: string) => void;
		viewMode?: 'grid' | 'list';
	}

	let { project, onSelectTag, viewMode = 'grid' }: Props = $props();

	let copied = $state(false);

	async function copyLink(url: string) {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}

	const statusConfig: Record<string, { label: string; text: string; bg: string; border: string; dot: string }> = {
		Produccion: {
			label: 'Production',
			text: 'text-emerald-400',
			bg: 'bg-emerald-500/10',
			border: 'border-emerald-500/25',
			dot: 'bg-emerald-400'
		},
		Desarrollo: {
			label: 'In Development',
			text: 'text-amber-400',
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/25',
			dot: 'bg-amber-400'
		},
		'En Pruebas': {
			label: 'Testing & QA',
			text: 'text-sky-400',
			bg: 'bg-sky-500/10',
			border: 'border-sky-500/25',
			dot: 'bg-sky-400'
		},
		Concepto: {
			label: 'Prototype',
			text: 'text-slate-400',
			bg: 'bg-slate-500/10',
			border: 'border-slate-500/25',
			dot: 'bg-slate-400'
		}
	};

	const currentStatus = $derived(
		statusConfig[project.status] || {
			label: project.status,
			text: 'text-slate-400',
			bg: 'bg-slate-800/40',
			border: 'border-slate-700/40',
			dot: 'bg-slate-400'
		}
	);

	function getDomainIcon(tags: string[]) {
		const lower = tags.map((t) => t.toLowerCase());
		if (lower.some((t) => t.includes('cloud') || t.includes('devops'))) return Cpu;
		if (lower.some((t) => t.includes('db') || t.includes('sql') || t.includes('data'))) return Database;
		if (lower.some((t) => t.includes('api') || t.includes('service'))) return Terminal;
		return Globe;
	}

	const DomainIcon = $derived(getDomainIcon(project.tags));
</script>

{#if viewMode === 'list'}
	<!-- Compact Horizontal Row View -->
	<article
		class="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-800/90 bg-slate-900/50 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/80"
	>
		<div class="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
			<div class="h-9 w-9 rounded-lg border border-slate-800 bg-slate-850 flex items-center justify-center shrink-0 text-slate-300">
				<DomainIcon class="h-4 w-4" />
			</div>

			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-center gap-2 mb-1">
					<h3 class="text-base font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors truncate">
						{project.name}
					</h3>
					<span class="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono {currentStatus.bg} {currentStatus.border} {currentStatus.text}">
						<span class="h-1.5 w-1.5 rounded-full {currentStatus.dot}"></span>
						{currentStatus.label}
					</span>
				</div>
				<p class="text-xs text-slate-400 line-clamp-1">
					{project.description}
				</p>
			</div>
		</div>

		<!-- Tags and Actions -->
		<div class="flex flex-wrap items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
			<div class="flex flex-wrap gap-1">
				{#each project.tags.slice(0, 3) as tag}
					<button
						type="button"
						onclick={() => onSelectTag?.(tag)}
						class="rounded px-2 py-0.5 text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-500 hover:text-white transition-colors"
					>
						#{tag}
					</button>
				{/each}
			</div>

			<div class="flex items-center gap-2">
				{#if project.githubUrl}
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="p-1.5 rounded-md border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
						title="Source code on GitHub"
					>
						<Github class="h-3.5 w-3.5" />
					</a>
				{/if}

				{#if project.videoUrl}
					<a
						href={project.videoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="p-1.5 rounded-md border border-rose-900/30 bg-rose-950/20 text-rose-400 hover:bg-rose-950/40 transition-colors"
						title="Demo video"
					>
						<Youtube class="h-3.5 w-3.5" />
					</a>
				{/if}

				{#if project.url}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-slate-950 hover:bg-slate-200 text-xs font-semibold shadow-sm transition-colors"
					>
						<span>Open</span>
						<ExternalLink class="h-3 w-3" />
					</a>
				{/if}
			</div>
		</div>
	</article>
{:else}
	<!-- Grid Card View -->
	<article
		class="group relative flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700/90 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/40"
	>
		<!-- Specular top highlight line -->
		<div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

		<div>
			<!-- Top Meta Header -->
			<div class="mb-4 flex items-center justify-between gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono {currentStatus.bg} {currentStatus.border} {currentStatus.text}"
				>
					<span class="h-1.5 w-1.5 rounded-full {currentStatus.dot}"></span>
					{currentStatus.label}
				</span>

				<button
					type="button"
					onclick={() => copyLink(project.url || project.githubUrl || '')}
					class="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-colors"
					title="Copy link to project"
				>
					{#if copied}
						<Check class="h-3.5 w-3.5 text-emerald-400" />
					{:else}
						<Copy class="h-3.5 w-3.5" />
					{/if}
				</button>
			</div>

			<!-- Project Title & Description -->
			<div class="mb-4">
				<h3 class="text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors line-clamp-1">
					{project.name}
				</h3>
				<p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400 line-clamp-3">
					{project.description}
				</p>
			</div>

			<!-- Technology Tags -->
			<div class="flex flex-wrap gap-1.5 mb-6">
				{#each project.tags as tag}
					<button
						type="button"
						onclick={() => onSelectTag?.(tag)}
						class="rounded-md bg-slate-800/70 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700/60 hover:border-slate-500 hover:text-white transition-colors"
					>
						#{tag}
					</button>
				{/each}
			</div>
		</div>

		<!-- Action Footer -->
		<div class="pt-4 border-t border-slate-800/70 flex items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				{#if project.githubUrl}
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/70 bg-slate-800/60 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
						title="View Source on GitHub"
					>
						<Github class="h-3.5 w-3.5" />
						<span>Code</span>
					</a>
				{/if}

				{#if project.videoUrl}
					<a
						href={project.videoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20 px-2.5 py-1.5 text-xs font-mono text-rose-400 hover:bg-rose-950/40 transition-colors"
						title="Watch Demo Video"
					>
						<Youtube class="h-3.5 w-3.5" />
						<span>Demo</span>
					</a>
				{/if}
			</div>

			{#if project.url}
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm hover:bg-slate-200 transition-colors"
				>
					<span>Open</span>
					<ExternalLink class="h-3.5 w-3.5" />
				</a>
			{/if}
		</div>
	</article>
{/if}
