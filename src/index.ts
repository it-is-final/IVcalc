//! SPDX-License-Identifier: AGPL-3.0-only
/*
    This file is a part of IVcalc.
    Copyright 2024 Luong Truong

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, version 3.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict"

import Papa from 'papaparse'
import { LevelUpStats, calculateIVs, Stat } from './calc'

// Type/interface declarations

interface MonEntry {
    "Number": number;
    "Name": string;
    "Form": string;
    "HP": number;
    "Attack": number;
    "Defense": number;
    "Sp.Attack": number;
    "Sp.Defense": number;
    "Speed": number;
};

// HTML Elements declarations

const mainForm = document.getElementById("mainForm") as HTMLFormElement;
const genSelect = document.getElementById("generationSelector") as HTMLSelectElement;
const monSelect = document.getElementById("monSelector") as HTMLInputElement;
const monSelectList = document.getElementById("monList") as HTMLDataListElement;
const monFormSelect = document.getElementById("regionalSelector") as HTMLSelectElement;
const charSelect = document.getElementById("characteristicSelector") as HTMLSelectElement;
const hPowerSelect = document.getElementById("hiddenPowerSelector") as HTMLSelectElement;
const statsInput = document.getElementById("levelStatsInput") as HTMLTextAreaElement;
const considerEVsSwitch = document.getElementById("considerEVsSwitch") as HTMLInputElement;
const diffModeSwitch = document.getElementById("diffCalcSwitch") as HTMLInputElement;

// Globals declarations

let monLookup: MonEntry[];

function createOption(
    value: string,
    targetList: HTMLSelectElement | HTMLDataListElement
) {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    targetList.appendChild(option);
}

function pullFromCSV(gen: string) {
    const csvRequest = ((gen) => {
        switch (gen) {
            case "3": 
            case "4": 
            case "5": return fetch("./assets/pkmn_g2-g5.csv");
            case "6": return fetch("./assets/pkmn_g6.csv");
            case "7": return fetch("./assets/pkmn_g7.csv");
            case "8": return fetch("./assets/pkmn_g8.csv");
            case "9": return fetch("./assets/pkmn_g9.csv");
        }
    })(gen);
    return csvRequest
    .then(request => request.text())
    .then(csv => Papa.parse(csv, {
        header: true,
        complete: results => console.log(`${results.data.length} entries parsed`),
        transform: (value, header) => {
            switch(header) {
                case "Number":
                case "HP": 
                case "Attack":
                case "Defense":
                case "Sp.Attack":
                case "Sp.Defense": 
                case "Speed": return parseInt(value);
                case "Name":
                case "Form": return value;
            }
        }
    }) as Papa.ParseResult<MonEntry>)
}

function updateFilterState(gen: string) {
    const resetSelectedOptions = (options: HTMLOptionsCollection) => {
        for (const option of options) {
            option.selected = option.defaultSelected;
        }
    }
    switch (gen) {
        case "3":
            charSelect.disabled = true;
            hPowerSelect.disabled = false;
            resetSelectedOptions(charSelect.options);
            break;
        case "4":
            charSelect.disabled = false;
            hPowerSelect.disabled = false;
            break;
        case "5":
            charSelect.disabled = false;
            hPowerSelect.disabled = false;
            break;
        case "6":
            charSelect.disabled = false;
            hPowerSelect.disabled = false;
            break;
        case "7":
            charSelect.disabled = false;
            hPowerSelect.disabled = false;
            break;
        case "8":
            charSelect.disabled = false;
            hPowerSelect.disabled = true;
            resetSelectedOptions(hPowerSelect.options);
            break;
        case "9":
            charSelect.disabled = false;
            hPowerSelect.disabled = true;
            resetSelectedOptions(hPowerSelect.options);
            break;
    }
}

function updateMonList(csvData: MonEntry[], gen: string) {
    for (let i = monSelectList.options.length - 1; i >= 0; i--) {
        monSelectList.removeChild(monSelectList.options[i]);
    }
    let nDexThreshold: number;
    switch (gen) {
        case "3": nDexThreshold = 386; break;
        case "4": nDexThreshold = 493; break;
        case "5": nDexThreshold = 649; break;
        case "6": nDexThreshold = 721; break;
        case "7": nDexThreshold = 809; break;
        case "8": nDexThreshold = 905; break;
        case "9": nDexThreshold = 1025; break;
    }
    monLookup = csvData
                .filter(entry => (entry["Number"] >= 1 && entry["Number"] <= nDexThreshold));
    for (const name of ([...new Set(
        monLookup.map(entry => entry["Name"])
    )])) {
        createOption(name, monSelectList);
    }
}

function getCurrentMonForms(currentMon: string) {
    const defaultOption = (() => {
        const option = document.createElement("option");
        option.innerText = "–";
        option.value = "";
        option.defaultSelected = true;
        return option;
    })();
    for (let i = monFormSelect.options.length - 1; i >= 0; i--) {
        monFormSelect.remove(i);
    }
    const currentMonEntries = monLookup.filter(mon => mon["Name"] === currentMon);
    if (currentMonEntries.length > 1) {
        monFormSelect.disabled = false;
        const forms = currentMonEntries.map(entry => entry["Form"]);
        for (const form of forms) {
            if (form !== "") {
                createOption(form, monFormSelect);
            } else {
                monFormSelect.add(defaultOption);
            }
        }
    } else {
        monFormSelect.add(defaultOption);
        monFormSelect.disabled = true;
    }
}

function getSetMonBaseStats(currentMonName: string, currentMonForm: string) {
    if (!(monLookup.map(entry => entry["Name"]).includes(currentMonName))) {
        return;
    }
    const currentMon: MonEntry = monLookup.find(
        entry => (entry["Name"] === currentMonName) && (entry["Form"] === currentMonForm)
    );
    const baseStatInputs = {
        "HP": (document.getElementById("baseHP") as HTMLInputElement),
        "Attack": (document.getElementById("baseAtk") as HTMLInputElement),
        "Defense": (document.getElementById("baseDef") as HTMLInputElement),
        "Sp.Attack": (document.getElementById("baseSpA") as HTMLInputElement),
        "Sp.Defense": (document.getElementById("baseSpD") as HTMLInputElement),
        "Speed": (document.getElementById("baseSpe") as HTMLInputElement)
    };
    const baseStatOutputs = {
        "HP": (document.getElementById("displayBaseHP") as HTMLTableCellElement),
        "Attack": (document.getElementById("displayBaseAtk") as HTMLTableCellElement),
        "Defense": (document.getElementById("displayBaseDef") as HTMLTableCellElement),
        "Sp.Attack": (document.getElementById("displayBaseSpA") as HTMLTableCellElement),
        "Sp.Defense": (document.getElementById("displayBaseSpD") as HTMLTableCellElement),
        "Speed": (document.getElementById("displayBaseSpe") as HTMLTableCellElement)
    };
    baseStatInputs["HP"].value = currentMon["HP"].toString();
    baseStatInputs["Attack"].value = currentMon["Attack"].toString();
    baseStatInputs["Defense"].value = currentMon["Defense"].toString();
    baseStatInputs["Sp.Attack"].value = currentMon["Sp.Attack"].toString();
    baseStatInputs["Sp.Defense"].value = currentMon["Sp.Defense"].toString();
    baseStatInputs["Speed"].value = currentMon["Speed"].toString();
    baseStatOutputs["HP"].innerText = baseStatInputs["HP"].value;
    baseStatOutputs["Attack"].innerText = baseStatInputs["Attack"].value;
    baseStatOutputs["Defense"].innerText = baseStatInputs["Defense"].value;
    baseStatOutputs["Sp.Attack"].innerText = baseStatInputs["Sp.Attack"].value;
    baseStatOutputs["Sp.Defense"].innerText = baseStatInputs["Sp.Defense"].value;
    baseStatOutputs["Speed"].innerText = baseStatInputs["Speed"].value;
}

function fixDiffStatsInput(_?: any) {
    statsInput.value = statsInput.value.replace(/(?<=^)\n/gm, "");
}

window.onload = () => {
    updateFilterState(genSelect.value);
    pullFromCSV(genSelect.value)
    .then(data => data.data)
    .then(data => {
        updateMonList(data, genSelect.value);
        getCurrentMonForms(monSelect.value);
    })
}

genSelect.addEventListener("change", function() {
    updateFilterState(this.value);
    pullFromCSV(this.value)
    .then(data => updateMonList(data.data, this.value))
    .then(() => {
        getCurrentMonForms(monSelect.value);
        getSetMonBaseStats(monSelect.value, monFormSelect.value);
    });
});

monSelect.addEventListener("change", function() {
    getCurrentMonForms(this.value);
    getSetMonBaseStats(this.value, monFormSelect.value);
});

monFormSelect.addEventListener("change", function() {
    getSetMonBaseStats(monSelect.value, this.value);
});

diffModeSwitch.addEventListener("change", fixDiffStatsInput);

statsInput.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9\s]+| {2,}| (?=\n)/,'');
    if (diffModeSwitch.checked) {
        fixDiffStatsInput();
    }
});

mainForm.onsubmit = _ => false;

mainForm.addEventListener("submit", function() {
    const displayIVs = {
        "HP": (document.getElementById("displayHPIV") as HTMLTableCellElement),
        "Attack": (document.getElementById("displayAtkIV") as HTMLTableCellElement),
        "Defense": (document.getElementById("displayDefIV") as HTMLTableCellElement),
        "Sp.Attack": (document.getElementById("displaySpAIV") as HTMLTableCellElement),
        "Sp.Defense": (document.getElementById("displaySpDIV") as HTMLTableCellElement),
        "Speed": (document.getElementById("displaySpeIV") as HTMLTableCellElement)
    };
    let levelUpStats: LevelUpStats[] = [];
    let levelUpEVs: LevelUpStats[] = [];
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    const considerEVs = data["considerEVs"] !== undefined;
    const exactMode = data["calcMode"] === "exact";
    const rawLevelUpStats = data["levelStats"].toString().split("\n")
                            .map(level => level.split(' ').map(stat => parseInt(stat)));
    let level = parseInt(data["initialLevel"].toString());
    levelUpStats.push(
        {
            "Level": level,
            "HP": parseInt(data["initialHP"].toString()),
            "Attack": parseInt(data["initialAtk"].toString()),
            "Defense": parseInt(data["initialDef"].toString()),
            "Sp.Attack": parseInt(data["initialSpA"].toString()),
            "Sp.Defense": parseInt(data["initialSpD"].toString()),
            "Speed": parseInt(data["initialSpe"].toString())
        }
    );
    levelUpEVs.push(
        {
            "Level": level,
            "HP": considerEVs ? parseInt(data["initialHPEV"].toString()) : 0,
            "Attack": considerEVs ? parseInt(data["initialAtkEV"].toString()) : 0,
            "Defense": considerEVs ? parseInt(data["initialDefEV"].toString()) : 0,
            "Sp.Attack": considerEVs ? parseInt(data["initialSpAEV"].toString()) : 0,
            "Sp.Defense": considerEVs ? parseInt(data["initialSpDEV"].toString()) : 0,
            "Speed": considerEVs ? parseInt(data["initialSpeEV"].toString()) : 0
        }
    );
    for (const levelStat of rawLevelUpStats) {
        ++level;
        const getPrevStat = (stat: Stat) => (
            levelUpStats[levelUpStats.length - 1][stat]
        );
        if (levelStat.length === 1 && levelStat.includes(NaN)) { 
            continue;
        }
        if (levelStat.length !== (considerEVs ? 12 : 6)) {
            alert("Input is incorrectly formatted, please fix this.");
            return;
        };
        levelUpStats.push(
            {
                "Level": level,
                "HP": exactMode ? levelStat[0] : getPrevStat("HP") + levelStat[0],
                "Attack": exactMode ? levelStat[1] : getPrevStat("Attack") + levelStat[1],
                "Defense": exactMode ? levelStat[2] : getPrevStat("Defense") + levelStat[2],
                "Sp.Attack": exactMode ? levelStat[3] : getPrevStat("Sp.Attack") + levelStat[3],
                "Sp.Defense": exactMode ? levelStat[4] : getPrevStat("Sp.Defense") + levelStat[4],
                "Speed": exactMode ? levelStat[5] : getPrevStat("Speed") + levelStat[5]
            }
        );
        levelUpEVs.push(
            {
                "Level": level,
                "HP": considerEVs ? levelStat[6] : 0,
                "Attack": considerEVs ? levelStat[7] : 0,
                "Defense": considerEVs ? levelStat[8] : 0,
                "Sp.Attack": considerEVs ? levelStat[9] : 0,
                "Sp.Defense": considerEVs ? levelStat[10] : 0,
                "Speed": considerEVs ? levelStat[11] : 0
            }
        );
    }
    const [hpIVRange, atkIVRange, defIVRange, spaIVRange, spdIVRange, speIVRange] = calculateIVs(
        {
            "HP": parseInt(data["baseHP"].toString()),
            "Attack": parseInt(data["baseAtk"].toString()),
            "Defense": parseInt(data["baseDef"].toString()),
            "Sp.Attack": parseInt(data["baseSpA"].toString()),
            "Sp.Defense": parseInt(data["baseSpD"].toString()),
            "Speed": parseInt(data["baseSpe"].toString())
        },
        levelUpStats,
        levelUpEVs,
        data["nature"].toString(),
        (data["characteristic"] !== undefined ? data["characteristic"].toString() : ""),
        (data["hiddenPower"] !== undefined ? data["hiddenPower"].toString() : "")
    );
    displayIVs["HP"].innerText = hpIVRange.join(", ");
    displayIVs["Attack"].innerText = atkIVRange.join(", ");
    displayIVs["Defense"].innerText = defIVRange.join(", ");
    displayIVs["Sp.Attack"].innerText = spaIVRange.join(", ");
    displayIVs["Sp.Defense"].innerText = spdIVRange.join(", ");
    displayIVs["Speed"].innerText = speIVRange.join(", ");
});

considerEVsSwitch.addEventListener("change", function() {
    if (this.checked) {
        for (const element of document.querySelectorAll(".initialEVSettings")) {
            (element as HTMLElement).hidden = false;
            if (element.nodeName === "INPUT") (element as HTMLInputElement).disabled = false;
        }
    }
    if (!this.checked) {
        for (const element of document.querySelectorAll(".initialEVSettings")) {
            (element as HTMLElement).hidden = true;
            if (element.nodeName === "INPUT") (element as HTMLInputElement).disabled = true;
        }
    }
});
