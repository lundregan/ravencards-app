import { getDrawerStore } from "@skeletonlabs/skeleton";

let drawerStore = null;

const drawSettingsMap = {
    createCard: {
        id: "createCard",
    },
    editCard: {
        id: "editCard",
    },
    createDeck: {
        id: "createDeck",
    },
    editDeck: {
        id: "editDeck",
    },
}

const setDrawerStore = (store) => {
    drawerStore = store;
}

const openDraw = (drawName, meta = {}) => {
    const settings = drawSettingsMap[drawName];

    if(!settings) return;

    if (meta) {
        settings.meta = meta;
    }
    
    drawerStore.open(settings);
}

export {
    setDrawerStore,
    openDraw
};