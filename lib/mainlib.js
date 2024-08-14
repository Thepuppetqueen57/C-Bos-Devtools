// This file isnt meant to be used outside of the devtools
// But feel free to use these functions I guess

function msleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = { msleep };