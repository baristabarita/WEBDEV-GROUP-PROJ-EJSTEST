const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
    }
  });

// Dummy percent value
const percentValue = 75;

// Create the doughnut chart
const chart = new Chart(document.getElementById("total-sales-graph").getContext('2d'), {
  type: 'doughnut',
  data: {
    labels: ['Sold', 'Remaining'],
    datasets: [{
      label: 'Sales',
      backgroundColor: ['#28a745', '#dc3545'],
      data: [percentValue, 100 - percentValue]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
        }
      }
    }
  }
});