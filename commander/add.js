const config = require('../templates');
const {
    co,
    chalk,
    fs,
    coPrompt,
    symbols,
    ora,
    resolveCmd
} = require('../utils/index');

module.exports =  co(function* () {
       
        const tplName = yield coPrompt(chalk.hex('#98c379')('Template name: '));
        const gitUri = yield coPrompt(chalk.hex('#98c379')('Git https link: '));
        const branch = yield coPrompt(chalk.hex('#98c379')('Branch: '));

        if(config[tplName]) {
            console.log(symbols.warning, chalk.red('Template has already existed!'));
            process.exit();

        } else {
            config[tplName] = {
                "url": gitUri.replace(/[\u0000-\u0019]/g, ''),
                "barnch": branch
            }

            const spinner = ora(chalk.cyan('adding...'));
            spinner.start();

            fs.writeFile(__dirname+'/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
                if(err) {
                    spinner.fail();
                    console.log(symbols.error, chalk.red(err));

                } else {
                    spinner.succeed();
                    console.log(symbols.success, chalk.green('New template added!\n'))
                    require(resolveCmd('list'));

                }

                process.exit();

            })
        }

    })


