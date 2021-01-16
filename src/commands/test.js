
var Command = require('../js/command.js');

module.exports = class extends Command {

    constructor(options) {

        super({command: 'test [options]', description: 'Test', ...options}); 
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

    
	async run() {
		this.debug('Runnning');
	}

};



