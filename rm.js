#!/usr/bin/env babel-node 
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function recursive(dir){    
    let stat = await fs.stat(dir)
    if(stat.isDirectory()){
            let fileNames = await fs.readdir(dir)
            // It keep going straight to rmdir before finished recursive(temp)
            // Therefore it only be able to delete the last level
            fileNames.forEach(function(element) {
                let temp = path.join(dir, element)
                recursive(temp)
            })

            fs.rmdir(dir)            
    }else {
        fs.unlink(dir)
    }
}

function rm(){
    if(process.argv[2]){
        let fileName = process.argv[2]
        recursive(fileName)
    } else {
        process.stdout.write("Wrong Format.\n")
    }
}

rm()