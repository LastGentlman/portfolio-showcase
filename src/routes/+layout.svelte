<script lang="ts">
	import '../app.css';
	import { ArrowUpRight, ArrowUp, Sun, Moon, Laptop } from 'lucide-svelte';

	let { children } = $props();

	type ThemeMode = 'system' | 'light' | 'dark';
	let themeMode = $state<ThemeMode>('system');
	let isDark = $state(true);

	$effect(() => {
		const saved = (localStorage.getItem('theme') as ThemeMode) || 'system';
		themeMode = saved;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		function applyTheme() {
			const shouldDark = themeMode === 'dark' || (themeMode === 'system' && mediaQuery.matches);
			isDark = shouldDark;
			if (shouldDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}

		applyTheme();

		const listener = () => {
			if (themeMode === 'system') applyTheme();
		};

		mediaQuery.addEventListener('change', listener);
		return () => mediaQuery.removeEventListener('change', listener);
	});

	function cycleTheme() {
		if (themeMode === 'system') {
			themeMode = isDark ? 'light' : 'dark';
		} else if (themeMode === 'light') {
			themeMode = 'dark';
		} else {
			themeMode = 'system';
		}

		localStorage.setItem('theme', themeMode);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const shouldDark = themeMode === 'dark' || (themeMode === 'system' && mediaQuery.matches);
		isDark = shouldDark;
		if (shouldDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="min-h-screen flex flex-col justify-between bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
	<!-- Minimalist Top Navigation -->
	<nav class="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-150">
		<div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
			<a href="/" class="text-sm font-medium text-zinc-900 dark:text-white tracking-tight hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
				LastGentlman
			</a>

			<div class="flex items-center gap-4 text-xs font-mono">
				<a
					href="#catalog"
					class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
				>
					Projects
				</a>
				<a
					href="https://github.com/LastGentlman"
					target="_blank"
					rel="noopener noreferrer"
					class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-0.5"
				>
					<span>GitHub</span>
					<ArrowUpRight class="h-3 w-3" />
				</a>

				<!-- Theme Toggle Button -->
				<button
					type="button"
					onclick={cycleTheme}
					class="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
					title="Theme: {themeMode === 'system' ? 'System (Auto)' : themeMode === 'dark' ? 'Dark' : 'Light'} (click to cycle)"
					aria-label="Toggle theme mode"
				>
					{#if themeMode === 'system'}
						<Laptop class="h-3.5 w-3.5" />
					{:else if themeMode === 'dark'}
						<Moon class="h-3.5 w-3.5" />
					{:else}
						<Sun class="h-3.5 w-3.5" />
					{/if}
				</button>
			</div>
		</div>
	</nav>

	<div class="flex-1">
		{@render children()}
	</div>

	<!-- Minimalist Footer -->
	<footer class="mt-24 border-t border-zinc-200 dark:border-zinc-900 py-10 text-xs font-mono text-zinc-500 transition-colors duration-150">
		<div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p>
				© {new Date().getFullYear()} LastGentlman · Built with SvelteKit & Supabase
			</p>

			<button
				onclick={scrollToTop}
				class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
			>
				<span>Back to top</span>
				<ArrowUp class="h-3 w-3" />
			</button>
		</div>
	</footer>
</div>
