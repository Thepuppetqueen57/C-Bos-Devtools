#!/usr/bin/env node
const subcommand = process.argv[2]

const fs = require('fs')
const path = require('path')

// const { exec } = require('child_process')
const { spawn } = require('child_process');

if(subcommand == "addpackage") {
    const package = process.argv[3]

    function importpackage(packageName) {
        const filePath = path.join(process.cwd(), 'C-Bos.py')
        const requirements = path.join(process.cwd(), 'requirements.txt')
        const importLine = `import ${packageName}\n`

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err)
                return
            }

            let updatedContent = importLine + data

            fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
                if (err) {
                    console.error('Error adding package:', err)
                } else {
                    console.log(`Successfully added "import ${packageName}" to the top of C-Bos.py`)
                }
            })
        })

        fs.readFile(requirements, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err)
                return
            }

            let updatedContent = packageName + "\n" + data
    
            fs.writeFile(requirements, updatedContent, 'utf8', (err) => {
                if (err) {
                    console.error('Error adding package:', err)
                } else {
                    console.log(`Successfully added ${packageName} to the top of requirements.txt`)
                }
            })
        })
    }

    function installpackage(packageName) {
        const pipcommand = spawn(`pip`, ['install', packageName])

        pipcommand.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
    }

    importpackage(package)
    installpackage(package)
} else {
    console.error("Unknown subcommand")
}