const goRace = (name, delay = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Car ${name} finished in ${delay}ms`);
        }, delay)
    })
};

const carA = goRace('car-1', 500);

carA.then(console.log);