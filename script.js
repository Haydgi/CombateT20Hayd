document.addEventListener('DOMContentLoaded', () => {
    loadNPCs();
    loadInitiatives();
});

function addNPC() {
    const npcName = document.getElementById('npcName').value;
    const npcLife = document.getElementById('npcLife').value;
    const npcMana = document.getElementById('npcMana').value;

    if (npcName && npcLife && npcMana) {
        const npcList = document.getElementById('npcList');

        const npcItem = document.createElement('div');
        npcItem.className = 'npc-item';

        npcItem.innerHTML = `
            <h2>${npcName}</h2>
            <div class="npc-attributes">
                <div>
                    <label>Vida Atual:</label>
                    <input type="number" value="${npcLife}" class="npc-current-life">
                    / <span>${npcLife}</span>
                </div>
                <div>
                    <label>Mana Atual:</label>
                    <input type="number" value="${npcMana}" class="npc-current-mana">
                    / <span>${npcMana}</span>
                </div>
            </div>
            <button onclick="removeNPC(this)">Remover NPC</button>
        `;

        npcList.appendChild(npcItem);
        saveNPCs();

        document.getElementById('npcName').value = '';
        document.getElementById('npcLife').value = '';
        document.getElementById('npcMana').value = '';
    }
}

function removeNPC(button) {
    const npcItem = button.parentElement;
    npcItem.remove();
    saveNPCs();
}

function saveNPCs() {
    const npcList = document.getElementById('npcList').children;
    const npcArray = [];

    for (let npc of npcList) {
        const npcName = npc.querySelector('h2').textContent;
        const npcLife = npc.querySelector('.npc-current-life').value;
        const npcMaxLife = npc.querySelector('.npc-attributes span').textContent;
        const npcMana = npc.querySelector('.npc-current-mana').value;
        const npcMaxMana = npc.querySelector('.npc-attributes span:last-of-type').textContent;

        npcArray.push({
            name: npcName,
            currentLife: npcLife,
            maxLife: npcMaxLife,
            currentMana: npcMana,
            maxMana: npcMaxMana
        });
    }

    localStorage.setItem('npcList', JSON.stringify(npcArray));
}

function loadNPCs() {
    const npcArray = JSON.parse(localStorage.getItem('npcList')) || [];

    for (let npc of npcArray) {
        const npcList = document.getElementById('npcList');

        const npcItem = document.createElement('div');
        npcItem.className = 'npc-item';

        npcItem.innerHTML = `
            <h2>${npc.name}</h2>
            <div class="npc-attributes">
                <div>
                    <label>Vida Atual:</label>
                    <input type="number" value="${npc.currentLife}" class="npc-current-life">
                    / <span>${npc.maxLife}</span>
                </div>
                <div>
                    <label>Mana Atual:</label>
                    <input type="number" value="${npc.currentMana}" class="npc-current-mana">
                    / <span>${npc.maxMana}</span>
                </div>
            </div>
            <button onclick="removeNPC(this)">Remover NPC</button>
        `;

        npcList.appendChild(npcItem);
    }
}

function addInitiative() {
    const initiativeName = document.getElementById('initiativeName').value;
    const initiativeValue = document.getElementById('initiativeValue').value;

    if (initiativeName && initiativeValue) {
        const initiativeList = document.getElementById('initiativeList');

        const initiativeItem = document.createElement('div');
        initiativeItem.className = 'initiative-item';

        initiativeItem.innerHTML = `
            <h2>${initiativeName}</h2>
            <p>Iniciativa: <input type="number" value="${initiativeValue}" class="initiative-value" onchange="updateInitiative(this)"></p>
            <button onclick="removeInitiative(this)">Remover Iniciativa</button>
        `;

        initiativeList.appendChild(initiativeItem);
        saveInitiatives();
        sortInitiatives();

        document.getElementById('initiativeName').value = '';
        document.getElementById('initiativeValue').value = '';
    }
}

function updateInitiative(input) {
    saveInitiatives();
    sortInitiatives();
}

function removeInitiative(button) {
    const initiativeItem = button.parentElement;
    initiativeItem.remove();
    saveInitiatives();
    sortInitiatives();
}

function saveInitiatives() {
    const initiativeList = document.getElementById('initiativeList').children;
    const initiativeArray = [];

    for (let initiative of initiativeList) {
        const initiativeName = initiative.querySelector('h2').textContent;
        const initiativeValue = initiative.querySelector('.initiative-value').value;

        initiativeArray.push({
            name: initiativeName,
            value: parseInt(initiativeValue)
        });
    }

    localStorage.setItem('initiativeList', JSON.stringify(initiativeArray));
}

function loadInitiatives() {
    const initiativeArray = JSON.parse(localStorage.getItem('initiativeList')) || [];

    for (let initiative of initiativeArray) {
        const initiativeList = document.getElementById('initiativeList');

        const initiativeItem = document.createElement('div');
        initiativeItem.className = 'initiative-item';

        initiativeItem.innerHTML = `
            <h2>${initiative.name}</h2>
            <p>Iniciativa: <input type="number" value="${initiative.value}" class="initiative-value" onchange="updateInitiative(this)"></p>
            <button onclick="removeInitiative(this)">Remover Iniciativa</button>
        `;

        initiativeList.appendChild(initiativeItem);
    }

    sortInitiatives();
}

function sortInitiatives() {
    const initiativeList = document.getElementById('initiativeList');
    const initiatives = Array.from(initiativeList.children);

    initiatives.sort((a, b) => {
        const valueA = parseInt(a.querySelector('.initiative-value').value);
        const valueB = parseInt(b.querySelector('.initiative-value').value);
        return valueB - valueA;
    });

    initiatives.forEach(initiative => initiativeList.appendChild(initiative));
}
