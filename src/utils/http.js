
import { Directus } from '@directus/sdk';


/**
 * @class Http
 */
class Http {

  /**
   * @memberof Http
   * @type {Directus} #service
   */
  static #service;
  static #directus
  /**
   * @static 获取实例
   * @return {Directus} 
   * @memberof Http
   */
  static get to() {
    if (this.#service) return this.#service;
    if (this.#directus == undefined) {
      this.#directus = new Directus('')
    }
    return this.#directus;
  }
}

export default Http;