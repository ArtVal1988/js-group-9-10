function User(name, isActive, age, friends) {
  this.name = name;
  this.isActive = isActive;
  this.age = age;
  this.friends = friends;

  this.getUserInfo = function() {
    return `User ${name} is ${age} years old and has ${friends} friends`;
  };
}

const user1 = new User('Bob', true, 14, 24);
console.log(user1.grtUserInfo());

const user2 = new User('Rob', true, 16, 14);
console.log(user2.grtUserInfo());

const user3 = new User('Lol', true, 99, 0);
console.log(user3.grtUserInfo());
