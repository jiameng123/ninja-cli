const  { inquirer,
         download, 
         handlebars, 
         fs, 
         ora, 
         chalk, 
         symbols,
        resolveCmd
        } = require('../utils/index');      
const config = require('../templates.json');

//解析所有模版
const tplNameArray = Object.keys(config);


const question = [
    {
        type:'list',
        name: 'name',
        message: 'Choice templeta:',
        choices: tplNameArray,
        default:'my-app',
       
      },
      {
        name:'description',
        message:'description:',
       
      },
      {
          name:'author',
          message:'author:',
         
      }
]

module.exports  = (projectName) =>  {
   //如果没有模版，那么就新建一个
    if(!tplNameArray.length) {
        inquirer.prompt([{
            name:'tplIsCreated',
            message:'There is no template yet, is it created?(y/n)'

        }]).then(reply => {
            if(reply.tplIsCreated === 'y') {
                require(resolveCmd('add'))
            } else {
                process.exit();
            }
        })

    } else {
        inquirer.prompt(question).then((res) => {

            const spinner = ora(chalk.cyan('downloading...'));
            spinner.start();
            const FETCH_RUL = config[res.name].url+'#'+ config[res.name].branch;
          
            try {
                download(FETCH_RUL, projectName || res.name, {clone: true}, err => {
                    if(err) {
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));
                        return;
                    }
    
                    const fileName = `${res.name}/package.json`;
                   
                    if(fs.existsSync(fileName)) {
                        const content = fs.readFileSync(fileName).toString();
                        const result = handlebars.compile(content, ...res);
                        fs.writeFileSync(fileName, result);
                    }
                    spinner.succeed();
                    console.log(symbols.success, chalk.green('successed \n Happy Life, happy coding!!!'));
            
                })
            } catch (error) {
                console.log(symbols.error, chalk.red(error));
            }
         
         })
    }
   
  
}