const promise = new Promise((resolve, reject) => {
    resolve()
})
promise.then((resolve, reject) => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    }).catch(() => {
        console.log(2);
    })
    .then(() => {
        console.log(1);
    })