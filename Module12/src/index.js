const users = [
    {id:1, name:'Vasya', active:true},
    {id:2, name:'Tolya', active:false}
]

const json = JSON.stringify(users);

console.log(json);

const array = JSON.parse(json);

console.log(array);
