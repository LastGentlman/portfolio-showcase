<script lang="ts">
	import '../app.css';
	import { ArrowUpRight, ArrowUp } from 'lucide-svelte';

	let { children } = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="min-h-screen flex flex-col justify-between bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white">
	<!-- Minimalist Top Navigation -->
	<nav class="sticky top-0 z-40 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
		<div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
			<a href="/" class="text-sm font-medium text-white tracking-tight hover:text-zinc-300 transition-colors">
				LastGentlman
			</a>

			<div class="flex items-center gap-5 text-xs font-mono">
				<a
					href="#catalog"
					class="text-zinc-400 hover:text-white transition-colors"
				>
					Projects
				</a>
				<a
					href="https://github.com/LastGentlman"
					target="_blank"
					rel="noopener noreferrer"
					class="text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
				>
					<span>GitHub</span>
					<ArrowUpRight class="h-3 w-3" />
				</a>
			</div>
		</div>
	</nav>

	<div class="flex-1">
		{@render children()}
	</div>

	<!-- Minimalist Footer -->
	<footer class="mt-24 border-t border-zinc-900 py-10 text-xs font-mono text-zinc-500">
		<div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p>
				© {new Date().getFullYear()} LastGentlman · Built with SvelteKit & Supabase
			</p>

			<button
				onclick={scrollToTop}
				class="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
			>
				<span>Back to top</span>
				<ArrowUp class="h-3 w-3" />
			</button>
		</div>
	</footer>
</div>
