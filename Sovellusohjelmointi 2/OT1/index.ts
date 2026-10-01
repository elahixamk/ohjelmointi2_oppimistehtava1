import express, { Request, Response, Application } from "express";
import path from "path";

const app: Application = express();
const portti: number = Number(process.env.PORT) || 3101;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/lomake", (req: Request, res: Response): void => {
  const { etunimi, sukunimi, email, kayttoehdot } = req.query;

  const etunimenArvo = typeof etunimi === "string" ? etunimi : "";
  const sukunimenArvo = typeof sukunimi === "string" ? sukunimi : "";
  const emailinArvo = typeof email === "string" ? email : "";
  const ehdotValittuna = kayttoehdot === "hyvaksytty";

  const etunimiPuuttuu = etunimenArvo.trim() === "";
  const sukunimiPuuttuu = sukunimenArvo.trim() === "";
  const emailPuuttuu = emailinArvo.trim() === "";
  const ehdotPuuttuu = !ehdotValittuna;

  const puuttuu: string[] = [];

  if (etunimiPuuttuu && sukunimiPuuttuu) {
    puuttuu.push("nimesi");
  } else if (etunimiPuuttuu) {
    puuttuu.push("etunimesi");
  } else if (sukunimiPuuttuu) {
    puuttuu.push("sukunimesi");
  }

  if (emailPuuttuu) puuttuu.push("sähköpostiosoitteesi");
  if (ehdotPuuttuu) puuttuu.push("hyväksy käyttöehdot");

  if (puuttuu.length > 0) {
    let virheviesti = "";

    if (puuttuu.length === 1) {
      if (puuttuu[0] === "hyväksy käyttöehdot") {
        virheviesti = "Hyväksy käyttöehdot.";
      } else {
        virheviesti = `Anna ${puuttuu[0]}.`;
      }
    } else {
      const sisEhdot = puuttuu.includes("hyväksy käyttöehdot");
      const muuPuute = puuttuu.filter(p => p !== "hyväksy käyttöehdot");

      if (muuPuute.length === 1) {
        virheviesti = `Anna ${muuPuute[0]}`;
      } else {
        const viimMuu = muuPuute.pop();
        virheviesti = `Anna ${muuPuute.join(" ja ")} sekä ${viimMuu}`;
      }

      if (sisEhdot) {
        virheviesti += " ja hyväksy käyttöehdot.";
      } else {
        virheviesti += ".";
      }
    }

    res.send(`
<!DOCTYPE html>
      <html lang="fi">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
          <title>Tilaa uutiskirje</title>
          <style>
              body {
                  padding-top: 50px;
              }
          </style>
      </head>
      <body>
      <div class="container"> 
          <h1 class="display-5 mb-3">Tilaa uutiskirje</h1>
          <div class="alert alert-danger mb-3" role="alert">
              ${virheviesti}
          </div>

          <div class="row mb-3">
              <div class="col-sm-5">
                  <a href="/" class="btn btn-primary">Palaa takaisin</a>
              </div>
          </div>
      </div>
      </body>
      </html>
    `);
  } else {
    res.sendFile(path.join(__dirname, "public", "kiitos.html"));
  }
});

app.listen(portti, () => {
  console.log(`Palvelin käynnistyi osoitteeseen: http://localhost:${portti}`);
});