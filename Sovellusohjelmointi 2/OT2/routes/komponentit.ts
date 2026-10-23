import express, { type Request, type Response, type Router } from 'express';
import { Virhe } from '../errors/virhekasittelija';
import { prisma } from '../lib/prisma';

const komponentitRouter: Router = express.Router();


komponentitRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        throw new Virhe(404, "Komponenttia ei löytynyt annetulla id:llä");
    }

    const komponenttiOlemassa = await prisma.komponentti.count({
        where: { id }
    }) === 1;

    if (!komponenttiOlemassa) {
        throw new Virhe(404, "Komponenttia ei löytynyt annetulla id:llä");
    }

    await prisma.komponentti.delete({
        where: {
            id
        }
    });

    const jaljellaOlevat = await prisma.komponentti.findMany();
    return res.status(200).json(jaljellaOlevat);

});


komponentitRouter.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        throw new Virhe(400, "Virheellinen id");
    }

    const { maara } = req.body;
    const hyvaksyttyBody = typeof maara === 'number' && !isNaN(maara) && maara >= 0;

    if (!hyvaksyttyBody) {
        throw new Virhe(400, "Virheellinen pyynnön body");
    }

    const komponenttiOlemassa = await prisma.komponentti.count({
        where: { id }
    }) === 1;

    if (!komponenttiOlemassa) {
        throw new Virhe(404, "Komponenttia ei löytynyt annetulla id:llä");
    }
    const uusiPaivays = new Date().toLocaleDateString("fi-FI");

    const paivitettyKomponentti = await prisma.komponentti.update({
        where: { id },
        data: {
            maara,
            paivitetty: uusiPaivays
        }
    });

    return res.status(200).json(paivitettyKomponentti);
});


komponentitRouter.post("/", async (req: Request, res: Response) => {

    const { kategoria, merkki, malli, hinta, maara } = req.body;

    const hyvaksyttyBody = 
        typeof kategoria === 'string' && kategoria.trim().length > 0 && 
        typeof merkki === 'string' && merkki.trim().length > 0 && 
        typeof malli === 'string' && malli.trim().length > 0 && 
        typeof hinta === 'number' && !isNaN(hinta) && hinta >= 0 &&
        typeof maara === 'number' && !isNaN(maara) && maara >= 0;

    if (!hyvaksyttyBody) {
        throw new Virhe(400, "Virheellinen pyyntö");
    }

    const uusiKomponentti = await prisma.komponentti.create({
        data: {
            kategoria,
            merkki,
            malli,
            hinta,
            maara,
            paivitetty: new Date().toLocaleDateString("fi-FI")
        }
    });

   
    res.status(201).json(uusiKomponentti);
});


komponentitRouter.get("/", async (req: Request, res: Response) => {

    const { kategoria, merkki, malli } = req.query as { kategoria?: string; merkki?: string; malli?: string };


 const komponentit = await prisma.komponentti.findMany({
    where: {
      ...(kategoria && { kategoria }),
      ...(merkki && { merkki }),
      ...(malli && { malli })
    }
  });

    return res.status(200).json(komponentit);
});


export default komponentitRouter; 