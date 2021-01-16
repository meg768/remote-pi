
const Command = require('../js/command.js');
const fs = require('fs');
const ChildProcess = require("child_process");

module.exports = class extends Command {

    constructor(options) {

        super({command: 'mount [options]', description: 'Mounts a drive', ...options}); 
    }

    options(args) {
        super.options(args);
		args.option('pi', {describe:'Name of Pi or IP-address', type: 'strig', default:undefined});
		args.option('user', {describe:'Username on your Pi', type: 'strig', default:'root'});
		args.option('remotePath', {alias: 'rp', describe:'Remote location/path on the Pi', type: 'strig', default:'/'});

    }


	async exec(cmd) {
		const ChildProcess = require("child_process");

		return new Promise((resolve, reject) => {
			ChildProcess.exec(cmd, async (error, stdout, stderr) => {
				if (error) {
					reject(error);
				}
				else if (stderr) {
					reject(new Error(stderr));
				}
				else {
					console.log(stdout);
					resolve(stdout);
				}
			});
	
		});
	}

	async run() {
		try {
			var cmd = `sshfs ${this.argv.user}@${this.argv.pi}:/ ~/.sshfs/pi-mysql -o volname=pi-mysql -o allow_other `;
//			await this.exec('sshfs root@pi-mysql:/ ~/.sshfs/pi-mysql -o volname=pi-mysql -o allow_other ');
			await this.exec(cmd);
//			console.log(await exec('lsC'));
		}
		catch(error) {
			console.log('error%%%%%%%%%%%%%', error);

		}
	}

};



