<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col justify-between">
	<div>
		{@render children()}
	</div>

	<footer class="mt-20 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
		<p>© {new Date().getFullYear()} Project Showcase • Connected to Central Database</p>
	</footer>
</div>
