# 1DV610-laboration-3

En enkel webbapplikation för att välja och beställa teprodukter.

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
