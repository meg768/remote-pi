
const Command = require('../js/command.js');
const fs = require('fs');
const Path = require('path');
const ChildProcess = require("child_process");

module.exports = class extends Command {

    constructor(options) {

        super({command: 'rsid [options]', description: 'Mounts a drive ---', ...options}); 
    }

    options(args) {
        super.options(args);
		args.option('pi',   {describe:'Name of Pi or IP-address', type: 'strig', default:undefined});
		args.option('user', {describe:'Username on your Pi', type: 'strig', default:'root'});
    }

	async setup() {
		const mkpath = require('yow/mkpath');

		mkpath(`~/.sshfs/${this.argv.pi}`);
	}
	
	async exec(cmd) {
		const ChildProcess = require("child_process");

		return new Promise((resolve, reject) => {
			this.debug(`Running command "${cmd}".`);

			ChildProcess.exec(cmd, async (error, stdout, stderr) => {
				if (error) {
					reject(error);
				}
				else if (stderr) {
					reject(new Error(stderr));
				}
				else {
					resolve(stdout);
				}
			});
	
		});
	}

	async run() {

		try {
			await this.exec('which which');
		}
		catch(error) {
			throw new Error('which is not installed.');
		}

		try {
			await this.exec('which sshfs');
		}
		catch(error) {
			throw new Error('sshfs is not installed.');
		}

		const mkpath = require('yow/mkpath');
		const os = require('os');

		if (!this.argv.pi) {
			throw new Error('A pi must be specified.');
		}

		 
		var cmd = `cat ~/.ssh/id_rsa.pub | ssh ${this.argv.user}@${this.argv.pi} 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'`;


		try {
			await this.exec(cmd);

		}
		catch (error) {
			throw new Error('Password failed');
		}
			
//		await this.exec(cmd);
		 
		 var cat = `ssh ${this.argv.user}@${this.argv.pi} 'cat ~/.ssh/authorized_keys'`;
		 var contents = await this.exec(cat);
		contents = contents.split('\n');

		var lines = {}; 
		contents.forEach(element => {
			lines[element] = element;
		});

		var output = [];
		for (var y in lines) {
			output.push(y);
		}

		output = output.join('\n');
//		console.log(output);

		this.exec(`ssh ${this.argv.user}@${this.argv.pi} "echo '${output}' >  ~/.ssh/authorized_keys"`);


		 console.log(`Now you may login without password using "ssh ${this.argv.user}@${this.argv.pi}".`);
	}

};



