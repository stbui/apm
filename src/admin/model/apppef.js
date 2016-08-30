'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getPage(num,listRows = 20){
        //查询第 1 页数据，每页 10 条数据
        return this.cache(60).page(num, listRows).where({id: {">": 20}}).select();
    }
}