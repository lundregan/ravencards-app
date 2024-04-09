<script lang="ts">
	import { onMount } from 'svelte';

	import { ConicGradient } from '@skeletonlabs/skeleton';
	import MdReplay from 'svelte-icons/md/MdReplay.svelte'

	$: notStartedEnd = data.cardProgressCounts.notStarted / (data.cardProgressCounts.notStarted + data.cardProgressCounts.learning + data.cardProgressCounts.mastered) * 100 || 0;  // Handle potential division by zero
	$: learningEnd = notStartedEnd + data.cardProgressCounts.learning / (data.cardProgressCounts.notStarted + data.cardProgressCounts.learning + data.cardProgressCounts.mastered) * 100 || 0;; 

	$: conicStops = [
		{ label: 'Not started', color: ['gray', 500], start: 0, end: notStartedEnd },
		{ label: 'Learning', color: ['yellow', 500], start: notStartedEnd, end: learningEnd },
		{ label: 'Mastered', color: ['green', 500], start: learningEnd, end: 100 }
	];

	export let data;
</script>

<div class="container mx-auto flex flex-col gap-16 h-full">
	<div>
		<span class="text-gray-300">Hey {data.username || 'User'}, Welcome back!</span>
		<h1 class="text-3xl">Dashboard</h1>
	</div>

	<div class="flex items-center justify-center h-full">
		<div class="max-w-xs">
			{#if conicStops}
				<ConicGradient stops={conicStops} legend>Card Progress</ConicGradient>
			{/if}

			<a href="/review" class="btn variant-outline-primary w-full mt-8">
				<div class="w-6">
					<MdReplay />
				</div>
				<span class="font-bold">Review</span>
			</a>
		</div>
	</div>
</div>
