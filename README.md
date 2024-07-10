# Kalorienzaehler


<img width="1402" alt="github_kalorienzaehler" src="https://github.com/WingsOfFury/kalorienzaehler/assets/85767977/e62d853e-e1e3-42a2-8fac-76b996d377f3">

---




## Meine Learnings aus diesem Projekt

### DOM-Manipulation
- **Elemente abrufen:** <br /> Ich habe gelernt, wie man Elemente aus dem DOM mit `document.getElementById` und `document.querySelectorAll` abruft.
  ```javascript
  const calorieCounter = document.getElementById("calorie-counter");
  const budgetNumberInput = document.getElementById("budget");
  const entryDropdown = document.getElementById("entry-dropdown");
  ```

- **Neue Elemente hinzufügen:** <br /> Mit `insertAdjacentHTML` kann ich dynamische neue Eingabefelder erstellen und in das DOM einfügen.
  ```javascript
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
  ```
---

### Eingabevalidierung
- **Eingaben bereinigen:** <br /> Ich habe gelernt, wie man eine Eingabezeichenkette von unerwünschten Zeichen bereinigt, um sicherzustellen, dass nur gültige Daten verarbeitet werden.
  ```javascript
  function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, "");
  }
  ```
- **Ungültige Eingaben erkennen:** <br /> Mit regulären Ausdrücken kann Ich überprüfen, ob eine Eingabe in einem ungültigen Format vorliegt.
  ```javascript
  function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }
  ```
---
  
### Formularverarbeitung
- **Verhindern des Standardverhaltens:** <br /> Beim Absenden des Formulars verhindern wir das Standardverhalten (Seitenreload) und verarbeiten die Daten manuell.
  ```javascript
  function calculateCalories(e) {
    e.preventDefault();
  }
  ```
---

### Kalorienberechnung
- **Daten aus Eingabefeldern sammeln:** <br /> Ich habe gelernt, wie man Werte aus mehreren Eingabefeldern sammelt und summiert, um eine Gesamtsumme zu berechnen.
  ```javascript
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  ```

- **Berechnungen durchführen und Ergebnisse anzeigen:** <br /> Berechnungen durchführen und die Ergebnisse dynamisch in HTML anzeigen lassen.
  ```javascript
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Überschuss" : "Defizit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Kalorien ${surplusOrDeficit}</span>
  `;
  ```
---

### Fehlerbehandlung
- **Fehlererkennung und Benutzerwarnung:** <br /> Wenn ungültige Eingaben erkannt werden, setzen wir einen Fehlerstatus und warnen den Benutzer mit `alert`.
  ```javascript
  if (invalidInputMatch) {
    alert(`Invalid Input: ${invalidInputMatch[0]}`);
    isError = true;
    return null;
  }
  ```
---

### Formular zurücksetzen
- **Formularinhalte löschen und zurücksetzen:** <br /> Ich habe gelernt, wie man alle Eingabefelder und die Ausgabe zurücksetzt, um das Formular in den Ausgangszustand zu versetzen.
  ```javascript
  function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll(".input-container"));
  for (const container of inputContainers) {
    container.innerHTML = "";
  }
  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
  }
  ```
---

### Event-Listener
- **Interaktivität hinzufügen:** <br /> Durch das Hinzufügen von Event-Listenern können wir auf Benutzerinteraktionen reagieren und entsprechende Funktionen ausführen.
  ```javascript
  addEntryButton.addEventListener("click", addEntry);
  calorieCounter.addEventListener("submit", calculateCalories);
  clearButton.addEventListener("click", clearForm);
  ```
