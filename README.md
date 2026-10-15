# 1DV610-laboration-3

En enkel webbapplikation för att välja och beställa teprodukter.

Testa den publika webbappen: [Tebutik](https://rosa24-bth.github.io/1DV610-laboration-3/)

## Användning

Lägg produkter i varukorgen och ändra antalet med plus- och minusknapparna. Du kan ta bort produkter, använda en procentuell rabatt eller tömma varukorgen.

Fyll i namn och e-postadress och klicka på "Skapa beställning" för att se en ordersammanfattning. Appen är en demo av en beställning. Innehållet återställs när sidan laddas om.

## Vision

Applikationen hjälper kunden att välja teprodukter, hantera sin varukorg och skapa en sammanfattning av sin beställning efter att kunduppgifterna har kontrollerats.

## Krav

- **K1:** Kunden kan se en lista med produkter och priser.
- **K2:** Kunden kan lägga till produkter med ett positivt heltalsantal.
- **K3:** Kunden kan ändra antal och ta bort produkter.
- **K4:** Kunden kan se delsumma, rabatt och totalsumma.
- **K5:** Kunden kan ange en procentuell rabatt mellan 0 och 100.
- **K6:** Kunden kan tömma varukorgen.
- **K7:** Kunden måste ange namn och en e-postadress med giltigt format. Fel visas tydligt.
- **K8:** En tom varukorg kan inte beställas.
- **K9:** En giltig beställning visar en sammanfattning med produkter, pris och kunduppgifter.

## Moduler

Appen använder [Shopping Cart Module](https://github.com/rosa24-bth/1DV610-laboration-2)
för varukorgen. Modulen finns i `modules/shopping-cart/`.

Kunduppgifterna kontrolleras med [Form Validation Module](https://github.com/Fielifia/1dv610-laboration-2),
som finns i `modules/form-validation/`.

## Kör lokalt

Du behöver Git och Python 3.

```bash
git clone https://github.com/rosa24-bth/1DV610-laboration-3.git
cd 1DV610-laboration-3
python3 -m http.server 8000 --bind 127.0.0.1
```

Öppna http://127.0.0.1:8000 i webbläsaren. Låt terminalen vara igång medan du använder appen. Stoppa servern med Ctrl+C.

## Tester

Testfall och resultat finns i [TEST_REPORT.md](TEST_REPORT.md).
