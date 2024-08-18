#!/usr/bin/env node
const subcommand = process.argv[2]

const fs = require('fs')
const path = require('path')

// const { exec } = require('child_process')
const { spawn } = require('child_process')
const { msleep } = require('./lib/mainlib')

if(subcommand == "addpackage") {
    const pkg = process.argv[3]

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
            console.log(`${data}`)
        })
    }

    importpackage(pkg)
    installpackage(pkg)
} else if (subcommand == "help") {
    (async () => {
        console.log("Heres a list of subcommands for the C-Bos Devtools:")
        await msleep(500)
        console.log("1: addpackage (Installs a pip package, imports it in cbos, and adds it to requirements.txt)")
        console.log("To use it run cbosdev addpackage [package-name]")
    })()
} else {
    console.error("Unknown subcommand")
    console.error("Run cbosdev help for a list of subcommands")
}