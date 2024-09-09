import { fillMembersTable } from "./fillMembersTable";

function checkNaN(hr) {
  return hr.includes('NaN') ?  'NOT FOUND' : hr;
}
  
document.addEventListener('DOMContentLoaded', () => {

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    const allowedUrls = ['taiga'];

    if (!allowedUrls.some(url => currentUrl.includes(url))) {
      document.getElementById('error').style.display = 'block';
      document.getElementById('content').style.display = 'none';
    } else {
      document.getElementById('content').style.display = 'block';
      document.getElementById('error').style.display = 'none';
    }
  });

  document.getElementById('refresh').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getData' }, ({
      squadName,
      duration,
      totalHR,
      totalClosedHR,
      totalTypes,
      totalClosed,
      totalNew,
      remainingHours,
      totalPercent,
      storys,
      aggregatedMembersInfo,
      totalNewHR
    }) => {
      document.getElementById('squad-name').textContent = squadName || 'NOT FOUND';
      document.getElementById('duration').textContent = duration || 'NOT FOUND';
      document.getElementById('total-hr').textContent = `${checkNaN(totalClosedHR)} / ${checkNaN(totalHR)} (${checkNaN(remainingHours)} - ${checkNaN(totalPercent)}%)` || 'NOT FOUND';
      document.getElementById('qtd-closed').textContent = totalClosed || 'NOT FOUND';
      document.getElementById('qtd-new').textContent = totalNew || 'NOT FOUND';
      document.getElementById('qtd-new-hr').textContent = totalNewHR || 'NOT FOUND';

      const totalOfTotalTypes = Object.values(totalTypes).reduce((acc: number, curr: number) => acc + curr, 0);
      document.getElementById('qtd-total').textContent = 
      `${totalOfTotalTypes} (${Object.entries(totalTypes).map(([key, value]) => `${key}: ${value}`).join(', ')})`;

      document.getElementById('storys').innerHTML = storys
        .map((story) => `
          <li>
            <strong>${story.name}</strong>
            <ul>
              <li>TOTAL (HR): ${checkNaN(story.totalHR)} (${checkNaN(story.remainingHours)} - ${checkNaN(story.totalPercent)}%)</li>
              <li>CLOSED (HR): ${checkNaN(story.totalClosedHR)} / NEW CLOSED: ${checkNaN(story.totalNewHR)}</li>
              <li>TASKS (QTD): ${story.tasks.length} (CLOSED: ${story.totalClosed} / NEW: ${story.totalNew})</li>
            </ul>
          </li>
        `)
        .join('');
      
        fillMembersTable('members-info', aggregatedMembersInfo)
    });
  });
});