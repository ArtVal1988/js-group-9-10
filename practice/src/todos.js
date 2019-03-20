const todos = {
    items: ['item-1', 'item-2'],
    add(item) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.items.push(item);
                resolve(item)
            }, 1000)
        })

    },
    delete(item) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.items = this.items.filter(i => i !== item)
                resolve(this.items)
            }, 1000)
        })
    }
};

export default todos;