const {
    Table,
    chalk
} = require('../utils/index');

const config = require('../templates.json');
const table = new Table({
    head: [chalk.hex('#f5bf4f').bold('template name'), 'link', 'branch']
});

Object.keys(config).forEach(v => {  
    table.push([v, config[v].url, config[v].branch])
})
console.log( table.toString())

module.exports = table.toString();