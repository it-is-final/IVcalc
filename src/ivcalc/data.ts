//! SPDX-License-Identifier: GPL-3.0-only
/*
 *  This file is a part of IVcalc.
 *  Copyright 2025 Luong Truong
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published
 *  by the Free Software Foundation, version 3.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export const generations = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
] as const;

export type Generation = typeof generations[number];

export const stats = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
] as const;

export const statNames = {
  "hp": "HP",
  "attack": "Attack",
  "defense": "Defense",
  "specialAttack": "Sp.Attack",
  "specialDefense": "Sp.Defense",
  "speed": "Speed"
} as const;

export type Stat = typeof stats[number];

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface NextLevels {
  hp: number | null;
  attack: number | null;
  defense: number | null;
  specialAttack: number | null;
  specialDefense: number | null;
  speed: number | null;
}

export interface CalculatedIvs {
  hp: number[],
  attack: number[],
  defense: number[],
  specialAttack: number[],
  specialDefense: number[],
  speed: number[],
}

export interface StatLevel {
  level: number;
  stats: Stats;
  ev: Stats;
}

export interface MonEntry {
  number: number;
  name: string;
  form: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export const natures = [
  "Hardy",
  "Lonely",
  "Brave",
  "Adamant",
  "Naughty",
  "Bold",
  "Docile",
  "Relaxed",
  "Impish",
  "Lax",
  "Timid",
  "Hasty",
  "Serious",
  "Jolly",
  "Naive",
  "Modest",
  "Mild",
  "Quiet",
  "Bashful",
  "Rash",
  "Calm",
  "Gentle",
  "Sassy",
  "Careful",
  "Quirky",
] as const;

export type Nature = typeof natures[number];

export const hiddenPowers = [
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
] as const;

export type HiddenPower = typeof hiddenPowers[number];

export const characteristics = [
  "Loves to eat",
  "Proud of its power",
  "Sturdy body",
  "Likes to run",
  "Highly curious",
  "Strong willed",
  "Takes plenty of siestas",
  "Likes to thrash about",
  "Capable of taking hits",
  "Alert to sounds",
  "Mischievous",
  "Somewhat vain",
  "Nods off a lot",
  "A little quick tempered",
  "Highly persistent",
  "Impetuous and silly",
  "Thoroughly cunning",
  "Strongly defiant",
  "Scatters things often",
  "Likes to fight",
  "Good endurance",
  "Somewhat of a clown",
  "Often lost in thought",
  "Hates to lose",
  "Likes to relax",
  "Quick tempered",
  "Good perseverance",
  "Quick to flee",
  "Very finicky",
  "Somewhat stubborn",
] as const;

export type Characteristic = typeof characteristics[number];

export const natureModifiers = {
  Hardy: { attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
  Lonely: { attack: 1, defense: -1, speed: 0, specialAttack: 0, specialDefense: 0 },
  Brave: { attack: 1, defense: 0, speed: -1, specialAttack: 0, specialDefense: 0 },
  Adamant: { attack: 1, defense: 0, speed: 0, specialAttack: -1, specialDefense: 0 },
  Naughty: { attack: 1, defense: 0, speed: 0, specialAttack: 0, specialDefense: -1 },
  Bold: { attack: -1, defense: 1, speed: 0, specialAttack: 0, specialDefense: 0 },
  Docile: { attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
  Relaxed: { attack: 0, defense: 1, speed: -1, specialAttack: 0, specialDefense: 0 },
  Impish: { attack: 0, defense: 1, speed: 0, specialAttack: -1, specialDefense: 0 },
  Lax: { attack: 0, defense: 1, speed: 0, specialAttack: 0, specialDefense: -1 },
  Timid: { attack: -1, defense: 0, speed: 1, specialAttack: 0, specialDefense: 0 },
  Hasty: { attack: 0, defense: -1, speed: 1, specialAttack: 0, specialDefense: 0 },
  Serious: { attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
  Jolly: { attack: 0, defense: 0, speed: 1, specialAttack: -1, specialDefense: 0 },
  Naive: { attack: 0, defense: 0, speed: 1, specialAttack: 0, specialDefense: -1 },
  Modest: { attack: -1, defense: 0, speed: 0, specialAttack: 1, specialDefense: 0 },
  Mild: { attack: 0, defense: -1, speed: 0, specialAttack: 1, specialDefense: 0 },
  Quiet: { attack: 0, defense: 0, speed: -1, specialAttack: 1, specialDefense: 0 },
  Bashful: { attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
  Rash: { attack: 0, defense: 0, speed: 0, specialAttack: 1, specialDefense: -1 },
  Calm: { attack: -1, defense: 0, speed: 0, specialAttack: 0, specialDefense: 1 },
  Gentle: { attack: 0, defense: -1, speed: 0, specialAttack: 0, specialDefense: 1 },
  Sassy: { attack: 0, defense: 0, speed: -1, specialAttack: 0, specialDefense: 1 },
  Careful: { attack: 0, defense: 0, speed: 0, specialAttack: -1, specialDefense: 1 },
  Quirky: { attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
} as const;

export const characteristicsStats = {
  "Loves to eat": { stat: "hp", ivModulo: 0 },
  "Proud of its power": { stat: "attack", ivModulo: 0 },
  "Sturdy body": { stat: "defense", ivModulo: 0 },
  "Likes to run": { stat: "speed", ivModulo: 0 },
  "Highly curious": { stat: "specialAttack", ivModulo: 0 },
  "Strong willed": { stat: "specialDefense", ivModulo: 0 },
  "Takes plenty of siestas": { stat: "hp", ivModulo: 1 },
  "Likes to thrash about": { stat: "attack", ivModulo: 1 },
  "Capable of taking hits": { stat: "defense", ivModulo: 1 },
  "Alert to sounds": { stat: "speed", ivModulo: 1 },
  "Mischievous": { stat: "specialAttack", ivModulo: 1 },
  "Somewhat vain": { stat: "specialDefense", ivModulo: 1 },
  "Nods off a lot": { stat: "hp", ivModulo: 2 },
  "A little quick tempered": { stat: "attack", ivModulo: 2 },
  "Highly persistent": { stat: "defense", ivModulo: 2 },
  "Impetuous and silly": { stat: "speed", ivModulo: 2 },
  "Thoroughly cunning": { stat: "specialAttack", ivModulo: 2 },
  "Strongly defiant": { stat: "specialDefense", ivModulo: 2 },
  "Scatters things often": { stat: "hp", ivModulo: 3 },
  "Likes to fight": { stat: "attack", ivModulo: 3 },
  "Good endurance": { stat: "defense", ivModulo: 3 },
  "Somewhat of a clown": { stat: "speed", ivModulo: 3 },
  "Often lost in thought": { stat: "specialAttack", ivModulo: 3 },
  "Hates to lose": { stat: "specialDefense", ivModulo: 3 },
  "Likes to relax": { stat: "hp", ivModulo: 4 },
  "Quick tempered": { stat: "attack", ivModulo: 4 },
  "Good perseverance": { stat: "defense", ivModulo: 4 },
  "Quick to flee": { stat: "speed", ivModulo: 4 },
  "Very finicky": { stat: "specialAttack", ivModulo: 4 },
  "Somewhat stubborn": { stat: "specialDefense", ivModulo: 4 },
} as const;

export const hiddenPowerTypes = {
  Fighting: 0,
  Flying: 1,
  Poison: 2,
  Ground: 3,
  Rock: 4,
  Bug: 5,
  Ghost: 6,
  Steel: 7,
  Fire: 8,
  Water: 9,
  Grass: 10,
  Electric: 11,
  Psychic: 12,
  Ice: 13,
  Dragon: 14,
  Dark: 15,
} as const;
