/* eslint-disable @typescript-eslint/no-base-to-string */
import express, { Express, Request, Response } from 'express';
import nodefetch from 'node-fetch';

const PORT: number = parseInt(process.env.PORT || '5004');
const app: Express = express();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', async (req: Request, res: Response) => {
  const firstname = req.query?.firstname.toString();
  const surname = req.query?.surname.toString();
  const person = await nodefetch(
    `http://localhost:5005/profile?firstname=${firstname}&surname=${surname}`,
  );
  const response = await person.text();
  const json: PersonInfo = JSON.parse(response) as PersonInfo;
  res.send(`hello ${json.name} you're ${json.age} years old`);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});

class PersonInfo {
  name: string = '';
  age: number = 0;
}
