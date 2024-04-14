<script>
    import { Modal } from '@skeletonlabs/skeleton';

    import modalComponentHelp from '$lib/modals/HelpModal.svelte';

    const modalRegistry = {
        modalComponentHelp: { ref: modalComponentHelp },
    };
</script>

<Modal components={modalRegistry} />