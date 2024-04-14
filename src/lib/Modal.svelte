<script>
    import { Modal } from '@skeletonlabs/skeleton';

    import ModalComponentOne from '$lib/modals/HelpModal.svelte';

    const modalRegistry = {
        modalComponentOne: { ref: ModalComponentOne },
    };
</script>

<Modal components={modalRegistry} />