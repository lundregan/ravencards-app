<script>
    import { getModalStore } from '@skeletonlabs/skeleton';
    import MdClose from 'svelte-icons/md/MdClose.svelte'
    
    const modalStore = getModalStore();

    const closeModal = () => {
        modalStore.close();
    }
</script>

<div class="bg-surface-800 w-screen h-screen sm:w-[75vw] sm:h-[75vh] overflow-y-scroll p-4 sm:px-10 rounded">
    <button class="btn btn-sm -translate-x-3" on:click={closeModal}><div class="w-8"><MdClose /></div></button> 
    
    <div class="prose prose-invert mt-8">
        <h1>Guide</h1>

        <div>
            <h2>How it Works</h2>
            <ul>
                <li><strong>Create Your Study Tools</strong><br />Make flashcards with questions on one side and answers on the other. Organize your flashcards into decks based on the subjects you want to learn.</li>
                <li><strong>Smart Review Sessions</strong><br />Ravencards will show you cards for review each day. It focuses on the cards you find difficult, showing them more often until you've mastered them.</li>
            </ul>
        </div>

        <div>
            <h2>Getting started</h2>
            <ol>
                <li><strong>Create Cards</strong> with questions and answers.</li>
                <li><strong>Create Decks</strong> by organizing them into decks based on topics.</li>
                <li><strong>Review</strong> to learn the cards, which will be shown to you for review every day. Cards you find difficult with will appear more frequently until you mark them as "Easy", "Medium", or "Hard".</li>
            </ol>
        </div>

        <div>
            <h2>Key Terms</h2>
            <ul>
                <li><strong>Card:</strong> A single flashcard with a question and its corresponding answer.</li>
                <li><strong>Deck:</strong> A collection of related flashcards, usually focusing on a specific topic or subject.</li>
                <li><strong>Review:</strong> The process of going through your flashcards to test your knowledge and reinforce your memory.</li>
            </ul>
        </div>
    </div>
</div>