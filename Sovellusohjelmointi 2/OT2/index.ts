import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import path from 'path';
import komponentitRouter from './routes/komponentit';
import virhekasittelija, { Virhe } from './errors/virhekasittelija';

const app: Application = express();
const port: number = Number(process.env.PORT) || 3102;

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(express.json());

app.use("/api/komponentit", komponentitRouter);



app.use((req: Request, res: Response, next: NextFunction) => {
    next(new Virhe(404, "Osoitetta ei löytynyt"));
});

app.use(virhekasittelija);

app.listen(port, () => {
    console.log(`Palvelin käynnistettiin osoitteeseen: http://localhost:${port}`);
});


