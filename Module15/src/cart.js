export default class Cart {
  constructor(items = {}) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  add(itemId) {
    this._items[itemId] = this._items[itemId] ? this._items[itemId] + 1 : 1;
  }

  remove(itemId) {
    const { [itemId]: _, ...rest } = this._items;
    this._items = rest;
  }

  total(products) {}
}
