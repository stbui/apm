import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    constructor() { }

    getUsers() {
        return [{ id: 113, name: 'UsersService', age: 5 }];
    }

    findOneById(id: Number) {
        return { id: id, name: 'UsersService', age: 5 }
    }

}
