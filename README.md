# Tuve El AB – ny hemsida

Modernisering av [tuveel.se](https://tuveel.se/). Arbetet görs i två steg:

1. **Skrapa och välja hero** (klart): allt innehåll och alla bilder från nuvarande sajt är sparade, och fem hero-förslag finns i `hero-forslag/`.
2. **Bygga hela sidan** i stilen från det valda förslaget.

## Struktur

```
scraped/                  Råarkiv från tuveel.se (skrapat 2026-10-29)
  innehall.md             All text på sajten, ordnad per sektion, plus offertformulärets fält
  site-data.json          Samma innehåll strukturerat (kontakt, tjänster, behörigheter, formulär)
  images/                 Alla originalbilder i full upplösning (42 st)
  images-manifest.json    Käll-URL för varje bild
  html/                   Renderad HTML och text från startsidan
  screenshots/            Skärmdumpar av gamla sajten
assets/
  brand/                  Logotyp (original + uppdelad i emblem, ordmärke och liggande variant), favicon
  img/projekt/            26 egna projektbilder som WebP (800 och 1600 px), med beskrivande namn
  img/tjanster/           De sex tjänstebilderna (stockfoton från gamla sajten)
  img/hero/               Gamla bildspelets stockfoton och breda beskärningar av projektbilder
  img/bilder.json         Vilken originalfil varje webbild kommer från
hero-forslag/
  index.html              Alla fem förslag på en sida (öppna direkt i webbläsaren)
  skarmdumpar/            Desktop- och mobilvy av varje förslag
```

## Hero-förslagen

| # | Namn | Kort beskrivning |
|---|---|---|
| 1 | Kvällsljus | Mörk helbild från egna belysningsprojekt som tonar mellan två kvällsbilder; offert, telefon och behörigheter i första vyn |
| 2 | Nordiskt ljus | Ljus, skandinavisk delad layout med kollage av tre projektbilder och tjänsterna som etiketter |
| 3 | Eljour först | Konverteringsfokus: eljour och telefonnummer störst, kort offertformulär direkt i heron |
| 4 | Bento | Rutnät med budskap, eljour, totalentreprenad, alla tjänster, behörigheter och bilder |
| 5 | Kretsen | Typografisk; en animerad sladd kopplas in i offertknappen, filmband med projektbilder |
| 6 | Fullbild | Klassisk hero: bild över hela skärmen, menyn ovanpå, centrerad rubrik och två knappar. Fyra bildval att prova |

## Att stämma av med kunden

- **E-post:** sajten visar `altin@tuveel.com` men länken går till `info@tuveel.se`. Vilken ska gälla?
- **Sociala medier:** "Följ oss på Facebook/Instagram" saknar länkar. Finns det konton?
- **Organisationsnummer** och **F-skattsedel** visas inte; bra att ha i sidfoten.
- **Projektbilder:** namn och bildtexter är beskrivningar av vad som syns. Projektnamn eller orter kan läggas till om kunden vill.
- Gamla sajten svarar med 403 för vanliga skript (Loopias brandvägg) men fungerar i en riktig webbläsare.

## Logotyp

`tuve-el-liggande-*.svg` är en liggande variant för sidhuvudet. Ordmärkets hårfina linjer är något förtjockade så att "TUVE EL" går att läsa i liten storlek. Originalet finns orört som `tuve-el-logo-*.svg`.
