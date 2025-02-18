/* Bestehende Blockwoche-Funktionen */

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

// Initiale Aktualisierung der Blockwoche-Anzeige
updateProgress();
// Aktualisiere jede Sekunde
setInterval(updateProgress, 1000);


/* Neues Feature: Heutige Lehrveranstaltungen via Handlebars */

// Holt die Events aus dem API-Endpunkt, filtert für heute, berechnet den Fortschritt und rendert sie
function fetchAndRenderTodayEvents() {
  fetch('/api/events')
    .then(response => response.json())
    .then(events => {
      // Filtere Events, die heute stattfinden
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const todayEvents = events.filter(event => {
        const eventStart = new Date(event.start);
        return eventStart >= today && eventStart < tomorrow;
      });

      // Berechne den Fortschritt für jedes Event
      todayEvents.forEach(event => {
        event.progress = calculateEventProgress(event);
      });

      // Sortiere Events nach Startzeit
      todayEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

      // Rendere mit Handlebars
      const source = document.getElementById('events-template').innerHTML;
      const template = Handlebars.compile(source);

      // Hilfsfunktion zum Formatieren der Zeit
      Handlebars.registerHelper('formatTime', function(datetime) {
        const d = new Date(datetime);
        return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      });

      const context = { events: todayEvents };
      const html = template(context);
      document.getElementById('events-container').innerHTML = html/* Bestehende Blockwoche-Funktionen */

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
      
      // Initiale Aktualisierung der Blockwoche-Anzeige
      updateProgress();
      // Aktualisiere jede Sekunde
      setInterval(updateProgress, 1000);
      
      
      /* Neues Feature: Heutige Lehrveranstaltungen via Handlebars */
      
      // Variable, um die ausgewählte Gruppe zu verfolgen (Default: Gruppe A)
      let selectedGroup = 'groupA';
      
      // Toggle Button Event Listener
      document.getElementById('groupA-btn').addEventListener('click', () => {
        selectedGroup = 'groupA';
        document.getElementById('groupA-btn').classList.add('active');
        document.getElementById('groupB-btn').classList.remove('active');
        document.getElementById('events-header').textContent = 'Heutige Lehrveranstaltungen für Gruppe A';
        fetchAndRenderTodayEvents();
      });
      
      document.getElementById('groupB-btn').addEventListener('click', () => {
        selectedGroup = 'groupB';
        document.getElementById('groupB-btn').classList.add('active');
        document.getElementById('groupA-btn').classList.remove('active');
        document.getElementById('events-header').textContent = 'Heutige Lehrveranstaltungen für Gruppe B';
        fetchAndRenderTodayEvents();
      });
      
      // Holt die Events aus dem API-Endpunkt, filtert für heute, berechnet den Fortschritt und rendert sie
      function fetchAndRenderTodayEvents() {
        fetch(`/api/events?group=${selectedGroup}`)
          .then(response => response.json())
          .then(events => {
            // Filtere Events, die heute stattfinden
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            
            const todayEvents = events.filter(event => {
              const eventStart = new Date(event.start);
              return eventStart >= today && eventStart < tomorrow;
            });
      
            // Berechne den Fortschritt für jedes Event
            todayEvents.forEach(event => {
              event.progress = calculateEventProgress(event);
            });
      
            // Sortiere Events nach Startzeit
            todayEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
      
            // Rendere mit Handlebars
            const source = document.getElementById('events-template').innerHTML;
            const template = Handlebars.compile(source);
      
            // Hilfsfunktion zum Formatieren der Zeit
            Handlebars.registerHelper('formatTime', function(datetime) {
              const d = new Date(datetime);
              return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            });
      
            const context = { events: todayEvents };
            const html = template(context);
            document.getElementById('events-container').innerHTML = html;
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      }
      
      // Hilfsfunktion: Berechnet den Fortschritt eines Events (0 bis 100)
      function calculateEventProgress(event) {
        const now = new Date();
        const start = new Date(event.start);
        const end = new Date(event.end);
        
        if (now < start) {
          return 0;
        }
        if (now > end) {
          return 100;
        }
        const total = end - start;
        const elapsed = now - start;
        return Math.round((elapsed / total) * 100);
      }
      
      // Initiale Darstellung der heutigen Events
      fetchAndRenderTodayEvents();
      // Aktualisiere die Darstellung jede Minute
      setInterval(fetchAndRenderTodayEvents, 60000);
      ;
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
}

// Hilfsfunktion: Berechnet den Fortschritt eines Events (0 bis 100)
function calculateEventProgress(event) {
  const now = new Date();
  const start = new Date(event.start);
  const end = new Date(event.end);
  
  if (now < start) {
    return 0;
  }
  if (now > end) {
    return 100;
  }
  const total = end - start;
  const elapsed = now - start;
  return Math.round((elapsed / total) * 100);
}

// Initiale Darstellung der heutigen Events
fetchAndRenderTodayEvents();
// Aktualisiere die Darstellung jede Minute
setInterval(fetchAndRenderTodayEvents, 60000);
