<script lang="ts">
	import { ArrowUpRight, Copy, Check } from 'lucide-svelte';
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
			}, 1800);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}

	const statusDots: Record<string, string> = {
		Produccion: 'bg-emerald-500',
		Desarrollo: 'bg-amber-500',
		'En Pruebas': 'bg-sky-500',
		Concepto: 'bg-zinc-600'
	};

	const statusLabels: Record<string, string> = {
		Produccion: 'Production',
		Desarrollo: 'Development',
		'En Pruebas': 'Testing',
		Concepto: 'Prototype'
	};
</script>

{#if viewMode === 'list'}
	<!-- Minimalist List Row -->
	<article
		class="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-zinc-900 bg-zinc-950/70 hover:border-zinc-800 transition-colors duration-150"
	>
		<div class="flex-1 min-w-0">
			<div class="flex items-center gap-2.5 mb-1">
				<span class="h-1.5 w-1.5 rounded-full {statusDots[project.status] || 'bg-zinc-600'}"></span>
				<h3 class="text-sm font-medium text-white tracking-tight group-hover:text-zinc-200 transition-colors truncate">
					{project.name}
				</h3>
				<span class="text-[11px] font-mono text-zinc-500">
					{statusLabels[project.status] || project.status}
				</span>
			</div>
			<p class="text-xs text-zinc-400 line-clamp-1">
				{project.description}
			</p>
		</div>

		<div class="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-900">
			<!-- Tags -->
			<div class="flex items-center gap-1.5">
				{#each project.tags.slice(0, 3) as tag}
					<button
						type="button"
						onclick={() => onSelectTag?.(tag)}
						class="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
					>
						#{tag}
					</button>
				{/each}
			</div>

			<!-- Links -->
			<div class="flex items-center gap-3 text-xs font-mono">
				{#if project.githubUrl}
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
					>
						<span>Code</span>
						<ArrowUpRight class="h-3 w-3" />
					</a>
				{/if}

				{#if project.url}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-zinc-200 hover:text-white font-medium transition-colors flex items-center gap-0.5"
					>
						<span>Visit</span>
						<ArrowUpRight class="h-3 w-3" />
					</a>
				{/if}
			</div>
		</div>
	</article>
{:else}
	<!-- Minimalist Grid Card -->
	<article
		class="group flex flex-col justify-between p-5 rounded-lg border border-zinc-900 bg-zinc-950/80 hover:border-zinc-800 transition-colors duration-150"
	>
		<div>
			<!-- Top Meta -->
			<div class="flex items-center justify-between text-xs mb-3">
				<div class="flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full {statusDots[project.status] || 'bg-zinc-600'}"></span>
					<span class="text-[11px] font-mono text-zinc-400">
						{statusLabels[project.status] || project.status}
					</span>
				</div>

				<button
					type="button"
					onclick={() => copyLink(project.url || project.githubUrl || '')}
					class="text-zinc-600 hover:text-zinc-300 transition-colors p-1"
					title="Copy link"
				>
					{#if copied}
						<span class="text-[10px] font-mono text-zinc-400">Copied</span>
					{:else}
						<Copy class="h-3 w-3" />
					{/if}
				</button>
			</div>

			<!-- Title & Description -->
			<h3 class="text-base font-medium text-white tracking-tight group-hover:text-zinc-200 transition-colors">
				{project.name}
			</h3>
			<p class="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
				{project.description}
			</p>

			<!-- Tags -->
			<div class="mt-4 flex flex-wrap gap-x-2 gap-y-1">
				{#each project.tags as tag}
					<button
						type="button"
						onclick={() => onSelectTag?.(tag)}
						class="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
					>
						#{tag}
					</button>
				{/each}
			</div>
		</div>

		<!-- Action Links Footer -->
		<div class="mt-6 pt-3.5 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono">
			<div class="flex items-center gap-3">
				{#if project.githubUrl}
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
					>
						<span>Code</span>
						<ArrowUpRight class="h-3 w-3" />
					</a>
				{/if}

				{#if project.videoUrl}
					<a
						href={project.videoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
					>
						<span>Demo</span>
						<ArrowUpRight class="h-3 w-3" />
					</a>
				{/if}
			</div>

			{#if project.url}
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-zinc-200 hover:text-white font-medium transition-colors flex items-center gap-0.5"
				>
					<span>Visit</span>
					<ArrowUpRight class="h-3.5 w-3.5" />
				</a>
			{/if}
		</div>
	</article>
{/if}
