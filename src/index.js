const API_ENDPOINT = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function groupTicketsByStatus() {
  fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const tickets = data.tickets;

      const groupedTickets = {};
      tickets.forEach(ticket => {
        if (!groupedTickets[ticket.status]) {
          groupedTickets[ticket.status] = [];
        }
        groupedTickets[ticket.status].push(ticket);
      });

      displayGroupedTickets(groupedTickets);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function groupTicketsByUsers() {
  fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const tickets = data.tickets;
      const users = data.users;

      const userLookup = {};
      users.forEach(user => {
        userLookup[user.id] = user.name;
      });

      const groupedTickets = {};
      tickets.forEach(ticket => {
        const userName = userLookup[ticket.userId];
        if (!groupedTickets[userName]) {
          groupedTickets[userName] = [];
        }
        groupedTickets[userName].push(ticket);
      });

      displayGroupedTickets(groupedTickets);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function groupTicketsByPriority() {
  fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const tickets = data.tickets;

      const groupedTickets = {
        'No Priority': [],
        'Low Priority': [],
        'Medium Priority': [],
        'High Priority': [],
        'Urgent Priority': [],
      };

      tickets.forEach(ticket => {
        let priorityLabel = '';
        switch (ticket.priority) {
          case 0:
            priorityLabel = 'No Priority';
            break;
          case 1:
            priorityLabel = 'Low Priority';
            break;
          case 2:
            priorityLabel = 'Medium Priority';
            break;
          case 3:
            priorityLabel = 'High Priority';
            break;
          case 4:
            priorityLabel = 'Urgent Priority';
            break;
          default:
            priorityLabel = 'Unknown Priority';
        }

        groupedTickets[priorityLabel].push(ticket);
      });

      displayGroupedTickets(groupedTickets);
    })
    .catch(error => console.error('Error fetching data:', error));
}

const groupStatusButton = document.getElementById('groupStatusButton');
groupStatusButton.addEventListener('click', groupTicketsByStatus);

const groupUsersButton = document.getElementById('groupUsersButton');
groupUsersButton.addEventListener('click', groupTicketsByUsers);

const groupPriorityButton = document.getElementById('groupPriorityButton');
groupPriorityButton.addEventListener('click', groupTicketsByPriority);

function displayGroupedTickets(groupedTickets) {
  const groupedTicketsDiv = document.getElementById('groupedTickets');
  groupedTicketsDiv.innerHTML = '';

  for (const key in groupedTickets) {
    if (groupedTickets.hasOwnProperty(key)) {
      const groupColumn = document.createElement('div');
      groupColumn.classList.add('column');

      const heading = document.createElement('h3');
      heading.classList.add('column-heading');
      heading.innerHTML = `&#9679; ${key} - ${groupedTickets[key].length}`;

      // Center-align the heading text
      heading.style.textAlign = 'center';

      groupColumn.appendChild(heading);

      const groupCardList = document.createElement('ul');
      groupedTickets[key].forEach(ticket => {
        const ticketCard = document.createElement('div');
        ticketCard.classList.add('card');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<button class="circle-button"></button> <strong>${ticket.id}</strong><br>${ticket.title}<br>... &#9679; Feature text`;
        ticketCard.appendChild(listItem);
        groupCardList.appendChild(ticketCard);
      });

      groupColumn.appendChild(groupCardList);
      groupedTicketsDiv.appendChild(groupColumn);
    }
  }
}


groupTicketsByStatus();



