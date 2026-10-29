# Brain-climb
Quiz app with progress meter

by Raul Del Pozo, Maja Karlsson, Johanna Krantz, Kevin Nkurunziza.

## Publicerad sida

[Fyll Burken](https://fyllburken.netlify.app/)


## 🎨 Design & Prototyp

Projektets skisser hittar du i Figma:
* [Figma-skiss (Grupp 2)](https://www.figma.com/design/kS2jRT6fNzn0yOXrxhJ68A/Grupp-2-Skiss?node-id=1-414&t=7Xas74f4SBGfHBi9-0)


# Brain Climb – Fyll burken

Ett vardagsquiz i webbläsaren med 10 blandade frågor om världen omkring oss. Varje rätt svar fyller ett fack i en "score jar". Målet är att få burken så full som möjligt.

## Så fungerar appen

### 1. Startsidan (`index.html`)
- Spelaren skriver in sitt namn och startar quizet med knappen eller Enter.
- Namnet sparas, och nästa gång man besöker sidan står det redan i fältet.
- Har man ett quiz som inte är klart dyker knappen **"Fortsätt påbörjat quiz"** upp, så man kan fortsätta där man slutade.
- Startar man ett nytt quiz rensas det gamla, ofärdiga quizet bort.

### 2. Frågesidan (`html/quiz.html`)
- Frågorna hämtas från `data/question.json`.
- Varje fråga har fyra svarsalternativ (A–D) och en timer som räknar ner.
- När man svarar, eller när tiden tar slut:
  - låses alternativen, och det rätta svaret markeras med ✓ och ett felaktigt val med ✗ (både med färg och med tecken)
  - visas feedback: *"Pang på!"* vid rätt svar och *"Nära, men nej"* eller *"Tiden tog slut"* vid fel svar, tillsammans med en kort "Visste du?"-förklaring
  - uppdateras poängen, och burkbilden byts ut så att den blir fullare för varje rätt svar
- En progressbar och en räknare (t.ex. 3/10) visar vilken fråga man är på.
- Knappen **"Nästa fråga"** aktiveras och får fokus, så det går att spela med bara tangentbordet. På sista frågan står det **"Se resultat"** på knappen.
- Hur långt man har kommit sparas efter varje svar. Om man laddar om sidan eller lämnar den fortsätter quizet på samma fråga.
- Kommer man till frågesidan utan att ha angett ett namn skickas man tillbaka till startsidan.

### 3. Topplistan (`html/leaderboard.html`)
- När quizet är slut sparas resultatet (namn, poäng, antal frågor och datum), och man skickas vidare till topplistan.
- Alla omgångar visas sorterade efter poäng, med en stapel som visar hur många rätt man fick.
- Den senaste omgången markeras med "– din omgång".
- Högst upp står det bästa resultatet hittills.
- Finns det inga sparade omgångar står det "Inga omgångar än...".
- Med **"Spela igen"** kommer man tillbaka till startsidan.

## Teknik

- Vanlig HTML, CSS och JavaScript, utan ramverk och utan byggsteg
- ES-moduler (`type="module"`)
- `fetch` för att läsa in frågorna från JSON
- `localStorage` för att spara spelarnamn, pågående quiz och resultat

## Projektstruktur

```text
public/
├── index.html                  # Startsida
├── html/
│   ├── quiz.html               # Frågesida
│   └── leaderboard.html        # Topplista
├── data/
│   └── question.json           # Frågor, svar, rätt svar och förklaring
├── css/                        # base, layout, components + sidspecifik CSS
└── js/
    ├── main.js                 # Startpunkt – läser data-page på <body> och startar rätt sida
    ├── pages/
    │   ├── startPage.js        # Namn, starta / fortsätta quiz
    │   ├── quizPage.js         # Styr flödet: fråga → svar → feedback → nästa
    │   └── leaderboardPage.js  # Hämtar resultat och visar topplistan
    ├── api.js                  # Hämtar frågorna från JSON-filen
    ├── quiz.js                 # Spellogik och state (poäng, aktuell fråga, svar)
    ├── timer.js                # Nedräkningstimer per fråga
    ├── storage.js              # Läser och skriver till localStorage
    ├── render.js               # Uppdaterar DOM:en på frågesidan
    └── renderLeaderboard.js    # Bygger topplistan med en <template>
```

### Ansvarsfördelning i koden
Koden är uppdelad så att varje fil har ett eget ansvar:
- **`quiz.js`** innehåller bara logiken och vet inget om DOM:en.
- **`render.js`** och **`renderLeaderboard.js`** visar bara data och räknar ingenting själva.
- **`storage.js`** är den enda filen som använder `localStorage`.
- **`pages/*.js`** kopplar ihop allt för respektive sida.

## Kom igång

Frågorna hämtas med `fetch`, så appen måste köras via en lokal server. Det fungerar inte att öppna filen direkt med `file://`.

1. Klona repot.
2. Starta en lokal server i mappen `public/`, till exempel med **Live Server** i VS Code eller:
   ```bash
   npx serve public

## AI-användning
Vi har använt AI-verktyg som stöd under utvecklingen av projektet, bland annat för att få hjälp med felsökning, förståelse av kod och förslag på lösningar.

Vi har granskat den genererade koden och informationen genom att kontrollera att den passar projektets befintliga struktur och krav. Vi har även testat funktionerna i webbläsaren för att kontrollera att de fungerar som förväntat. Vi har inte utgått från att AI-genererade förslag automatiskt är korrekta, utan har granskat och vid behov anpassat dem till projektet.

Vi har använt AI för vår planering. Först gav AI oss en grovplanering som vi följde. Däremot ledde det till mycket merge conflicts, där vi arbetade i samma filer och även skrev samma kod. Vi bad därför om en tydligare fördelning av arbetet och fick tickets som vi kunde arbeta utifrån och på så sätt undivka merge conflicts. Varje gruppmedlem fick ansvara för sina filer. 
Vi har även använt AI för att granska och ge förslag på hur vi kan förbättra tillgängligheten. Främst för färgkonstraster. 

Under merge conflicts användes AI som stöd för att kunna lösa konflikten. 

## Reflektion
Vår idé från början var att ha en animation under tiden som användaren gör framsteg i applikationen. Vi insåg att detta skulel vara tidskrävande att producera, därav tog vi en enklare idé. Vi har därför två skisser i figma, en med animationen och en enklare variant som bara speglar användarens framsteg i en bild. Vi tror att det var smart att sänka ambitions nivån något för att verkligen fokusera på applikationslogiken och få en fungerande applikation först. 

En brist i arbetet var att vi kollade tillgängligheten i slutet av projektet när det nästan var klart. Detta gjorde att vi behövde ändra färger osv på slutet. När vi tog fram prototypen i figma skulle vi ha sagt det som ett krav att webbsidan ska vara tillgänglig (sedan granskat resultatet från AI).

Frågorna generas med JSON till en början, men tanken är att vi ska använda oss utav ett AI API för att generera frågedatan.