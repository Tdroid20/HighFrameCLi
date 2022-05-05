const axios = require('axios')
const c = require('colors')

module.exports = {
    name: 'register',
    alias: [''],
    run: async (toolbox) => {
        const {
            parameters,
            template: { generate },
            print: { info, error },
            prompt,
            filesystem
          } = toolbox;


          let idAsk = { 
            type: 'input',
            name: 'id',
            message: '🪪┃Qual o seu id do discord?'
          }

          let authorAsk = { 
            type: 'input',
            name: 'username',
            message: `👤┃username`
          }


          let projectAsk = { 
            type: 'input',
            name: 'project',
            message: '💼┃Qual o seu projeto?'
          }

          let projectTypeAsk = { 
            type: 'select', 
            name: 'projectType', 
            message: `🪄┃Qual o tipo do seu projeto?`,
            choices: ['🤖┃Bot', '🌐┃Web', '📱┃App', '🎓┃outros']
          }

          let osAsk = { 
            type: 'select', 
            name: 'os', 
            message: `💻┃Qual o dispositivo está desenvolvendo?`,
            choices: ['🪟┃Windows', '🐧┃Linux', '📱┃Android', '🍎┃IOS']
          }

          const questions = [idAsk, authorAsk, projectAsk, projectTypeAsk]
          await prompt.ask(questions).then(async (res) => {
              let { username, project, id, projectType } = res;
              let typeApp;

              if(id === '') {
                  id = Math.floor(Math.random() * 1232313134453)
              }

             async function tokenGenerate() {
                  var text = "";
                  if(projectType === '🤖┃Bot') {
                    text = 'gh'
                  } else if(projectType === '🌐┃Web') {
                      text = 'fa'
                  } else if(projectType === '📱┃App') {
                      let preifx;
                    await prompt.ask(osAsk).then(async (res) => {
                        const { os } =  res;
                        if(os === '🪟┃Windows') {
                            preifx = 'win.'
                        } else if(os === '🐧┃Linux') {
                            preifx = 'linux.'
                        } else if(os === '📱┃Android') {
                            preifx = 'android.'
                        } else if(os === '🍎┃IOS') {
                            preifx = 'ios.'
                        }
                    })

                      text = preifx
                  } else if(projectType === '🎓┃outros') {
                      text = 'fj'
                  }
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              
                for (var i = 0; i < 17; i++)
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
              
                return text;
              }

              let splashback = `${project}@${username}:${await tokenGenerate()}`

              try {
                axios.post('http://localhost:3001/auth/developers/register', {
                    "id": id,
                    "splashback": splashback,
                    "username": username,
                    "project": project,
                    "score": 0
                }); 
              } catch (err) {
                  error(c.red(`Erro ao registrar-se` + err))
              }

            await generate({
                template: 'login.hf.json.ejs',
                target: 'login.hf.json',
                props: {
                    "id": id,
                    "splashback": splashback,
                    "username": username,
                    "project": project,
                    "score": 0
                }
              })

              info(c.green(`✅┃Registro concluido com sucesso! \n`) + c.yellow(`Guarde o arquivo "login.hf.json" em um local seguro ou adicione em um arquivo .gitignore`))
          });
    }
};