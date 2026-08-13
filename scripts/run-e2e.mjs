import {spawn} from 'node:child_process';
const child=spawn(process.execPath,['tests/browser-e2e.mjs'],{cwd:process.cwd(),stdio:'inherit'});child.on('exit',code=>process.exit(code??1));
