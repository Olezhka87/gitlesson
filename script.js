
    const graphData = {
        revenue: {
          title: 'Выручка',
          data: [500521, 480521, 4805121],
        },
        cash: {
          title: 'Наличные',
          data: [300000, 300000, 300000],
        },
        card: {
          title: 'Безналичный расчет',
          data: [100000, 100000, 100000],
        },
        credit_card: {
          title: 'Кредитные карты',
          data: [100521, 100521, 100521],
        },
        avg_check: {
          title: 'Средний чек, руб',
          data: [1300, 900, 1100],
        },
        avg_guest: {
          title: 'Средний гость, руб',
          data: [1200, 800, 1000],
        },
        removal_after_payment: {
          title: 'Удаление из чека (после оплаты)',
          data: [1000, 1100, 1050],
        },
        removal_before_payment: {
          title: 'Удаление из чека (до оплаты)',
          data: [1300, 1300, 1300],
        },
        checks: {
          title: 'Количество чеков',
          data: [34, 36, 35],
        },
        guests: {
          title: 'Количество гостей',
          data: [34, 36, 35],
        },
      };
  

      function updateData(input, type) {
        const row = input.closest('tr');
        const currentDayCell = row.querySelector('.current-day');
        const yesterdayCell = row.querySelector('.yesterday');
        const resultCell = row.querySelector('.result');
        const percentageCell = row.querySelector('.percentage');
  
        const currentValue = parseFloat(currentDayCell.textContent.replace(' ', ''));
        const yesterdayValue = parseFloat(yesterdayCell.textContent.replace(' ', '').split(' ')[0]);
  
        let percentageChange = ((currentValue - yesterdayValue) / yesterdayValue) * 100;
        const percentageChangeText = percentageChange.toFixed(2) + '%';
        percentageCell.textContent = percentageChangeText;
  
        if (percentageChange < 0) {
          percentageCell.style.color = 'rgba(255, 0, 0, 1)';  
        } else {
          percentageCell.style.color = 'rgba(34, 139, 34, 1)'; 
        }
  
        const resultValue = currentValue + (yesterdayValue - currentValue) * 0.5; 
        resultCell.textContent = resultValue.toFixed(2);
  
        if (resultValue > 5000000) {
          resultCell.classList.add('highlight-red');
          resultCell.classList.remove('highlight-green', 'highlight-grey');
        } else if (resultValue <= 0) {
          resultCell.classList.add('highlight-grey');
          resultCell.classList.remove('highlight-red', 'highlight-green');
        } else {
          resultCell.classList.add('highlight-green');
          resultCell.classList.remove('highlight-red', 'highlight-grey');
        }
  

        showGraph(type, row);
      }

      function showGraph(type, row) {
        const data = graphData[type];
  
 
        const existingGraphRow = document.getElementById('graph-row');
        if (existingGraphRow) {
          existingGraphRow.remove();
        }
  
        const graphRow = document.createElement('tr');
        graphRow.id = 'graph-row';
        graphRow.innerHTML = `<td colspan="4"><div id="graph-container"></div></td>`;
        row.insertAdjacentElement('afterend', graphRow);
  
        Highcharts.chart('graph-container', {
          chart: {
            type: 'line'
          },
          title: {
            text: data.title
          },
          subtitle: {
            text: 'График изменения показателей по дням недели'
          },
          xAxis: {
            categories: ['Пон', 'Втор', 'Сред', 'Чет', 'Пят', 'Суб', 'Воск'],
            title: {
              text: 'День недели'
            }
          },
          yAxis: {
            title: {
              text: 'Значение'
            }
          },
          series: [{
            name: data.title,
            data: data.data,
            color: '#007bff'
          }]
        });
  
        const rows = document.querySelectorAll('tr');
        rows.forEach((r) => r.classList.remove('selected'));
        row.classList.add('selected');
      }