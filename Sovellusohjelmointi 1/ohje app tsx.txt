import React, {useState} from 'react';  /* otetaan käyttöön useState-metodi*/

import './App.css';
/* import ottaa käyttöön eri komponentteja */

const App : React.FC = () : React.ReactElement => { 
  /*Tämä koodi määrittelee App-komponentin, joka on Reactin funktionaalinen komponentti 
ja palauttaa Reactin elementin (React.ReactElement). Koska TypeScriptiä käytetään, 
tieto App-komponentin tyyppityypistä on mukana, ja sen odotetaan olevan Reactin funktionaalinen komponentti (React.FC). */

  const [tervehdys, setTervehdys] = useState<string>("");
  /*Tämä käyttää Reactin useState-koukkua (hook) luodakseen kaksi tilamuuttujaa: tervehdys ja setTervehdys. 
tervehdys on merkkijono, ja se alustetaan tyhjällä merkkijonolla (""). 
setTervehdys on funktio, jolla voi päivittää tervehdys-tilan. */
  
  const [nimi, setNimi] = useState<string>(""); 
  /*Tämä luo toisen tilamuuttujan, nimi, ja siihen liittyvän päivitysfunktion setNimi. nimi on myös merkkijono ja alustetaan tyhjällä merkkijonolla. */

  const sanoHeippa = () : void => { 
    /*Tämä määrittelee funktion sanoHeippa, joka ei palauta mitään (tyyppi void).  */
    
    setTervehdys(`Tervehdys, ${nimi}!`);
    /* Tämä päivittää tervehdys-tilaa käyttäen setTervehdys-funktiota. Se asettaa tervehdysviestin, joka sisältää nimen, joka haetaan nimi-tilamuuttujasta. */
  }

  return ( /* <></>: Tämä on Reactin fragment, joka mahdollistaa usean elementin palauttamisen ilman ylimääräisiä div-elementtejä. Se on lyhyt syntaksi tyhjälle fragmentille. */
    <> 
      <h1>Demo 1: React-perusteita</h1>
      <h2>Hello world!</h2>

      <input type="text" placeholder="Anna nimesi..." onChange={ (e) => {setNimi(e.target.value)}}/> 

<button onClick={sanoHeippa}>Sano heippa</button>
{(Boolean(tervehdys)) 
  ? <div className="tervehdysteksti">
      {tervehdys}
    </div>
: null
}
    </>
    /*<input type="text" placeholder="Anna nimesi..." onChange={(e) => {setNimi(e.target.value)}}/>: Tämä luo tekstikentän, joka sallii käyttäjän syöttää tekstiä. Kun käyttäjä muuttaa kentän sisältöä (onChange-tapahtuma), setNimi-funktiota kutsutaan asettamaan uusi arvo nimi-tilamuuttujalle.

<button onClick={sanoHeippa}>Sano heippa</button>: Tämä luo painikkeen, joka suorittaa sanoHeippa-funktion kun sitä painetaan (onClick-tapahtuma).

{(Boolean(tervehdys)) ? ... : null}: Tämä on ehdollinen (ternary) lauseke JSX:ssä. Se tarkistaa, onko tervehdys totta (eli onko siinä tekstiä). Jos se on totta, se renderöi seuraavan osan. Muuten se renderöi null.

<div className="tervehdysteksti">{tervehdys}</div>: Jos tervehdys on totta, tämä renderöi div-elementin, jolla on CSS-luokka "tervehdysteksti", ja sen sisällöksi asetetaan tervehdys.
Yhteenvetona: Tämä koodi määrittelee, mitä komponentti renderöi näytölle. Se sisältää otsikoita, tekstikentän, painikkeen ja ehdollisen renderöinnin tervehdysviestille. */
  );
}

export default App;
/* Tämä rivi tarkoittaa, että tässä tiedostossa määritelty komponentti (App) on se, 
joka viedään (exportataan) tiedostosta. Kun tämä tiedosto tuodaan muualle sovelluksessa, 
tuotu komponentti on se, joka on käytettävissä. */
