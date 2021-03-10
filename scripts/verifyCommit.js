// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|dep)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
    console.log();
    console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`无效的提交消息格式。`)}\n\n` +
            chalk.red(`  自动生成变更日志需要正确的提交消息格式。Examples:\n\n`) +
            `    ${chalk.green(`feat(zarm): add 'comments' option`)}\n` +
            `    ${chalk.green(`fix(cli): handle events on blur (close #28)`)}\n\n` +
            chalk.red(`  查看 commit-convention.md 了解详情。\n`)
    );
    process.exit(1);
}
