import 'dotenv/config';

import { IndexRoute } from './modules/index';
import App from './app';
import { validateEnv } from './core/utils';

validateEnv();

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();