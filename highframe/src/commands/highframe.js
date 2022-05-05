const c = require('colors')

const command = {
  name: 'highframe',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info(`
    *✲*´*。.❄¯*✲。❄。*¨\`*✲´*。❄¨\`*✲。❄。*\`*
    *╔════════════ ༺❀༻❤༺❀༻ ════════════╗*
    *♥*❄¯*✲❄♫♪♩░H░I░G░H░F░R░A░M░E░ ♫♫♪❄¯*✲❄
    *╚════════════ ༺❀༻❤༺❀༻ ════════════╝*
    *✲*´*。.❄¯*✲。❄。*¨\`*✲´*。❄¨\`*✲。❄。*\`*
  \n\n\n`)

    print.info(`    CLI Originalizada para projetos HighFrame\n`)
    print.info(
      `    para obter ajuda use ` + c.yellow(`highframe `) + c.gray(`--help`)
    )
  },
}

module.exports = command
