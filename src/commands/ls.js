
const Command = require('../js/command.js');
const fs = require('fs');

module.exports = class extends Command {

    constructor(options) {

        super({command: 'ls [options]', description: 'List files', ...options}); 
    }

    options(args) {
        super.options(args);
		args.option('news', {describe:'Display RSS news feeds', type: 'boolean', default:true});
		args.option('gif', {describe:'Display random gif animations', type: 'boolean', default:true});
		args.option('weather', {describe:'Display weather information', type: 'boolean', default:true});
        args.option('rain', {describe:'Display matrix rain', type: 'boolean', default:true});
        
        args.option('scrollDelay', {describe:'Text scroll delay in ms', type: 'number', default:10});
        args.option('textColor', {describe:'Text color', default:'red'});

    }

	async print(path) {
		const dir = await fs.promises.opendir(path);
		for await (const dirent of dir) {
		  console.log(dirent.name);
		}
	} 

	async run() {
		this.debug('Runnning');
		await this.print('./');
	}

};



