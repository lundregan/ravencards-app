<script lang="js">
    import { db } from "$lib/db";
    import { onMount } from "svelte";

    $: settings = {
        'continuePracticeType': 'lastUsedDeck',
        'dailyPracticeAmount': 0
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

        console.log('Settings loaded');
    };

    const saveSettings = async () => {        
        try {
            Object.keys(settings).forEach(async setting => {
                let res = await db.settings.put({ id: setting, value: settings[setting]});
                console.log(res);
            });
        }catch (e) {
            console.error(e);
        }

        alert('Settings saved');
    };

    onMount(async () => {
        await loadSettings();

        canSave = true;
    });
</script>

<section>
    <div class="flex justify-between">
        <h1 class="text-4xl font-medium" >Settings</h1>
        <button class="btn btn-success" disabled={!canSave} on:click={saveSettings}>Save</button>
    </div>

    <div class="flex flex-col gap-16  mt-8">
        <div>
            <h2 class="text-2xl">Daily Practice</h2>

            <div>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">How do you want to continue practice</span>
                    </div>
                    <select class="select select-bordered" bind:value={settings.continuePracticeType}>
                        <option value="practiceAll">Practice all</option>
                        <option value="lastUsed">Last used deck</option>
                    </select>
                </label>
            </div>

            <div>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">How do you want to continue practice</span>
                    </div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" bind:value={settings.dailyPracticeAmount} />
                </label>
            </div>
        </div>
    </div>
</section>