# [Webmontag](https://webwirtschaft.net/webmontag): Webbluetooth

![Webbluetooth](/assets/icons/icon_192.png)

- Was ist Webbluetooth? 
- Wie sieht das in der Praxis aus?
- Wie hat es begonnen?
- Wie sieht die Zukunft aus?

<wm-tutorial tipps="Benutze die rechte Pfeiltaste ➡ oder wische nach links um zur nächsten Folie zu gelangen. Mit F11 kannst du zum Vollbild Modus wechseln."></wm-tutorial>

---

## Was ist Webbluetooth?

- Es ist eine [Web API](https://developer.mozilla.org/en-US/docs/Web/API)
- Bluetooth ist ein Industriestandard welche von der [SIG](https://de.wikipedia.org/wiki/Bluetooth_Special_Interest_Group) vorangetrieben wurde.
- Der Name wurde vom dänischen König [Harald Blauzahn](https://de.wikipedia.org/wiki/Harald_Blauzahn#Sonstiges) abgeleitet
- Das Logo ![Bluetooth](/assets/icons/bluetooth.svg) zeigt ein Monogram von altnordischen Runen
- Heutzutage bildet Sie eine Schnittstelle über die alle Geräte miteinander kabelos kommunizieren

---

### Wie funktioniert der Standard?

<div>
<div style="float:left; margin-right: 48px;">

![Eigenbaukombinat Halle](/assets/gatt.svg)

</div>
</div>

- Der [GATT](https://www.bluetooth.com/specifications/specs) Server (Generic Attribute Profile) ist ein Standard der definiert wie Daten versendet werden
- GATT verwendet einen Datenprotokoll namens ATT (Attribute Protocol)
- Nachdem du dich mit dem GATT Server des Gerätes verbunden hast erhälst du eine Liste von Services
- Ein Gerät kann mehere Services anbieten, die entwider von SIG oder vom Hersteller definiert werden. Services wie z.B. Bluetooth Köpfhörer können neben einem Audioservice den Service anbieten eine Playliste zu bedienen.
- Services haben Characteristics. Bei einem Characteristic handelt es sich um eine Low-Level Datenschnittstelle die die Daten des Services wiederspiegeln.
- Eine Characteristic gibt an ob man darauf Schreiben, Lesen oder ( im Sinne eines Event Listener) zuhören kann. Beispiel: Bei einem BT Herz Schrittmesser könntest du einen Event Listener binden welche dir aktiv Daten liefert; oder bei einem Kassendrucker könntest du eine Characteristic mit Schreibrechte Druckbefehle übersenden.

Tipp: [nRF Connect](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp&hl=en&gl=US) kann nach Bluetooth Geräte Scannen, verbinden und Information über die Services und Characteristics preisgeben!

Quelle: [Adafruit](https://learn.adafruit.com/introduction-to-bluetooth-low-energy), [web.dev/bluetooth](https://web.dev/bluetooth/)

---
## Meine Vorgeschichte

- Als Kind hatte ich ein Gameboy Printer. Es war eine spaßige Erfahrung!
- Jahre später habe ich privat einen Bluetooth Kassendrucker erworben und ein bisschen einer Android App experimentiert
- Vor einigen Monaten hab ich beim Eigenbaukombinat eine Digital umgesetzte  Anwesenheitsliste bedient. Es war an einem Kassendrucker angeschlossen. Der Kassendrucker hat ein Code ausgedruckt womit du dich wieder abmelden konntest.
- Daneben lag eine Ausgiebige Beschreibung wie sie das umgesetzt haben: Mit ESC/POS.
- Ich war neugierig ob ich meinen Kassendrucker via Webbluetooth bedienen konnte...

![Eigenbaukombinat Halle](/assets/ebk.jpg)
![Eigenbaukombinat Halle](/assets/anwesenheitsliste.jpg)

[Eigenbaukombinat.de](https://eigenbaukombinat.de/)

---


## ESC/POS

![ESC/POS Quickreference](/assets/escpos-quickreference.jpg)

[ESC/POS quick reference](https://manualzz.com/doc/20630706/esc-pos-quick-reference)

- Kassendrucker bauen oft auf den [ESC/POS](https://en.wikipedia.org/wiki/ESC/P) (Epson Standard Code for Printers / Point of Sale) standard auf
- ESC/POS ist von EPSON entwickelt worden
- ESC weil es stark auf Escape Sequenzen aufbaut ( z.B ESC E, ESC F um etwas Fett zu markieren)


---
### Praxisbeispiel: Kassendrucker

Um diese Demo ausführen zu können braucht ihr:

- Ein Betriebsystem und Browser welches den Standard unterstützt
- Ein [ESC/POS Kompaktibles Gerät](https://www.amazon.de/s?k=esc%2Fpos+bluetooth)

<wm-bluetooth></wm-bluetooth>

[source](https://github.com/soelen/webmontag-webbluetooth/tree/main/src)


---

## Kann ich diesen Standard schon heute verwenden?

- Standard gibt es "erst" seit "2017" 
- Betriebsystemabhängig, am Anfang wurden z.B. nur Macbooks unterstützt.
- Auf Linuxrechner scheint es immernoch Probleme zu geben
- Auf manche Betriebsysteme ist das Feature absichtlich ausgeschaltet. Mit [chrome://flags](chrome://flags/#enable-web-bluetooth-new-permissions-backend) kann das erzwungen werden
- Hardwareabhängig, persöhnliche Erfahrung: Code hat sich [anders auf Mobilgeräte verhalten](https://bugs.chromium.org/p/chromium/issues/detail?id=1183721)

[caniuse](https://caniuse.com/web-bluetooth)

---

### Negativbeispiel: Daydreamcontroller

- 2017: Daydreamcontroller hat noch mit Webbluetooth funktioniert
- Nach einem Firmware Update des Controllers: [Event Listener hat nicht mehr funktioniert](https://github.com/mrdoob/daydream-controller.js)
- Wurde wahrscheinlich wegen dem kommerziellen Fehlschlag von Daydream nicht mehr verfolgt an was es liegen könnte

<wm-youtube>https://www.youtube.com/watch?v=gMQQvL-3Psg</wm-youtube>

Durch diese Belege zeigt sich eins: Die experimentelle Technologie ist immernoch experimentell.

--- 

## Webbluetooth ≠ Webbluetooth

- Es gab den versuch von Mozilla ein eigenes Browserbasierendes Betriebsystem namens Firefox OS zu etablieren
- Um Hardware für Webapp Entwickler zugänglich zu machen wurden extrem viele "Web" Standards geschrieben
- Es gab einen alten, inoffizellen [Web Bluetooth API Standard](http://man.hubwiz.com/docset/JavaScript.docset/Contents/Resources/Documents/developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/API/Bluetooth_API.html)
- [Webapp](https://github.com/begeeben/firefox-os-browser-sample), sind für Firefox OS geschriebene Applikationen, die mit Webtechnologien ermöglicht werden. 

---

### Webapp ist tot, es lebe PWA!

- PWA's sind Progressive Web Apps welche eine weitere Form Applikationen mit Webtechnologien zu ermöglichen
- PWA können lokal gespeichert werden
- In verbindung mit Web API's wie z.B. Webbluetooth lassen sich Webapplikationen mit Hardwarezugriff schreiben
- Praxisbeispiel diese Präsentation ist eine PWA! Somit habe ich sobald ich diese Präsentation installiert habe jederzeit die Möglichkeit meinen Kassendrucker zu bedienen! ✨

Kurzum: PWA's in verbindung mit Web API's rockt! Aber nach all den Jahren werden Webapplikationen die auf Hardware zugreifen erst einmal eine romantische Idee bleiben. 😊

chrome://inspect#devices


---

# Vielen Dank!

![webmontag-webbluetooth.netlify.app](/assets/url.png)

[webmontag-webbluetooth.netlify.app](https://webmontag-webbluetooth.netlify.app/)
