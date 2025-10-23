import express, { Request, Response } from 'express';
import { Session } from '@fieldday/shared';

const app = express();
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => res.json({ status: 'ok' }));

app.get('/sessions', (_req: Request, res: Response) => {
  const sample: Session[] = [
    {
      id: 's1',
      sport: 'futsal',
      title: 'Tonight Futsal Pickup',
      startsAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      capacity: 10,
      location: { lat: 37.7749, lng: -122.4194, name: 'SF Community Center' },
    },
  ];
  res.json(sample);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));
