<script lang="ts">
	import { FolderGit2, CheckCircle2, Tags, Github, ArrowDown, Terminal } from 'lucide-svelte';

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

<header class="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-[#090d16] pt-12 pb-16 md:pt-16 md:pb-20">
	<!-- Subtle ambient illumination with depth -->
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]"></div>

	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- Developer metadata header -->
		<div class="flex items-center justify-between pb-6 mb-8 border-b border-slate-800/60 text-xs">
			<div class="flex items-center gap-2.5">
				<span class="relative flex h-2 w-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
				</span>
				<span class="font-mono text-slate-300">LastGentlman</span>
				<span class="text-slate-600">/</span>
				<span class="text-slate-400 font-medium">Software Engineering Portfolio</span>
			</div>

			<div class="flex items-center gap-3">
				<a
					href="https://github.com/LastGentlman"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-mono"
				>
					<Github class="h-3.5 w-3.5" />
					<span>GitHub</span>
				</a>
			</div>
		</div>

		<!-- Main Hero Body -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
			<div class="lg:col-span-7 space-y-4">
				<h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
					Production Systems, Developer Tooling & Full-Stack Projects
				</h1>

				<p class="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
					A comprehensive technical portfolio featuring live deployed applications, distributed microservices, cloud automations, and developer utilities.
				</p>

				<div class="pt-2 flex flex-wrap items-center gap-3">
					<a
						href="#catalog"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-950 font-semibold text-xs hover:bg-white transition-all shadow-sm active:translate-y-px"
					>
						<span>Explore Projects</span>
						<ArrowDown class="h-3.5 w-3.5" />
					</a>
					<span class="text-xs font-mono text-slate-500 flex items-center gap-1.5">
						<Terminal class="h-3.5 w-3.5" />
						<span>Syncs live with Supabase registry</span>
					</span>
				</div>
			</div>

			<!-- Quick Stat Counters -->
			<div class="lg:col-span-5 grid grid-cols-3 gap-2.5 sm:gap-3">
				<div class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all hover:border-slate-700/80">
					<div class="flex items-center justify-between text-slate-400 mb-2">
						<span class="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total</span>
						<FolderGit2 class="h-4 w-4 text-slate-400" />
					</div>
					<div class="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
						{totalProjects}
					</div>
					<div class="mt-1 text-[11px] text-slate-500">Catalogued</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all hover:border-slate-700/80">
					<div class="flex items-center justify-between text-emerald-400 mb-2">
						<span class="text-[11px] font-mono uppercase tracking-wider text-slate-400">Live</span>
						<CheckCircle2 class="h-4 w-4 text-emerald-400" />
					</div>
					<div class="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-400 tabular-nums">
						{productionCount}
					</div>
					<div class="mt-1 text-[11px] text-slate-500">Production ready</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all hover:border-slate-700/80">
					<div class="flex items-center justify-between text-sky-400 mb-2">
						<span class="text-[11px] font-mono uppercase tracking-wider text-slate-400">Tags</span>
						<Tags class="h-4 w-4 text-sky-400" />
					</div>
					<div class="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-sky-400 tabular-nums">
						{categoriesCount}
					</div>
					<div class="mt-1 text-[11px] text-slate-500">Tech domains</div>
				</div>
			</div>
		</div>
	</div>
</header>
