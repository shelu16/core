/**
 * Setup.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Caporal from 'caporal';
import Winston from 'winston';
import { CommandDefines } from './../Cli';
import { concat, trim } from 'lodash';

/**
 * Class Setup
 * 
 * @version 1.0.0
 */
export class Setup extends CommandDefines {

  /**
   * Initialize a commands provider.
   */
  public initialize () {
    this.cli
    .command('setup', 'Configure components.')
    .option('-e, --env', 'Save as current environment settings.')
    .option('-f, --force', 'Forced command running.')
    .option('-y, --yes', 'Assume yes if prompted.')
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        /* Debug info. */
        logger.debug('setup');

        /* Get ext list. */
        let list = concat(['@fastpanel/core'], this.extensions.list);

        /* Find and run commands. */
        for (const name of list) {
          /* Clear ext name. */
          let clearName = trim(name, './\\@');
          let commandName = `${clearName} setup`;

          /* Find command by name. */
          if (
            this.cli.getCommands().filter(
              (c: any) => (c.name() === commandName || c.getAlias() === commandName)
            )[0]
          ) {
            try {
              /* Run command. */
              await this.cli.exec(
                [commandName],
                options
              );
            } catch (error) {
              /* Stop command by error. */
              reject(error);
            }
          }
        }
        
        /* Command complete. */
        resolve();
      });
    });

    this.cli
    .command('fastpanel/core setup', 'Configure core components.')
    .option('-e, --env', 'Save as current environment settings.')
    .option('-f, --force', 'Forced command running.')
    .option('-y, --yes', 'Assume yes if prompted.')
    .visible(false)
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        logger.debug('fastpanel/core setup');
        logger.debug(args);
        logger.debug(options);
        resolve();
      });
    });
  }

}

/* End of file Setup.js */