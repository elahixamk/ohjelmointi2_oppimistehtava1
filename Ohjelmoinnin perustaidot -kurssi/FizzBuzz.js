/*
    Tee looppi numeroista 0-100
    Jos numero on jaollinen kolmella, tulosta "Fizz"
    Jos numero on jaollinen viidellä, tulosta "Buzz"
    Jos molemmat toteutuvat, tulosta "FizzBuzz"
    Jos mikään ehdoista ei toteudu, tulosta numero itse.
*/

"use strict"
for (let i = 0; i <= 100; i ++) {
    if (i % 3 == 0) {
        console.log("Fizz")
    } if (i % 5 == 0) {
        console.log("Buzz")
    } if (i % 3 == 0 && i % 5 == 0) {
        console.log("FizzBuzz")
    } else {
        console.log(i)
    }
}
