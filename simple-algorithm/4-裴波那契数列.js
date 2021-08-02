function computed(n) {
    if (n === 1 || n === 2) {
        return 1
    }
    return computed(n - 1) + computed(n - 2)
}