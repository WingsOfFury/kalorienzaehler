// Holen der Elemente aus dem DOM
const calorieCounter = document.getElementById("calorie-counter"); // Formular für den Kalorienzähler
const budgetNumberInput = document.getElementById("budget"); // Eingabefeld für das Kalorienbudget
const entryDropdown = document.getElementById("entry-dropdown"); // Dropdown für die Auswahl der Kategorie (Frühstück, Mittagessen, etc.)
const addEntryButton = document.getElementById("add-entry"); // Button zum Hinzufügen neuer Eingabefelder
const clearButton = document.getElementById("clear"); // Button zum Zurücksetzen des Formulars
const output = document.getElementById("output"); // Bereich zur Anzeige der Ergebnisse
let isError = false; // Fehlerstatus-Flag

// Funktion zum Bereinigen von Eingabestrings, entfernt +, - und Leerzeichen
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

// Funktion zum Überprüfen auf ungültige Eingaben
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// Funktion zum Hinzufügen neuer Eingabefelder
function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Eingabe ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Eingabe ${entryNumber} Kalorien</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Kalorien"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

// Funktion zur Berechnung der Gesamtkalorien und Anzeige des Ergebnisses
function calculateCalories(e) {
  // Verhindert das Standardverhalten des Formulars (Seiten-Reload)
  e.preventDefault();
  // Setzt den Fehlerstatus zurück
  isError = false;

  // Sammeln aller Eingabefelder für die verschiedenen Mahlzeiten und Aktivitäten
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );

  // Berechnung der Kalorien für jede Kategorie
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  // Wenn ein Fehler vorliegt, wird die Funktion beendet
  if (isError) {
    return;
  }

  // Berechnung der konsumierten und verbleibenden Kalorien
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Überschuss" : "Defizit";

  // Ausgabe des Ergebnisses
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Kalorien ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Geplante Kalorien</p>
  <p>${consumedCalories} Kalorienverbrauch</p>
  <p>${exerciseCalories} Kalorienverbrauch durch Bewegung</p>
  `;

  output.classList.remove("hide");
}

// Funktion zum Sammeln und Berechnen der Kalorien aus den Eingabefeldern
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value); // Bereinigen der Eingabe
    const invalidInputMatch = isInvalidInput(currVal); // Überprüfen auf ungültige Eingaben

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`); // Warnung bei ungültiger Eingabe
      isError = true; // Setzen des Fehlerstatus
      return null;
    }
    calories += Number(currVal); // Hinzufügen der Kalorien zur Gesamtsumme
  }
  return calories;
}

// Funktion zum Zurücksetzen des Formulars
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = ""; // Leeren der Eingabefelder
  }

  budgetNumberInput.value = ""; // Zurücksetzen des Kalorienbudgets
  output.innerText = ""; // Leeren der Ausgabe
  output.classList.add("hide"); // Verstecken der Ausgabe
}

// Event Listener zum Hinzufügen neuer Eingabefelder
addEntryButton.addEventListener("click", addEntry);

// Event Listener zum Berechnen der Kalorien bei Formularübermittlung
calorieCounter.addEventListener("submit", calculateCalories);

// Event Listener zum Zurücksetzen des Formulars
clearButton.addEventListener("click", clearForm);
