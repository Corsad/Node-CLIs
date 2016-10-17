#!/usr/bin/env babel-node 
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function recursive(dir){
    let stat = await fs.stat(dir)
    if(stat.isDirectory()){
        let fileNames = await fs.readdir(dir)
        fileNames.forEach(function(element) {
            let temp = path.join(dir, element)
            recursive(temp)
        }, this);
    }else {
        process.stdout.write(dir + "\n")    
    }
}

async function ls(){
    if(process.argv[2]){
        let fileName = process.argv[2]
        
        try{
            if(process.argv[3] == "-R"){
                recursive(fileName)
            } else {
                let stat = await fs.stat(fileName)
                if(stat.isDirectory()){
                    let fileNames = await fs.readdir(fileName)
                    fileNames.forEach(function(element) {
                        process.stdout.write(element + "\n")
                    }, this);
                }else {
                    process.stdout.write(fileName + " is a file\n")    
                }
            }
        } catch(err){
            if(err.code == "ENOENT")
                process.stdout.write("There is no such folder\n")
        }
    }else {
        process.stdout.write("Wrong Format.\n")
    }
}

ls()