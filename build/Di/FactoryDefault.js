"use strict";
/**
 * FactoryDefault.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Container_1 = require("./Container");
/**
 * Class FactoryDefault
 *
 * This is a variant of the standard Di. By default it automatically
 * registers all the services provided by the framework.
 *
 * Thanks to this, the developer does not need to register each service
 * individually providing a full stack framework.
 *
 * @version 1.0.0
 */
class FactoryDefault extends Container_1.Container {
    /**
     * FactoryDefault constructor.
     */
    constructor() {
        super();
        /* Registered event emitter component. */
        this.set('events', function (container) {
            return new events_1.EventEmitter();
        }, true);
    }
}
exports.FactoryDefault = FactoryDefault;
/* End of file FactoryDefault.ts */ 
