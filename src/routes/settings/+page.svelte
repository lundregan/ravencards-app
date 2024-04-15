<script lang="js">
    import { db } from "$lib/db";
    import { onMount } from "svelte";
    import { getToastStore, SlideToggle } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();

    const toastSettingsSaveSuccess = {
        message: 'Settings have been successfully saved!',
        background: 'variant-filled-success',
    };

    $: settings = {
        'username': 'username',
        'showNextReviewDateToast': true,
    };

    $: canSave = false;

    const loadSettings = async () => {        
        try {
            Object.keys(settings).forEach(async setting => {
                let res = await db.settings.get(setting);
                if(res) {
                    settings[setting] = `${res.value}`;
                }
            });
        }catch (e) {
            console.error(e);
        }
    };

    const saveSettings = async () => {        
        try {
            Object.keys(settings).forEach(async setting => {
                let res = await db.settings.put({ id: setting, value: settings[setting]});
            });
        }catch (e) {
            console.error(e);
        }

        
        toastStore.trigger(toastSettingsSaveSuccess);
    };

    onMount(async () => {
        await loadSettings();

        canSave = true;
    });
</script>

<section>
    <div class="flex justify-between">
        <h1 class="text-4xl font-medium" >Settings</h1>
        <button class="btn btn-sm variant-filled-success" disabled={!canSave} on:click={saveSettings}>Save</button>
    </div>

    <span class="text-zinc-400 font-medium">Version: 0.0.1</span>

    <div class="flex flex-col gap-16 mt-8">
        <div>
            <h2 class="h2 mb-4">General</h2>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">What should we call you?</span>
                </div>
                <input type="text" placeholder="User" class="input input-bordered w-full max-w-xs" bind:value={settings.username} maxlength="32" />
            </label>
        </div>

        <div>
            <h2 class="h2 mb-4">Review</h2>
            <SlideToggle name="slide" bind:checked={settings.showNextReviewDateToast} active="bg-primary-500">Show next review date popup</SlideToggle>
        </div>
    </div>
</section>