import {
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
	constructor(protected readonly usersService: UsersService) { }

	async validate(text: string) {
		const user = await this.usersService.findOne({
			email: text
		});
		return !user;
	}
}
