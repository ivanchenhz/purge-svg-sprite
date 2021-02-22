const yargs = require('yargs')
const purgeSvgSprite = require('./index')

// noinspection BadExpressionStatementJS
yargs
    .usage('$0 [args]')
    .command(
        '*',
        'Sort of like purge css, will purge the unused symbols in svg sprite...',
        (args) => {
            return args
                .option('input', {
                    alias: 'i',
                    type: 'string',
                    describe: 'path for the original svg sprite',
                })
                .option('output', {
                    alias: 'o',
                    type: 'string',
                    describe: 'path for the purged svg sprite',
                })
                .option('content', {
                    alias: 'c',
                    type: 'string',
                    array: true,
                    required: true,
                    describe: 'glob for matching source files',
                })
        },
        async (args) => {
            const {input, output, content} = args
            purgeSvgSprite(input, output, content)
        },
    )
    .help()
    .argv
