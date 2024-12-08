import { App } from '@/app';
import { TemperatureRoute } from '@routes/temperature.route';
import { Socket } from '@socket/socket';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App(new Socket(), [new TemperatureRoute()]);

app.listen();
