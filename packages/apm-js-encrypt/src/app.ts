import { Sessions } from './entity/Sessions';
import { AppDataSource } from './data-source';

export function bootstrap() {
    AppDataSource.initialize()
        .then(async () => {
            const sessions = new Sessions();
            sessions.session_id = 6062739610258400;
            sessions.project_id = 3296;
            sessions.user_id = '3296';

            await AppDataSource.manager.save(sessions);
        })
        .catch(error => console.log('Error: ', error));
}
