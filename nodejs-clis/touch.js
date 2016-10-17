#!/usr/bin/env babel-node 
require('./helper')
let fs = require('fs').promise

async function touch() {
    if(process.argv[2]){
        let fileName = process.argv[2]
        
        try{
            let stat = await fs.stat(fileName)
            await fs.utimes(fileName, new Date(), new Date())   
        } catch(err){
            if(err.code == "ENOENT")
                process.stdout.write("There is no such file\n")
        }
    } else {
        process.stdout.write("Wrong Format.\n")
    }
}

touch()