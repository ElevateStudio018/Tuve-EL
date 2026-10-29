# Tuve El AB – ny hemsida

Modernisering av [tuveel.se](https://tuveel.se/): en statisk enkelsidig sajt utan byggsteg. Öppna `index.html` direkt i webbläsaren eller lägg upp mappen på valfritt webbhotell (t.ex. Loopia).

## Struktur

```
index.html                Hela sajten: hero med video, tjänster, eljour, om oss, projekt, offert/kontakt
css/style.css             All styling (Hanken Grotesk, marinblå och bärnsten från logotypen)
js/main.js                Meny, video, projektgalleri med bildvisare, offertformulär
assets/
  brand/                  Logotyp (original + uppdelad i emblem, ordmärke och liggande variant), favicon
  img/projekt/            26 egna projektbilder som WebP (800 och 1600 px), med beskrivande namn
  img/tjanster/           Tjänstebilderna från gamla sajten (stockfoton)
  img/hero/               Breda beskärningar och gamla bildspelets stockfoton (används inte just nu)
  img/og-bild.jpg         Delningsbild för sociala medier
  img/bilder.json         Vilken originalfil varje webbild kommer från
  video/                  Herovideon, ihopklippt av tre Coverr-klipp (källor och licens i KALLOR.md)
scraped/                  Råarkiv från gamla tuveel.se (skrapat 2026-10-29)
```

## Innan publicering

- **Offertformuläret** har ingen server. Utan inställning öppnar det besökarens e-postprogram med förfrågan ifylld till `info@tuveel.se`. För att skicka direkt från sidan (och kunna bifoga filer): skapa ett formulär hos t.ex. Formspree och klistra in adressen i `data-endpoint` på `<form id="offert-form">` i `index.html`.
- **E-post:** gamla sajten visade `altin@tuveel.com` men länkade till `info@tuveel.se`. Nya sajten använder `info@tuveel.se` överallt; byt om det ska vara den andra.
- **Sociala medier:** gamla sajten hade "Följ oss på Facebook/Instagram" utan länkar, så de är inte med. Lägg till i sidfoten om det finns konton.
- **Organisationsnummer** och **F-skattsedel** saknas; bra att ha i sidfoten.
- **Domän:** `canonical`, `og:url` och strukturerad data pekar på `https://tuveel.se/`.

## Gamla sajten

`scraped/` innehåller all text (`innehall.md`, `site-data.json`), offertformulärets fält, 42 originalbilder och skärmdumpar. Gamla sajten svarar med 403 för vanliga skript (Loopias brandvägg) men fungerar i en riktig webbläsare.

## Logotyp

`tuve-el-liggande-*.svg` är en liggande variant för sidhuvudet. Ordmärkets hårfina linjer är något förtjockade så att "TUVE EL" går att läsa i liten storlek. Originalet finns orört som `tuve-el-logo-*.svg`.
