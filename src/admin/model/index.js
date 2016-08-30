'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getList(){
        //查询第 2 页数据，每页 10 条数据
        return this.page(1, 10).where({id: {">": 20}}).select();
    }
}