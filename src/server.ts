import { App } from '@/app';
import { VisitorRoute } from '@routes/visitor.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new VisitorRoute()]);

app.listen();
