// Setze hier dein Start- und Enddatum ein
const startDate = new Date('2025-02-17T08:00:00'); // Beispiel: Startdatum
const endDate = new Date('2025-02-22T18:00:00');   // Beispiel: Enddatum

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
  
  // Zeige die verbleibende Zeit oder den Endstatus an
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
}

// Aktualisiere die Fortschrittsanzeige jede Sekunde
updateProgress();
setInterval(updateProgress, 1000);
