#!/usr/bin/env babel-node 
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function recursive(curDir, nextDir){
    // console.log(curDir)
    // console.log(nextDir)
    // Case "./test/123"
    if(nextDir[0] == "."){
        nextDir.shift()
        recursive("./",nextDir)
    } 
    // Case "/home/user/12312..."
    // Need to improve this to remove case "test/123" being saved in root 
    else if( nextDir[0] == ""){
        nextDir.shift()
        recursive("/",nextDir)    
    }  
    else {
        if(nextDir.length > 0){
            let temp = path.join(curDir, nextDir[0])
            nextDir.shift()
            try {
                let stat = await fs.stat(temp)
                    if(stat.isDirectory){
                        recursive(temp,nextDir)
                    } else {
                        process.stdout.write("A location on path is a file\n")    
                    }
            } catch (err) {
                if(err.code == "ENOENT"){
                    await fs.mkdir(temp)
                    recursive(temp,nextDir)
                }
            }            
        }
    }
}

async function mkdir() {
    if(process.argv[2]){
        let fileName = process.argv[2]    
        try{
            let stat = await fs.stat(fileName)
            process.stdout.write("File exist\n")
        } catch(err){
            if(err.code == "ENOENT"){
                let dir = fileName.split("/")
                recursive("",dir)
            }
        }
    } else {
        process.stdout.write("Wrong Format.\n")
    }
}

mkdir()