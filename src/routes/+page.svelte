<script lang="ts">
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import MdReplay from 'svelte-icons/md/MdReplay.svelte'

	const conicStops: ConicStop[] = [
		{ label: 'Not started', color: ['gray', 500], start: 0, end: 76 },
		{ label: 'Learning', color: ['yellow', 500], start: 76, end: 98 },
		{ label: 'Mastered', color: ['green', 500], start: 95, end: 100 }
	];

	export let data;
</script>

<div class="container mx-auto flex flex-col gap-16 h-full">
	<div>
		<span class="text-gray-300">Hey Ethan, Welcome back!</span>
		<h1 class="text-3xl">Dashboard</h1>
	</div>

	<div class="flex items-center justify-center h-full">
		<div class="max-w-xs">
			<ConicGradient stops={conicStops} legend>Card Progress</ConicGradient>
		
			<a href="/review" class="btn variant-outline-primary w-full mt-8">
				<div class="w-6">
					<MdReplay />
				</div>
				<span class="font-bold">Review</span>
			</a>
		</div>
	</div>
</div>
