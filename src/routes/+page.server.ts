import { getProjects } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const selectedTag = url.searchParams.get('tag') || undefined;
	const { projects, allTags } = await getProjects(selectedTag);

	const productionCount = projects.filter((p) => p.status === 'Produccion').length;

	return {
		projects,
		allTags,
		selectedTag: selectedTag || 'All',
		stats: {
			totalProjects: projects.length,
			productionCount,
			categoriesCount: allTags.length
		}
	};
};
