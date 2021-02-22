const fg = require('fast-glob')
const fs = require('fs-extra')
const xml2js = require('xml2js')

async function getSvgSprite (input) {
    const inputFile = await fs.readFile(input, 'utf-8')
    return await xml2js.parseStringPromise(inputFile)
}

async function getContentFiles (content) {
    const filenames = await fg(content, {
        onlyFiles: true,
    })

    return filenames
}

function getSvgSymbols (svgSprite) {
    return svgSprite.svg.symbol.map(_ => _.$.id)
}

async function getKeepSymbols (contentFiles, svgSymbols) {
    const keepSymbols = new Set()

    for (const file of contentFiles) {
        const content = await fs.readFile(file, 'utf-8')

        svgSymbols.forEach(symbol => {
            if (content.includes(symbol)) {
                keepSymbols.add(symbol)
            }
        })
    }

    return keepSymbols
}

function purgeSprite (svgSprite, keepSymbols) {
    svgSprite.svg.symbol = svgSprite.svg.symbol.filter(symbol => keepSymbols.has(symbol.$.id))
    return svgSprite
}

async function writeSvgSprite(output, svgSprite) {
    const builder = new xml2js.Builder();
    const outputFile = builder.buildObject(svgSprite);

    return await fs.writeFile(output, outputFile)
}

async function purgeSvgSprite (input, output, content) {
    const svgSprite = await getSvgSprite(input)
    const contentFiles = await getContentFiles(content)
    const keepSymbols = await getKeepSymbols(contentFiles, getSvgSymbols(svgSprite))
    const purgedSprite = purgeSprite(svgSprite, keepSymbols)
    await writeSvgSprite(output, purgedSprite)
}

module.exports = purgeSvgSprite