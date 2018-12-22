const {
    fs,
    coPrompt,
    chalk,
    co,
    symbols,
    resolveCmd
} = require('../utils/index');
const config = require('../templates.json');

module.exports = co(function* deleteTpl() {
    const delTplName = yield coPrompt('Template name: ');

    if(config[delTplName]) {
        const confirm = yield coPrompt(chalk.hex('#ec5b56').bold('confirm deletion?')+'(y/n):');
        if(confirm === 'y' || confirm === 'yes') {
            delete config[delTplName];
            fs.writeFile(__dirname+'/../templates.json', JSON.stringify(config), 'utf-8', function(err) {
                if(err) console.log(symbols.error, chalk.red(err));
                console.log(symbols.success, chalk.green(`${delTplName} deleted!!!`));
                console.log(chalk.grey('The last template list is: \n'));
                require(resolveCmd('list'));
                console.log('\n');
                process.exit();
            })
           

        } else {
            const confirmDel = yield coPrompt(chalk.hex('#ec5b56').bold('Exit?')+'(y/n):');
            if(confirmDel === 'y' || confirmDel === 'yes') process.exit();
            yield deleteTpl();
        } 

    } else {
        console.log(symbols.info, chalk.yellow('Template does not exist'));
        const confirmDel = yield coPrompt(chalk.hex('#ec5b56').bold('Exit?')+'(y/n):');
        if(confirmDel === 'y' || confirmDel === 'yes') process.exit();
        
        yield deleteTpl();
    }
})