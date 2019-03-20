const getUserLocation = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let failed = Math.random() > 0.5;

            failed ? reject('Fuuuuuck!') : resolve('Italy')
        }, 500)
    })
}

export default getUserLocation;