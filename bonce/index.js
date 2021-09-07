let arr = [{
    str: '浙',
    status: true
}, {
    str: 'h',
    status: true
}, {
    str: 'j',
    status: true
}]

const newArr = arr.map(x => {
    return {
        str: x.str != '' && x.str != null ? x.str : ''
    }
})

console.log(newArr);