<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Search, Filter, Layers, SlidersHorizontal, X } from 'lucide-svelte';

	let { data } = $props();

	let searchQuery = $state('');
	let activeTag = $state('All');
	let activeStatus = $state('All');

	const statuses = ['All', 'Produccion', 'En Pruebas', 'Desarrollo', 'Concepto'];

	const availableTags = $derived(['All', ...data.allTags]);

	const filteredProjects = $derived(
		data.projects.filter((project) => {
			const matchesSearch =
				project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

			const matchesTag =
				activeTag === 'All' ||
				project.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());

			const matchesStatus =
				activeStatus === 'All' || project.status === activeStatus;

			return matchesSearch && matchesTag && matchesStatus;
		})
	);

	function resetFilters() {
		searchQuery = '';
		activeTag = 'All';
		activeStatus = 'All';
	}
</script>

<HeroSection
	totalProjects={data.stats.totalProjects}
	productionCount={data.stats.productionCount}
	categoriesCount={data.stats.categoriesCount}
/>

<main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
	<!-- Search & Filters Bar -->
	<section class="space-y-6">
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
			<!-- Search Input -->
			<div class="relative flex-1 max-w-lg">
				<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
					<Search class="h-4 w-4" />
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search projects by name, keyword, or technology..."
					class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
						aria-label="Clear search"
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>

			<!-- Status Filter Pills -->
			<div class="flex flex-wrap items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 text-xs">
				<span class="text-slate-400 px-2 flex items-center gap-1">
					<SlidersHorizontal class="h-3 w-3" />
					<span>Status:</span>
				</span>
				{#each statuses as status}
					<button
						onclick={() => (activeStatus = status)}
						class="px-2.5 py-1 rounded-lg font-medium transition-colors {activeStatus === status ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}"
					>
						{status}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tag / Topic Filter Pills -->
		{#if availableTags.length > 1}
			<div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
				<span class="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1">
					<Layers class="h-3.5 w-3.5" />
					<span>Filter Tag:</span>
				</span>
				{#each availableTags as tag}
					<button
						onclick={() => (activeTag = tag)}
						class="shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all {activeTag === tag ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300' : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'}"
					>
						{tag}
					</button>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Projects Grid -->
	<section class="mt-8">
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-lg font-semibold text-white flex items-center gap-2">
				<span>Featured Projects</span>
				<span class="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
					{filteredProjects.length}
				</span>
			</h2>

			{#if searchQuery || activeTag !== 'All' || activeStatus !== 'All'}
				<button
					onclick={resetFilters}
					class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
				>
					<X class="h-3.5 w-3.5" />
					<span>Reset Filters</span>
				</button>
			{/if}
		</div>

		{#if filteredProjects.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredProjects as project (project.id)}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<div class="rounded-2xl border border-dashed border-slate-800 p-12 text-center bg-slate-900/30">
				<Layers class="mx-auto h-10 w-10 text-slate-500 mb-3" />
				<h3 class="text-base font-medium text-slate-300">No projects found</h3>
				<p class="mt-1 text-sm text-slate-500">
					Try clearing your search query or choosing another tag filter.
				</p>
				<button
					onclick={resetFilters}
					class="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-500"
				>
					Reset Filters
				</button>
			</div>
		{/if}
	</section>
</main>
