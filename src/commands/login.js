const axios = require('axios');
const c = require('colors');

function UserException(message) {
	return console.error(c.red('\r' + `[Login] - HighFrame API: error when logging into the instance stream by '${message}'`))
 }

const headers = {
  headers: { 'Content-Type': 'application/json' }
}

module.exports = {
    name: 'login',
    alias: [''],
    run: async (toolbox) => {
        const {
            parameters,
            template: { generate },
            print: { info },
            prompt,
            filesystem: { exists }
          } = toolbox;

          let AlreadyLogin = exists('login.hf.json')
          if(AlreadyLogin) return info(c.red('❌┃Você já está logado'))

          let authorAsk = { 
            type: 'input',
            name: 'username',
            message: `👤┃username`
          }

          let login = { 
            type: 'password',
            name: 'splashback',
            message: '🗝️┃Qual o seu splashBlack de login?'
          }

          const question1 = [authorAsk]
          const question2 = [login];

          let username;
          let splashback;

          await prompt.ask(question1).then(async (res) => {
              username = res.username

              await axios.post('http://localhost:3001/api/verify/username', {
                "username": username,
              }, { headers }).then(res => {

              }).catch(err => {
                console.log(err)
                if(err.response) {
                  try {
                    throw new UserException(err.response.data);
                  } catch {
                    process.exit(1)
                  }
                }
              })
          }).then(async () => {
            await prompt.ask(question2).then(async (res) => {
              splashback = res.splashback

              await axios.post('http://localhost:3001/api/verify/login', {
                "splashback": splashback,
                "username": username,
              }, { headers }).then(async response => {
                
                await axios.post('http://localhost:3001/auth/developers/login', {
                "splashback": splashback,
                "username": username,
              }).then(async (result) => {
                const { id, splashback, username, project, score } = result.data.user
                console.log(result)
                await generate({
                  template: 'login.hf.json.ejs',
                  target: 'login.hf.json',
                  props: {
                      "id": id,
                      "splashback": splashback,
                      "username": username,
                      "project": project,
                      "score": score
                  }
                }).then(() => {
                  info(c.green(`✅┃Login concluido com sucesso! \n`) + c.yellow(`Guarde o arquivo "login.hf.json" em um local seguro ou adicione em um arquivo .gitignore`))
                })
              })
              }).catch(err => {
                console.log(err)
                if(err.response) {
                  try {
                    throw new UserException(err.response.data);
                  } catch {
                    process.exit(1)
                  }
                }
              })
            })
        })
    }
};