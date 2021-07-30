import yaml from 'js-yaml';
import fs from 'fs'
import cliOpts from './cli';
import defaults from '../constants/defaults';

const userConfig = fs.existsSync(cliOpts.config) ? yaml.load(fs.readFileSync(cliOpts.config)).starterKitUI : {};

const config = {
    port: userConfig.port || defaults.port,
    services: userConfig.services || defaults.services
};

export default config;
