const c = require('colors')

module.exports = {
  name: 'init',
  alias: [''],
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
      prompt,
      filesystem: { exists }
    } = toolbox;
    
    let AlreadyExists = exists('highframe.config.js')
    if(AlreadyExists) return info(c.red('❌┃Você já inicou a aplicação'))

    let authorAsk = { 
      type: 'input',
      name: 'username',
      message: `👤┃Qual o nome do autor?`
    }

    let versionAsk = { type: 'input', name: 'version', message: '🛠️┃Para qual versão HF você está desenvolvendo' }

    let nameAsk = { type: 'input', name: 'name', message: '📝┃Qual o nome do sua aplicação HighFrame' }

    let versionTypeAsk = { 
      type: 'select', 
      name: 'versionType', 
      message: `🤖┃Qual o versionType do HighFrame que você está desenvolvendo?`,
      choices: ['Stable', 'Beta', 'Canbeta']
    }

    let teamAsk = { 
      type: 'input',
      name: 'team',
      message: '👥┃Qual o seu time?'
    }

    let login = { 
      type: 'password',
      name: 'splashback',
      message: '🗝️┃Qual o seu splashBlack de login?'
    }
    let repositoryAsk = { 
      type: 'input',
      name: 'repository',
      message: '☁️┃Qual o repositorio do bot?'
    }

    const questions = [ authorAsk, versionAsk, versionTypeAsk, nameAsk, teamAsk, login, repositoryAsk]
    await prompt.ask(questions).then(async (res) => {
      let { version, versionType, name, username, team, splashback, repository } = res
        console.log(res)
        
      if(versionType === 'Stable') {
        version = `🟢┃` + version + `-Stable`
      } else if(versionType === 'Beta') {
        version = `🔵┃` + version + `-Beta`
      } else {
        version = `🟡┃` + version + `-Canbeta`
      }

      if(team.length == 0) {
        team = username
      }
      
      await generate({
        template: 'highframe.config.js.ejs',
        target: 'highframe.config.js',
        props: {
          version: version,
          versionType: versionType,
          name: name,
          username: username,
          team: team,
          splashback: splashback,
          repository: repository
        }
      })

    })
  },
}
