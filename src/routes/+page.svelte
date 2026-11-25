<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Search, SlidersHorizontal, X, LayoutGrid, List, ArrowUpDown, Filter, Sparkles } from 'lucide-svelte';

	let { data } = $props();

	let searchQuery = $state('');
	let activeTag = $state('All');
	let activeStatus = $state('All');
	let sortBy = $state<'newest' | 'name' | 'status'>('newest');
	let viewMode = $state<'grid' | 'list'>('grid');

	const statusOptions = [
		{ value: 'All', label: 'All Projects' },
		{ value: 'Produccion', label: 'Production' },
		{ value: 'En Pruebas', label: 'Testing' },
		{ value: 'Desarrollo', label: 'Development' },
		{ value: 'Concepto', label: 'Prototype' }
	];

	const availableTags = $derived(['All', ...data.allTags]);

	// Calculate counts for each status
	const statusCounts = $derived.by(() => {
		const counts: Record<string, number> = { All: data.projects.length };
		for (const opt of statusOptions) {
			if (opt.value !== 'All') {
				counts[opt.value] = data.projects.filter((p) => p.status === opt.value).length;
			}
		}
		return counts;
	});

	// Filtered and sorted projects
	const processedProjects = $derived.by(() => {
		let list = data.projects.filter((project) => {
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch =
				!query ||
				project.name.toLowerCase().includes(query) ||
				project.description.toLowerCase().includes(query) ||
				project.tags.some((t) => t.toLowerCase().includes(query));

			const matchesTag =
				activeTag === 'All' ||
				project.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());

			const matchesStatus =
				activeStatus === 'All' || project.status === activeStatus;

			return matchesSearch && matchesTag && matchesStatus;
		});

		// Sort
		if (sortBy === 'name') {
			list = [...list].sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortBy === 'status') {
			list = [...list].sort((a, b) => a.status.localeCompare(b.status));
		} else {
			// newest
			list = [...list].sort(
				(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		}

		return list;
	});

	function resetFilters() {
		searchQuery = '';
		activeTag = 'All';
		activeStatus = 'All';
		sortBy = 'newest';
	}

	function handleTagSelect(tag: string) {
		activeTag = tag;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
			e.preventDefault();
			const el = document.getElementById('project-search-input') as HTMLInputElement | null;
			el?.focus();
		} else if (e.key === 'Escape') {
			searchQuery = '';
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<HeroSection
	totalProjects={data.stats.totalProjects}
	productionCount={data.stats.productionCount}
	categoriesCount={data.stats.categoriesCount}
/>

<main id="catalog" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
	<!-- Control Bar & Search -->
	<section class="space-y-5">
		<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
			<!-- Search Bar -->
			<div class="relative flex-1 max-w-xl">
				<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
					<Search class="h-4 w-4" />
				</div>
				<input
					id="project-search-input"
					type="text"
					bind:value={searchQuery}
					placeholder="Search by project name, description or tech stack... (Press / to focus)"
					class="w-full pl-10 pr-16 py-2.5 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-700 transition-all shadow-inner"
				/>
				<div class="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
					{#if searchQuery}
						<button
							onclick={() => (searchQuery = '')}
							class="p-1 rounded text-slate-400 hover:text-white"
							aria-label="Clear search"
						>
							<X class="h-4 w-4" />
						</button>
					{:else}
						<span class="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-800 text-slate-500 bg-slate-950/60">
							/
						</span>
					{/if}
				</div>
			</div>

			<!-- View & Sort Controls -->
			<div class="flex items-center gap-2.5 self-start lg:self-auto">
				<!-- Sort Selector -->
				<div class="relative flex items-center">
					<ArrowUpDown class="absolute left-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
					<select
						bind:value={sortBy}
						class="pl-8 pr-7 py-2 rounded-lg border border-slate-800 bg-slate-900/70 text-xs font-mono text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 appearance-none cursor-pointer"
					>
						<option value="newest">Sort: Newest</option>
						<option value="name">Sort: Name (A-Z)</option>
						<option value="status">Sort: Status</option>
					</select>
				</div>

				<!-- Grid / List Toggle -->
				<div class="flex items-center bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 text-slate-400">
					<button
						onclick={() => (viewMode = 'grid')}
						class="p-1.5 rounded-md transition-colors {viewMode === 'grid' ? 'bg-slate-800 text-white shadow-xs' : 'hover:text-slate-200'}"
						title="Grid View"
						aria-label="Grid View"
					>
						<LayoutGrid class="h-3.5 w-3.5" />
					</button>
					<button
						onclick={() => (viewMode = 'list')}
						class="p-1.5 rounded-md transition-colors {viewMode === 'list' ? 'bg-slate-800 text-white shadow-xs' : 'hover:text-slate-200'}"
						title="List View"
						aria-label="List View"
					>
						<List class="h-3.5 w-3.5" />
					</button>
				</div>
			</div>
		</div>

		<!-- Status Filter Tabs -->
		<div class="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
			<span class="text-slate-500 font-mono text-[11px] uppercase tracking-wider mr-1 hidden sm:inline">
				Status:
			</span>
			{#each statusOptions as opt}
				{@const count = statusCounts[opt.value] || 0}
				<button
					onclick={() => (activeStatus = opt.value)}
					class="px-2.5 py-1 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 {activeStatus === opt.value ? 'bg-slate-100 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 bg-slate-900/50 border border-slate-800/80'}"
				>
					<span>{opt.label}</span>
					<span class="text-[10px] opacity-75">({count})</span>
				</button>
			{/each}
		</div>

		<!-- Tags Filter Chips -->
		{#if availableTags.length > 1}
			<div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
				<span class="text-slate-500 font-mono text-[11px] uppercase tracking-wider mr-1 shrink-0 hidden sm:inline">
					Domain:
				</span>
				{#each availableTags as tag}
					<button
						onclick={() => (activeTag = tag)}
						class="shrink-0 px-2.5 py-0.5 rounded-md text-[11px] font-mono border transition-all {activeTag === tag ? 'border-sky-500/50 bg-sky-500/10 text-sky-300' : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'}"
					>
						{tag === 'All' ? 'All Tags' : `#${tag}`}
					</button>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Projects Section -->
	<section class="mt-8">
		<!-- Section Header with active filters count -->
		<div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/60 text-xs">
			<div class="flex items-center gap-2">
				<span class="font-mono text-slate-400">
					Showing <span class="text-white font-semibold">{processedProjects.length}</span> of {data.projects.length} projects
				</span>
			</div>

			{#if searchQuery || activeTag !== 'All' || activeStatus !== 'All' || sortBy !== 'newest'}
				<button
					onclick={resetFilters}
					class="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono transition-colors"
				>
					<X class="h-3.5 w-3.5" />
					<span>Clear Filters</span>
				</button>
			{/if}
		</div>

		{#if processedProjects.length > 0}
			{#if viewMode === 'grid'}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{#each processedProjects as project (project.id)}
						<ProjectCard {project} onSelectTag={handleTagSelect} viewMode="grid" />
					{/each}
				</div>
			{:else}
				<div class="space-y-3">
					{#each processedProjects as project (project.id)}
						<ProjectCard {project} onSelectTag={handleTagSelect} viewMode="list" />
					{/each}
				</div>
			{/if}
		{:else}
			<!-- Empty State -->
			<div class="rounded-xl border border-dashed border-slate-800 p-12 text-center bg-slate-900/20">
				<Filter class="mx-auto h-8 w-8 text-slate-600 mb-3" />
				<h3 class="text-base font-medium text-slate-300">No matching projects found</h3>
				<p class="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
					No projects match your current filter combination. Try clearing your search query or selecting a different status or domain.
				</p>
				<button
					onclick={resetFilters}
					class="mt-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-950 hover:bg-white transition-all shadow-xs"
				>
					Reset all filters
				</button>
			</div>
		{/if}
	</section>
</main>
