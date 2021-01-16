#!/usr/bin/env node

var fs   = require('fs');
var path = require('path');
var args = require('yargs');


class App {

	constructor() {
		this.fileName = __filename;

        // Load .env
        require('dotenv').config({
            path: path.join(__dirname, './.env')
        });

	}


	
	loadCommands() {
		var folder = path.join(__dirname, './src/commands');

		fs.readdirSync(folder).forEach((file) => {

			var fileName = path.join(folder, file);
			var components = path.parse(fileName);

			if (components.ext == '.js') {
				var Command = require(fileName);
				var cmd = new Command(); 

				args.command({
					command: cmd.command,
					builder: cmd.builder,
					handler: cmd.handler,
					desc:    cmd.description 
				});  
			}

		})

	}

	getDefaultConfig() {
		var config = {};

		return config;
	}

	run() {

		try {

			//var defaultConfig = this.getDefaultConfig();

			args.usage('Usage: $0 <command> [options]')
/*
            args.option('led-cols',                {describe:'Number of columns for display', default:defaultConfig['led-cols']});
            args.option('led-rows',                {describe:'Number of rows for display', default:defaultConfig['led-rows']});
            args.option('led-chain',               {describe:'Number of daisy-chained panels', default:defaultConfig['led-chain']});
            args.option('led-parallel',            {describe:'For A/B+ models or RPi2,3b: parallel chains.', default:defaultConfig['led-parallel']});
		   
			args.option('led-gpio-mapping',        {describe:'Type of hardware used', default:defaultConfig['led-gpio-mapping']});
            args.option('led-rgb-sequence',        {describe:'Matrix RGB color order', default:defaultConfig['led-rgb-sequence']});
            args.option('led-scan-mode',           {describe:'Scan mode (0/1)', default:defaultConfig['led-scan-mode']});
            args.option('led-inverse',             {describe:'Inverse colors', default:defaultConfig['led-inverse']});
            args.option('led-pwm-bits',            {describe:'Color depth', default:defaultConfig['led-pwm-bits']});
            args.option('led-pwm-lsb-nanoseconds', {describe:'Tweak timing', default:defaultConfig['led-pwm-lsb-nanoseconds']});
            args.option('led-pwm-dither-bits',     {describe:'Slowdown GPIO. Needed for faster Pis/slower panels', default:defaultConfig['led-pwm-dither-bits']});
            args.option('led-brightness',          {describe:'Display brightness', default:defaultConfig['led-brightness']});
            args.option('led-multiplexing',        {describe:'Multiplexing type (0-4).', default:defaultConfig['led-multiplexing']});
            args.option('led-show-refresh',        {describe:'Show refresh rate.', default:defaultConfig['led-show-refresh']});
            args.option('led-slowdown-gpio',       {describe:'Slowdown GPIO. Needed for faster Pis/slower panels', default:defaultConfig['led-slowdown-gpio']});
*/
			this.loadCommands();  

			args.help();
			args.wrap(null);

			args.check(function() {
				return true;
			});

			args.demand(1);

			args.argv;

		}
		catch(error) {
			console.error(error.stack);
		}

	};

};


var app = new App();
app.run();