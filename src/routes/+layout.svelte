<script lang="ts">
	import '../app.css';
	import { Github, ArrowUp, Code2, Database } from 'lucide-svelte';

	let { children } = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="min-h-screen flex flex-col justify-between bg-[#090d16] text-slate-100 selection:bg-sky-500/20 selection:text-sky-300">
	<!-- Top Sticky Micro-Navigation -->
	<nav class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
			<a href="/" class="flex items-center gap-2.5 text-sm font-bold text-white tracking-tight hover:text-sky-300 transition-colors">
				<div class="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-mono text-xs font-semibold">
					IR
				</div>
				<span class="font-bold">IngRoy</span>
				<span class="hidden sm:inline-block text-xs font-normal text-slate-400">/ Systems & Portfolio</span>
			</a>

			<div class="flex items-center gap-4 text-xs font-mono">
				<a
					href="#catalog"
					class="text-slate-400 hover:text-white transition-colors"
				>
					Projects
				</a>
				<a
					href="https://github.com/LastGentlman"
					target="_blank"
					rel="noopener noreferrer"
					class="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
				>
					<Github class="h-3.5 w-3.5" />
					<span>GitHub</span>
				</a>
			</div>
		</div>
	</nav>

	<div class="flex-1">
		{@render children()}
	</div>

	<!-- Polished Engineering Footer -->
	<footer class="mt-24 border-t border-slate-800/80 bg-slate-950/60 py-10 text-xs text-slate-500">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-6">
				<div class="space-y-1 text-center sm:text-left">
					<p class="font-mono text-slate-300 font-medium">
						Engineering Portfolio & Systems Showcase
					</p>
					<p class="text-slate-500">
						Powered by SvelteKit 5 (Runes), Tailwind CSS 4, and Supabase.
					</p>
				</div>

				<div class="flex items-center gap-4">
					<a
						href="https://github.com/LastGentlman"
						target="_blank"
						rel="noopener noreferrer"
						class="text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-mono"
					>
						<Github class="h-3.5 w-3.5" />
						<span>LastGentlman</span>
					</a>
					<span class="text-slate-700">•</span>
					<button
						onclick={scrollToTop}
						class="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-mono cursor-pointer"
					>
						<span>Top</span>
						<ArrowUp class="h-3.5 w-3.5" />
					</button>
				</div>
			</div>
		</div>
	</footer>
</div>
