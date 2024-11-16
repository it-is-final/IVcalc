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

export type Stat = "HP" | "Attack" | "Defense" | "Sp.Attack" | "Sp.Defense" | "Speed"

interface BaseStats {
    "HP": number,
    "Attack": number,
    "Defense": number,
    "Sp.Attack": number,
    "Sp.Defense": number,
    "Speed": number
}

export interface LevelUpStats {
    "Level": number,
    "HP": number,
    "Attack": number,
    "Defense": number,
    "Sp.Attack": number,
    "Sp.Defense": number,
    "Speed": number
}

interface Characteristic {
    "Stat": Stat,
    "IVs": number[]
}

interface NatureModifiers {
    "Attack": 0.9 | 1.0 | 1.1,
    "Defense": 0.9 | 1.0 | 1.1,
    "Speed": 0.9 | 1.0 | 1.1,
    "Sp.Attack": 0.9 | 1.0 | 1.1,
    "Sp.Defense": 0.9 | 1.0 | 1.1
}

const Natures = Object.freeze({
    "Hardy": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Lonely": {"Attack": 1.1, "Defense": 0.9, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Brave": {"Attack": 1.1, "Defense": 1.0, "Speed": 0.9, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Adamant": {"Attack": 1.1, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 0.9, "Sp.Defense": 1.0},
    "Naughty": {"Attack": 1.1, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 0.9},
    "Bold": {"Attack": 0.9, "Defense": 1.1, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Docile": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Relaxed": {"Attack": 1.0, "Defense": 1.1, "Speed": 0.9, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Impish": {"Attack": 1.0, "Defense": 1.1, "Speed": 1.0, "Sp.Attack": 0.9, "Sp.Defense": 1.0},
    "Lax": {"Attack": 1.0, "Defense": 1.1, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 0.9},
    "Timid": {"Attack": 0.9, "Defense": 1.0, "Speed": 1.1, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Hasty": {"Attack": 1.0, "Defense": 0.9, "Speed": 1.1, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Serious": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Jolly": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.1, "Sp.Attack": 0.9, "Sp.Defense": 1.0},
    "Naive": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.1, "Sp.Attack": 1.0, "Sp.Defense": 0.9},
    "Modest": {"Attack": 0.9, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.1, "Sp.Defense": 1.0},
    "Mild": {"Attack": 1.0, "Defense": 0.9, "Speed": 1.0, "Sp.Attack": 1.1, "Sp.Defense": 1.0},
    "Quiet": {"Attack": 1.0, "Defense": 1.0, "Speed": 0.9, "Sp.Attack": 1.1, "Sp.Defense": 1.0},
    "Bashful": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0},
    "Rash": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.1, "Sp.Defense": 0.9},
    "Calm": {"Attack": 0.9, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.1},
    "Gentle": {"Attack": 1.0, "Defense": 0.9, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.1},
    "Sassy": {"Attack": 1.0, "Defense": 1.0, "Speed": 0.9, "Sp.Attack": 1.0, "Sp.Defense": 1.1},
    "Careful": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 0.9, "Sp.Defense": 1.1},
    "Quirky": {"Attack": 1.0, "Defense": 1.0, "Speed": 1.0, "Sp.Attack": 1.0, "Sp.Defense": 1.0}
})

const Characteristics = Object.freeze({
    "Loves to eat": {"Stat": "HP", "IVs": [0, 5, 10, 15, 20, 25, 30]},
    "Proud of its power": {"Stat": "Attack", "IVs": [0, 5, 10, 15, 20, 25, 30]},
    "Sturdy body": {"Stat": "Defense", "IVs": [0, 5, 10, 15, 20, 25, 30]},
    "Likes to run": {"Stat": "Speed", "IVs": [0, 5, 10, 15, 20, 25, 30]},
    "Highly curious": {"Stat": "Sp.Attack", "IVs": [0, 5, 10, 15, 20, 25, 30]},
    "Strong willed": {"Stat": "Sp.Defense", "IVs": [0, 5, 10, 15, 20, 25, 30]},
    "Takes plenty of siestas": {"Stat": "HP", "IVs": [1, 6, 11, 16, 21, 26, 31]},
    "Likes to thrash about": {"Stat": "Attack", "IVs": [1, 6, 11, 16, 21, 26, 31]},
    "Capable of taking hits": {"Stat": "Defense", "IVs": [1, 6, 11, 16, 21, 26, 31]},
    "Alert to sounds": {"Stat": "Speed", "IVs": [1, 6, 11, 16, 21, 26, 31]},
    "Mischievous": {"Stat": "Sp.Attack", "IVs": [1, 6, 11, 16, 21, 26, 31]},
    "Somewhat vain": {"Stat": "Sp.Defense", "IVs": [1, 6, 11, 16, 21, 26, 31]},
    "Nods off a lot": {"Stat": "HP", "IVs": [2, 7, 12, 17, 22, 27]},
    "A little quick tempered": {"Stat": "Attack", "IVs": [2, 7, 12, 17, 22, 27]},
    "Highly persistent": {"Stat": "Defense", "IVs": [2, 7, 12, 17, 22, 27]},
    "Impetuous and silly": {"Stat": "Speed", "IVs": [2, 7, 12, 17, 22, 27]},
    "Thoroughly cunning": {"Stat": "Sp.Attack", "IVs": [2, 7, 12, 17, 22, 27]},
    "Strongly defiant": {"Stat": "Sp.Defense", "IVs": [2, 7, 12, 17, 22, 27]},
    "Scatters things often": {"Stat": "HP", "IVs": [3, 8, 13, 18, 23, 28]},
    "Likes to fight": {"Stat": "Attack", "IVs": [3, 8, 13, 18, 23, 28]},
    "Good endurance": {"Stat": "Defense", "IVs": [3, 8, 13, 18, 23, 28]},
    "Somewhat of a clown": {"Stat": "Speed", "IVs": [3, 8, 13, 18, 23, 28]},
    "Often lost in thought": {"Stat": "Sp.Attack", "IVs": [3, 8, 13, 18, 23, 28]},
    "Hates to lose": {"Stat": "Sp.Defense", "IVs": [3, 8, 13, 18, 23, 28]},
    "Likes to relax": {"Stat": "HP", "IVs": [4, 9, 14, 19, 24, 29]},
    "Quick tempered": {"Stat": "Attack", "IVs": [4, 9, 14, 19, 24, 29]},
    "Good perseverance": {"Stat": "Defense", "IVs": [4, 9, 14, 19, 24, 29]},
    "Quick to flee": {"Stat": "Speed", "IVs": [4, 9, 14, 19, 24, 29]},
    "Very finicky": {"Stat": "Sp.Attack", "IVs": [4, 9, 14, 19, 24, 29]},
    "Somewhat stubborn": {"Stat": "Sp.Defense", "IVs": [4, 9, 14, 19, 24, 29]}
})

