const axios = require('axios')

module.exports = {
    name: 'login',
    alias: [''],
    run: async (toolbox) => {
        const {
            parameters,
            template: { generate },
            print: { info },
            prompt,
            filesystem
          } = toolbox;

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

          const questions = [authorAsk, login]
          await prompt.ask(questions).then(async (res) => {
              const { username, splashback } = res
              axios.post('http://localhost:3001/auth/developers/login', {
                "splashback": splashback,
                "username": username,
              });
          });
    }
};