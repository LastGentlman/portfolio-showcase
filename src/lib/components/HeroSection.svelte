<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';

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

<header class="pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-zinc-900 bg-black">
	<div class="max-w-5xl mx-auto px-6">
		<div class="space-y-6">
			<!-- Quiet developer context -->
			<div class="flex items-center gap-3 text-xs font-mono text-zinc-500">
				<span class="text-zinc-400">LastGentlman</span>
				<span class="text-zinc-700">/</span>
				<span>Engineering Portfolio</span>
			</div>

			<!-- Core Title -->
			<div class="space-y-3 max-w-3xl">
				<h1 class="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
					Software Systems & Selected Work
				</h1>
				<p class="text-base text-zinc-400 leading-relaxed font-normal">
					A curated collection of production platforms, distributed backend services, and developer tools. Focused on performance, architecture, and reliable engineering.
				</p>
			</div>

			<!-- Understated Inline Metrics -->
			<div class="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500">
				<div class="flex items-center gap-2">
					<span class="text-zinc-200 font-medium tabular-nums">{totalProjects}</span>
					<span>Projects</span>
				</div>
				<span class="text-zinc-800 hidden sm:inline">·</span>
				<div class="flex items-center gap-2">
					<span class="text-zinc-200 font-medium tabular-nums">{productionCount}</span>
					<span>Production Ready</span>
				</div>
				<span class="text-zinc-800 hidden sm:inline">·</span>
				<div class="flex items-center gap-2">
					<span class="text-zinc-200 font-medium tabular-nums">{categoriesCount}</span>
					<span>Tech Domains</span>
				</div>
			</div>
		</div>
	</div>
</header>
