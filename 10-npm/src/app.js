const shortid = require('shortid');

const id = shortid.generate();

console.log(id);


const add = (a, b) => a + b;
add(3, 5);

class User {
    static types = {
        hello: 'Hello type'
    };
    constructor(name = "") {
        this._name = name;
    }

    set name(newName) {
        this._name = newName;
    }
    get name() {
        return this._name;
    }
}

const user = new User('Mango');

console.log(user.name)