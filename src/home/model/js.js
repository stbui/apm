'use strict';
/**
 * model
 */
export default class extends think.model.mongo {

	indexAction() {
		return think.statusAction(403, this.http);
	}
}