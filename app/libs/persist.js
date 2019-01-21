export default function(alt, storage, storageName) {
    try {
        alt.bootstrap(storage.get(storageName));
    }
    catch (error) {
        console.error('Failed to bootstrap data', error);
    }

    alt.FinalStore.listen(() => {
        if (!storage.get('degbug')) {
            storage.set(storageName, alt.takeSnapshot());
        }
    })
}