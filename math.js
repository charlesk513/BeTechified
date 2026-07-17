function add(a, b) {
    if (typeof a != "number" || typeof b != "number") {
        throw new Error("The values passed must be integers")
    }
    return a + b;
}
function subtract(x, y) {
    if (typeof a != "number" || typeof b != "number") {
        console.log("The values passed must be integers")
        return;
    }
    else {
        return a - b;
    }

}
function divide(a, b) {
    if (typeof a != "number" || typeof b != "number") {
        console.log("The values passed must be integers")
        return;
    }
    if (b == 0) {
        console.log("Zero division error!")
        return;
    }
    return a / b;
}


module.exports = { add, subtract, divide };