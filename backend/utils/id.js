module.exports = {
    generateId: (collection) => {
        return collection.length > 0 ? Math.max(...collection.map(i => i.id)) + 1 : 1;
    }
};
