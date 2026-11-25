<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Search, X, LayoutGrid, List, ArrowUpDown } from 'lucide-svelte';

	let { data } = $props();

	let searchQuery = $state('');
	let activeTag = $state('All');
	let activeStatus = $state('All');
	let sortBy = $state<'newest' | 'name' | 'status'>('newest');
	let viewMode = $state<'grid' | 'list'>('grid');

	const statusOptions = [
		{ value: 'All', label: 'All' },
		{ value: 'Produccion', label: 'Production' },
		{ value: 'En Pruebas', label: 'Testing' },
		{ value: 'Desarrollo', label: 'Development' },
		{ value: 'Concepto', label: 'Prototype' }
	];

	const availableTags = $derived(['All', ...data.allTags]);

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

<main id="catalog" class="max-w-5xl mx-auto px-6 py-12">
	<!-- Minimalist Control Bar -->
	<section class="space-y-4">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
			<!-- Search Bar -->
			<div class="relative flex-1 max-w-md">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
				<input
					id="project-search-input"
					type="text"
					bind:value={searchQuery}
					placeholder="Search systems, tags or keywords... ( / )"
					class="w-full pl-8 pr-8 py-2 rounded-md border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
						aria-label="Clear search"
					>
						<X class="h-3.5 w-3.5" />
					</button>
				{/if}
			</div>

			<!-- Sort & View Mode Controls -->
			<div class="flex items-center gap-2 self-start sm:self-auto">
				<div class="relative flex items-center">
					<ArrowUpDown class="absolute left-2.5 h-3 w-3 text-zinc-500 pointer-events-none" />
					<select
						bind:value={sortBy}
						class="pl-7 pr-6 py-1.5 rounded-md border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-400 focus:outline-none focus:border-zinc-700 appearance-none cursor-pointer"
					>
						<option value="newest">Sort: Newest</option>
						<option value="name">Sort: Name (A-Z)</option>
						<option value="status">Sort: Status</option>
					</select>
				</div>

				<div class="flex items-center border border-zinc-800 rounded-md p-0.5 bg-zinc-950 text-zinc-500">
					<button
						onclick={() => (viewMode = 'grid')}
						class="p-1 rounded transition-colors {viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-300'}"
						title="Grid View"
						aria-label="Grid View"
					>
						<LayoutGrid class="h-3.5 w-3.5" />
					</button>
					<button
						onclick={() => (viewMode = 'list')}
						class="p-1 rounded transition-colors {viewMode === 'list' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-300'}"
						title="List View"
						aria-label="List View"
					>
						<List class="h-3.5 w-3.5" />
					</button>
				</div>
			</div>
		</div>

		<!-- Status Filter Tabs (Linear-style clean tabs) -->
		<div class="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-mono border-b border-zinc-900 pt-2">
			{#each statusOptions as opt}
				<button
					onclick={() => (activeStatus = opt.value)}
					class="px-2.5 py-1 rounded transition-colors {activeStatus === opt.value ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>

		<!-- Domain / Tech Tag Selector -->
		{#if availableTags.length > 1}
			<div class="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs font-mono scrollbar-none">
				<span class="text-zinc-600 shrink-0 text-[11px]">Domain:</span>
				{#each availableTags as tag}
					<button
						onclick={() => (activeTag = tag)}
						class="shrink-0 text-[11px] px-2 py-0.5 rounded transition-colors {activeTag === tag ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}"
					>
						{tag === 'All' ? 'All' : `#${tag}`}
					</button>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Projects Section -->
	<section class="mt-8">
		<!-- Section Status line -->
		<div class="flex items-center justify-between pb-4 mb-4 text-xs font-mono text-zinc-500 border-b border-zinc-900">
			<span>
				Showing {processedProjects.length} of {data.projects.length} projects
			</span>

			{#if searchQuery || activeTag !== 'All' || activeStatus !== 'All' || sortBy !== 'newest'}
				<button
					onclick={resetFilters}
					class="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
				>
					<X class="h-3 w-3" />
					<span>Reset Filters</span>
				</button>
			{/if}
		</div>

		{#if processedProjects.length > 0}
			{#if viewMode === 'grid'}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each processedProjects as project (project.id)}
						<ProjectCard {project} onSelectTag={handleTagSelect} viewMode="grid" />
					{/each}
				</div>
			{:else}
				<div class="space-y-2">
					{#each processedProjects as project (project.id)}
						<ProjectCard {project} onSelectTag={handleTagSelect} viewMode="list" />
					{/each}
				</div>
			{/if}
		{:else}
			<!-- Minimalist Empty State -->
			<div class="p-12 text-center rounded-lg border border-zinc-900 bg-zinc-950/40">
				<p class="text-sm text-zinc-400">No projects match the active criteria.</p>
				<button
					onclick={resetFilters}
					class="mt-4 text-xs font-mono text-zinc-300 hover:text-white underline underline-offset-4 cursor-pointer"
				>
					Clear filters and search
				</button>
			</div>
		{/if}
	</section>
</main>
