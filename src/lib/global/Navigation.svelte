<script>
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
	import GiCardJoker from 'svelte-icons/gi/GiCardJoker.svelte'
	import MdHome from 'svelte-icons/md/MdHome.svelte'
	import MdReplay from 'svelte-icons/md/MdReplay.svelte'
	import MdPermMedia from 'svelte-icons/md/MdPermMedia.svelte'

	import MdSettings from 'svelte-icons/md/MdSettings.svelte'

	import exampleProfile from '$lib/assets/images/profile/guy-3.png';

	import { openDraw } from '$lib/drawer';

	let currentTile = 0;

	let links = [
		{
			name: 'Home',
			href: '/',
			icon: MdHome
		},
		{ 
			name: 'Decks',
			href: '/decks',
			icon: MdPermMedia
		},
		{ 
			name: 'Cards',
			href: '/cards',
			icon: GiCardJoker 
		},
		{ 
			name: 'Review',
			href: '/review',
			icon: MdReplay 
		}
	];
	
	const popupClickCreate = {
		event: 'click',
		target: 'popupClickCreate',
		placement: 'top'
	};
	
	const popupClickProfile = {
		event: 'click',
		target: 'popupClickProfile',
		placement: 'right'
	};
</script>

<nav class="px-4 py-4 bg-zinc-900 h-full flex flex-col justify-between">
	<div class="flex flex-col gap-8">	
		<div>
			<button class="btn flex justify-center w-full" use:popup={popupClickProfile}>
				<Avatar initials="Me" width="w-12" rounded="rounded-full" />
			</button>
			
			<div class="card p-2 variant-outline-primary" data-popup="popupClickProfile">
				<div class="flex flex-col gap-2">
					<a href="/settings" class="btn btn-sm variant-ghost">Settings</a>
				</div>

				<div class="arrow variant-filled-primary" />
			</div>
		</div>

		<div class="flex flex-col gap-4">
			{#each links as link, i}
				<a href={link.href} class="btn btn-sm justify-start hover:variant-soft-primary">
					<span class="w-5 transition-colors" class:text-primary-500={$page.url.pathname === link.href }>
						{#if link.icon}
							<svelte:component this={link.icon} />
						{:else}
							<GiCardJoker />
						{/if}
					</span>
					<span class="font-medium">{link.name}</span>
				</a>
			{/each}
		</div>
	</div>

	<div class="pb-4">
		<button class="btn variant-outline-primary" use:popup={popupClickCreate}>
			<div class="w-4">
				<FaPlus />
			</div>

			<span>Create</span>
		</button>

		<div class="card p-2 variant-outline-primary" data-popup="popupClickCreate">
			<div class="flex flex-col gap-2">
				<button class="btn btn-sm variant-ghost w-32" on:click={() => {openDraw('createCard')}}>New Card</button>
				<button class="btn btn-sm variant-ghost" on:click={() => {openDraw('createDeck')}}>New Deck</button>
			</div>

			<div class="arrow variant-filled-primary" />
		</div>
		
	</div>

	<span class="absolute text-zinc-600 font-medium left-2 bottom-0">0.0.1</span>
</nav>

