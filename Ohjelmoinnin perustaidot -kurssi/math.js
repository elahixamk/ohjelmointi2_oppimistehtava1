"use strict";
const fs = require("fs");
const x = 2;
let y = 4;
y += x
y += y
console.log(x + y);
fs.writeFileSync("text.txt", JSON.stringify(x + y))
//let
//var
