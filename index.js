// we have 2 types of js ie; Commonjs and module 
// module uses import and export to allow modular programming
//import {function names} from file-name;
//commonjs uses modile.exports and then require method and its the default type used
const math = require('./math.js')


console.log(math.divide(1, 10));