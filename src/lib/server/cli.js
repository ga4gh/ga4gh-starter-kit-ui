import { Command } from 'commander';
import process from 'process';

const program = new Command();
program
  .option('-c --config <config>', `Path to YAML configuration file indicating starter kit services to manage`)
program.parse(process.argv)
let cliOpts = program.opts();

export default cliOpts;
