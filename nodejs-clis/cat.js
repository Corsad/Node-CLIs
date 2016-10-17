#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

async function cat() {
    if(process.argv[2]){
        let fileName = process.argv[2]

        try{
            let stat = await fs.stat(fileName)
            if(!stat.isDirectory()){
                let content = await fs.readFile(fileName)
                process.stdout.write(content + "\n")
            }else {
                process.stdout.write(fileName + "is a directory\n")
            }
        } catch(err){
            if(err.code == "ENOENT")
                process.stdout.write("There is no such file\n")
        }
    }else {
        process.stdout.write("Wrong Format.\n")
    }
}

cat()
