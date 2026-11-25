<script lang="ts">
	import { ExternalLink, Github, Youtube, Sparkles, Activity } from 'lucide-svelte';
	import type { ProjectTool } from '$lib/server/db';

	interface Props {
		project: ProjectTool;
	}

	let { project }: Props = $props();

	const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
		Produccion: { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400' },
		Desarrollo: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400' },
		'En Pruebas': { bg: 'bg-cyan-500/10 border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-400' },
		Concepto: { bg: 'bg-purple-500/10 border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-400' }
	};

	const statusStyle = $derived(
		statusColors[project.status] || {
			bg: 'bg-slate-500/10 border-slate-500/30',
			text: 'text-slate-400',
			dot: 'bg-slate-400'
		}
	);
</script>

<article
	class="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
>
	<div>
		<!-- Top Meta: Status and Tags -->
		<div class="mb-4 flex flex-wrap items-center justify-between gap-2">
			<span
				class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium {statusStyle.bg} {statusStyle.text}"
			>
				<span class="h-1.5 w-1.5 rounded-full {statusStyle.dot}"></span>
				{project.status}
			</span>

			<div class="flex flex-wrap gap-1.5">
				{#each project.tags as tag}
					<span
						class="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>

		<!-- Title & Description -->
		<div class="mb-4">
			<h3 class="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
				{project.name}
			</h3>
			<p class="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">
				{project.description}
			</p>
		</div>
	</div>

	<!-- Bottom: Links & Actions -->
	<div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
		<div class="flex items-center gap-2">
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/70 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
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
					class="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
					title="Watch Demo Video"
				>
					<Youtube class="h-3.5 w-3.5" />
					<span>Video</span>
				</a>
			{/if}
		</div>

		{#if project.url}
			<a
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
			>
				<span>Live Project</span>
				<ExternalLink class="h-3.5 w-3.5" />
			</a>
		{/if}
	</div>
</article>
