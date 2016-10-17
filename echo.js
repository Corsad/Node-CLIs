#!/usr/bin/env babel-node 
require('./helper')
let fs = require('fs').promise

function echo() {
    let temp = process.argv[2]
    if(temp){
        process.stdout.write(temp + "\n")
    } else {
        process.stdout.write("Wrong format.\n")
    }
}

echo()