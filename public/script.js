// Setze hier dein Start- und Enddatum ein
const startDate = new Date('2025-02-17T08:00:00'); // Beispiel: Startdatum
const endDate   = new Date('2025-02-22T18:00:00');   // Beispiel: Enddatum

function updateProgress() {
  const now = new Date();
  const totalDuration = endDate - startDate;
  const elapsed = now - startDate;
  
  let progress = Math.floor((elapsed / totalDuration) * 100);
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;
  
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = progress + '%';
  progressBar.textContent = progress + '%';
  
  const dateInfo = document.getElementById('date-info');
  if (now < startDate) {
    dateInfo.textContent = 'Die Blockwoche hat noch nicht begonnen.';
  } else if (now > endDate) {
    dateInfo.textContent = 'Blockwoche beendet! Gut gemacht!';
  } else {
    const timeLeft = endDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    dateInfo.textContent = `Verbleibende Zeit: ${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
  }
  
  updateMilestones();
}

function updateMilestones() {
  const milestonesContainer = document.getElementById('milestones');
  milestonesContainer.innerHTML = ''; // Alte Einträge löschen
  
  // Erstelle Kopien von Start- und Enddatum und setze die Uhrzeit auf Mitternacht
  let current = new Date(startDate);
  current.setHours(0,0,0,0);
  const end = new Date(endDate);
  end.setHours(0,0,0,0);
  
  // Heutiges Datum, ebenfalls auf Mitternacht gesetzt
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Schleife durch alle Tage von Start bis Enddatum
  while (current <= end) {
    const li = document.createElement('li');
    // Formatierung: Wochentag, Datum
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
    li.textContent = current.toLocaleDateString(undefined, options);
    
    // Wenn der Tag vor heute liegt, als "überlebt" markieren:
    if (current < today) {
      li.style.textDecoration = 'line-through';
      li.style.color = 'green';
      li.textContent = '✓ ' + li.textContent;
    }
    
    milestonesContainer.appendChild(li);
    // Gehe zum nächsten Tag
    current.setDate(current.getDate() + 1);
  }
}

// Initiale Aktualisierung
updateProgress();
// Aktualisiere die Anzeige jede Sekunde
setInterval(updateProgress, 1000);
