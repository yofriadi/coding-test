import { Server } from 'socket.io';
import { Container } from 'typedi';
import { Temperature } from '@interfaces/temperature.interface';
import { TemperatureService } from '@services/temperature.service';

export class Socket {
  private io: Server | null = null;
  public service = Container.get(TemperatureService);

  private isSupportedCity(value: string): boolean {
    return ['Jakarta', 'Singapore', 'Sydney'].includes(value);
  }

  private initialize(io: Server) {
    this.io = io;

    io.on('connection', socket => {
      console.info('Socket.IO client connected', { socketId: socket.id });

      socket.on('subscribeToCity', async (city: string) => {
        console.info('Client subscribed to city', { socketId: socket.id, city });

        if (!this.isSupportedCity(city)) {
          throw new Error(`Error unsupported city: ${city}`);
        }

        const interval = setInterval(async () => {
          try {
            let data: Temperature = await this.service.findLast(city);
            data = { createdAt: data.created_at, value: data.value };

            socket.emit('temperature', data);
          } catch (error) {
            console.error('Error fetching temperature data', { city, error });
          }
        }, 5000);

        socket.on('unsubscribeFromCity', () => {
          clearInterval(interval);
          console.info('Client unsubscribed from city', { socketId: socket.id, city });
        });
      });

      socket.on('disconnect', () => {
        console.info('Socket.IO client disconnected', { socketId: socket.id });
      });
    });
  }
}
