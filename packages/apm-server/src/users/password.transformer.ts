import * as crypto from 'crypto';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
    to(value: string) {
        return crypto.createHmac('sha256', value).digest('hex');
    }
    from(value: string) {
        return value;
    }
}
