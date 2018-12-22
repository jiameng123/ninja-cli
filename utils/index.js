const inquirer = require('inquirer');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const program = require('commander');
const path = require('path');
const co = require('co');
const coPrompt = require('co-prompt');
const Table = require('cli-table3');

/**
 * 
 *解析命令
 * @param {string} cmd 
 */
const resolveCmd = cmd => path.join(__dirname, '../commander', cmd);

module.exports = {
    inquirer,
    download,
    handlebars,
    fs,
    ora,
    chalk,
    symbols,
    program,
    path,
    resolveCmd,
    co,
    coPrompt,
    Table
}