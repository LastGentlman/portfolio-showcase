<script lang="ts">
	import { Briefcase, Code2, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-svelte';

	interface Props {
		totalProjects?: number;
		productionCount?: number;
		categoriesCount?: number;
	}

	let {
		totalProjects = 0,
		productionCount = 0,
		categoriesCount = 0
	}: Props = $props();
</script>

<header class="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 md:py-20">
	<!-- Background glow circles -->
	<div class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[36rem] rounded-full bg-indigo-600/15 blur-3xl"></div>
	<div class="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
			<!-- Bio & Title -->
			<div class="max-w-2xl">
				<div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 mb-4">
					<Sparkles class="h-3.5 w-3.5" />
					<span>Engineering Portfolio & Project Showcase</span>
				</div>

				<h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
					Software Systems, Tools & Full-Stack Projects
				</h1>

				<p class="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
					A curated showcase of production applications, developer tools, distributed services, and experiments built with modern architectures.
				</p>
			</div>

			<!-- Quick Stats Cards -->
			<div class="grid grid-cols-3 gap-3 sm:gap-4 w-full md:w-auto">
				<div class="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center backdrop-blur-sm">
					<div class="flex justify-center mb-1 text-indigo-400">
						<FolderGit2 class="h-5 w-5" />
					</div>
					<div class="text-2xl font-bold text-white">{totalProjects}</div>
					<div class="text-xs text-slate-400">Projects</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center backdrop-blur-sm">
					<div class="flex justify-center mb-1 text-emerald-400">
						<CheckCircle2 class="h-5 w-5" />
					</div>
					<div class="text-2xl font-bold text-white">{productionCount}</div>
					<div class="text-xs text-slate-400">Production</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center backdrop-blur-sm">
					<div class="flex justify-center mb-1 text-cyan-400">
						<Code2 class="h-5 w-5" />
					</div>
					<div class="text-2xl font-bold text-white">{categoriesCount}</div>
					<div class="text-xs text-slate-400">Tags / Topics</div>
				</div>
			</div>
		</div>
	</div>
</header>