const hpStatCalcFormula = (baseStat: number, iv: number, ev: number, level: number) => (
    Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10
);

const otherStatCalcFormula = (baseStat: number, iv: number, ev: number, level: number, nature: number) => (
    Math.floor((Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5) * nature)
);

const guessHPIV = (baseStat: number, ev: number, level: number, stat: number, ivRange: number[]) => (
    ivRange.filter(iv => hpStatCalcFormula(baseStat, iv, ev, level) === stat)
)

const guessOtherIV = (
    baseStat: number,
    ev: number,
    level: number,
    nature: number,
    stat: number,
    ivRange: number[]) => (
    ivRange.filter(iv => otherStatCalcFormula(baseStat, iv, ev, level, nature) === stat)
)

export function calculateIVs(
    baseStats: BaseStats,
    levelUpStats: LevelUpStats[],
    levelUpEVs: LevelUpStats[],
    natureInput: string,
    characteristicInput: string,
    hiddenPower: string) {
    let hpIVRange = [...Array(32).keys()];
    let atkIVRange = [...Array(32).keys()];
    let defIVRange = [...Array(32).keys()];
    let spaIVRange = [...Array(32).keys()];
    let spdIVRange = [...Array(32).keys()];
    let speIVRange = [...Array(32).keys()];
    if (characteristicInput !== "" && characteristicInput in Characteristics) {
        const characteristic: Characteristic = Characteristics[characteristicInput]
        switch(characteristic["Stat"]) {
            case "HP": hpIVRange = characteristic["IVs"]; break;
            case "Attack": atkIVRange = characteristic["IVs"]; break;
            case "Defense": defIVRange = characteristic["IVs"]; break;
            case "Sp.Attack": spaIVRange = characteristic["IVs"]; break;
            case "Sp.Defense": spdIVRange = characteristic["IVs"]; break;
            case "Speed": speIVRange = characteristic["IVs"]; break;
        }
    }
    const natureModifier: NatureModifiers = Natures[natureInput];
    for (const [statLevel, evLevel] of levelUpStats.map((level, idx) => [level, levelUpEVs[idx]])) {
        hpIVRange = guessHPIV(baseStats["HP"],
                              evLevel["HP"],
                              statLevel["Level"],
                              statLevel["HP"],
                              hpIVRange);
        atkIVRange = guessOtherIV(baseStats["Attack"],
                              evLevel["Attack"],
                              statLevel["Level"],
                              natureModifier["Attack"],
                              statLevel["Attack"],
                              atkIVRange);
        defIVRange = guessOtherIV(baseStats["Defense"],
                              evLevel["Defense"],
                              statLevel["Level"],
                              natureModifier["Defense"],
                              statLevel["Defense"],
                              defIVRange);
        spaIVRange = guessOtherIV(baseStats["Sp.Attack"],
                              evLevel["Sp.Attack"],
                              statLevel["Level"],
                              natureModifier["Sp.Attack"],
                              statLevel["Sp.Attack"],
                              spaIVRange);
        spdIVRange = guessOtherIV(baseStats["Sp.Defense"],
                              evLevel["Sp.Defense"],
                              statLevel["Level"],
                              natureModifier["Sp.Defense"],
                              statLevel["Sp.Defense"],
                              spdIVRange);
        speIVRange = guessOtherIV(baseStats["Speed"],
                              evLevel["Speed"],
                              statLevel["Level"],
                              natureModifier["Speed"],
                              statLevel["Speed"],
                              speIVRange);
    }
    return [hpIVRange, atkIVRange, defIVRange, spaIVRange, spdIVRange, speIVRange]
}