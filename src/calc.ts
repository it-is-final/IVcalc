//! SPDX-License-Identifier: AGPL-3.0-only
/*
 *  This file is a part of IVcalc.
 *  Copyright 2024 Luong Truong
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, version 3.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict';

export type Stat =
  | 'HP'
  | 'Attack'
  | 'Defense'
  | 'SpAttack'
  | 'SpDefense'
  | 'Speed';

interface BaseStats {
  HP: number;
  Attack: number;
  Defense: number;
  SpAttack: number;
  SpDefense: number;
  Speed: number;
}

export interface StatLevel {
  Level: number;
  HP: number;
  Attack: number;
  Defense: number;
  SpAttack: number;
  SpDefense: number;
  Speed: number;
  HPEV: number;
  AttackEV: number;
  DefenseEV: number;
  SpAttackEV: number;
  SpDefenseEV: number;
  SpeedEV: number;
}

interface Characteristic {
  Stat: Stat;
  IVs: number[];
}

interface NatureModifiers {
  Attack: 0.9 | 1.0 | 1.1;
  Defense: 0.9 | 1.0 | 1.1;
  Speed: 0.9 | 1.0 | 1.1;
  SpAttack: 0.9 | 1.0 | 1.1;
  SpDefense: 0.9 | 1.0 | 1.1;
}

const Natures = Object.freeze({
  Hardy: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Lonely: {
    Attack: 1.1,
    Defense: 0.9,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Brave: {
    Attack: 1.1,
    Defense: 1.0,
    Speed: 0.9,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Adamant: {
    Attack: 1.1,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 0.9,
    SpDefense: 1.0,
  },
  Naughty: {
    Attack: 1.1,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 0.9,
  },
  Bold: {
    Attack: 0.9,
    Defense: 1.1,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Docile: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Relaxed: {
    Attack: 1.0,
    Defense: 1.1,
    Speed: 0.9,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Impish: {
    Attack: 1.0,
    Defense: 1.1,
    Speed: 1.0,
    SpAttack: 0.9,
    SpDefense: 1.0,
  },
  Lax: {
    Attack: 1.0,
    Defense: 1.1,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 0.9,
  },
  Timid: {
    Attack: 0.9,
    Defense: 1.0,
    Speed: 1.1,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Hasty: {
    Attack: 1.0,
    Defense: 0.9,
    Speed: 1.1,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Serious: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Jolly: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.1,
    SpAttack: 0.9,
    SpDefense: 1.0,
  },
  Naive: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.1,
    SpAttack: 1.0,
    SpDefense: 0.9,
  },
  Modest: {
    Attack: 0.9,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.1,
    SpDefense: 1.0,
  },
  Mild: {
    Attack: 1.0,
    Defense: 0.9,
    Speed: 1.0,
    SpAttack: 1.1,
    SpDefense: 1.0,
  },
  Quiet: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 0.9,
    SpAttack: 1.1,
    SpDefense: 1.0,
  },
  Bashful: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
  Rash: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.1,
    SpDefense: 0.9,
  },
  Calm: {
    Attack: 0.9,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.1,
  },
  Gentle: {
    Attack: 1.0,
    Defense: 0.9,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.1,
  },
  Sassy: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 0.9,
    SpAttack: 1.0,
    SpDefense: 1.1,
  },
  Careful: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 0.9,
    SpDefense: 1.1,
  },
  Quirky: {
    Attack: 1.0,
    Defense: 1.0,
    Speed: 1.0,
    SpAttack: 1.0,
    SpDefense: 1.0,
  },
});

const Characteristics = Object.freeze({
  'Loves to eat': { Stat: 'HP', IVs: [0, 5, 10, 15, 20, 25, 30] },
  'Proud of its power': { Stat: 'Attack', IVs: [0, 5, 10, 15, 20, 25, 30] },
  'Sturdy body': { Stat: 'Defense', IVs: [0, 5, 10, 15, 20, 25, 30] },
  'Likes to run': { Stat: 'Speed', IVs: [0, 5, 10, 15, 20, 25, 30] },
  'Highly curious': { Stat: 'SpAttack', IVs: [0, 5, 10, 15, 20, 25, 30] },
  'Strong willed': { Stat: 'SpDefense', IVs: [0, 5, 10, 15, 20, 25, 30] },
  'Takes plenty of siestas': { Stat: 'HP', IVs: [1, 6, 11, 16, 21, 26, 31] },
  'Likes to thrash about': { Stat: 'Attack', IVs: [1, 6, 11, 16, 21, 26, 31] },
  'Capable of taking hits': {
    Stat: 'Defense',
    IVs: [1, 6, 11, 16, 21, 26, 31],
  },
  'Alert to sounds': { Stat: 'Speed', IVs: [1, 6, 11, 16, 21, 26, 31] },
  'Mischievous': { Stat: 'SpAttack', IVs: [1, 6, 11, 16, 21, 26, 31] },
  'Somewhat vain': { Stat: 'SpDefense', IVs: [1, 6, 11, 16, 21, 26, 31] },
  'Nods off a lot': { Stat: 'HP', IVs: [2, 7, 12, 17, 22, 27] },
  'A little quick tempered': { Stat: 'Attack', IVs: [2, 7, 12, 17, 22, 27] },
  'Highly persistent': { Stat: 'Defense', IVs: [2, 7, 12, 17, 22, 27] },
  'Impetuous and silly': { Stat: 'Speed', IVs: [2, 7, 12, 17, 22, 27] },
  'Thoroughly cunning': { Stat: 'SpAttack', IVs: [2, 7, 12, 17, 22, 27] },
  'Strongly defiant': { Stat: 'SpDefense', IVs: [2, 7, 12, 17, 22, 27] },
  'Scatters things often': { Stat: 'HP', IVs: [3, 8, 13, 18, 23, 28] },
  'Likes to fight': { Stat: 'Attack', IVs: [3, 8, 13, 18, 23, 28] },
  'Good endurance': { Stat: 'Defense', IVs: [3, 8, 13, 18, 23, 28] },
  'Somewhat of a clown': { Stat: 'Speed', IVs: [3, 8, 13, 18, 23, 28] },
  'Often lost in thought': { Stat: 'SpAttack', IVs: [3, 8, 13, 18, 23, 28] },
  'Hates to lose': { Stat: 'SpDefense', IVs: [3, 8, 13, 18, 23, 28] },
  'Likes to relax': { Stat: 'HP', IVs: [4, 9, 14, 19, 24, 29] },
  'Quick tempered': { Stat: 'Attack', IVs: [4, 9, 14, 19, 24, 29] },
  'Good perseverance': { Stat: 'Defense', IVs: [4, 9, 14, 19, 24, 29] },
  'Quick to flee': { Stat: 'Speed', IVs: [4, 9, 14, 19, 24, 29] },
  'Very finicky': { Stat: 'SpAttack', IVs: [4, 9, 14, 19, 24, 29] },
  'Somewhat stubborn': { Stat: 'SpDefense', IVs: [4, 9, 14, 19, 24, 29] },
});

function hpFormula(baseStat: number, iv: number, ev: number, level: number) {
  return (
    Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) +
    level +
    10
  );
}

function otherStatFormula(
  baseStat: number,
  iv: number,
  ev: number,
  level: number,
  nature: number,
) {
  return Math.floor(
    (Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5) *
      nature,
  );
}

function solveHPIV(baseStat: number, ev: number, level: number, stat: number) {
  return Math.ceil(
    (stat - 10 - level) / (level / 100) - Math.floor(ev / 4) - 2 * baseStat,
  );
}

function solveOtherIV(
  baseStat: number,
  ev: number,
  level: number,
  rawStat: number,
) {
  return Math.ceil(
    (rawStat - 5) / (level / 100) - Math.floor(ev / 4) - 2 * baseStat,
  );
}

function clampIV(iv: number) {
  return Math.min(Math.max(iv, 0), 31);
}

function createIVRange(lowerBound: number, upperBound: number) {
  const lower = clampIV(lowerBound);
  const upper = clampIV(upperBound);
  const ivRange: number[] = [];
  for (let iv = lower; iv <= upper; iv++) {
    ivRange.push(iv);
  }
  return ivRange;
}

function isStatValid(
  isHPStat: boolean,
  baseStat: number,
  ev: number,
  level: number,
  nature: number,
  stat: number,
) {
  let lowerBound: number;
  let upperBound: number;
  if (isHPStat) {
    lowerBound = hpFormula(baseStat, 0, ev, level);
    upperBound = hpFormula(baseStat, 31, ev, level);
  } else {
    lowerBound = otherStatFormula(baseStat, 0, ev, level, nature);
    upperBound = otherStatFormula(baseStat, 31, ev, level, nature);
  }
  if (!(stat >= lowerBound && stat <= upperBound)) {
    return false;
  }
  return true;
}

function calcHPIVRange(
  baseStat: number,
  ev: number,
  level: number,
  stat: number,
) {
  if (!isStatValid(true, baseStat, ev, level, null, stat)) {
    return [];
  }
  return createIVRange(
    solveHPIV(baseStat, ev, level, stat),
    solveHPIV(baseStat, ev, level, stat + 1) - 1,
  );
}

function calcOtherStatIVRange(
  baseStat: number,
  ev: number,
  level: number,
  nature: number,
  stat: number,
) {
  if (!isStatValid(false, baseStat, ev, level, nature, stat)) {
    return [];
  }
  const rawStatLower = Math.ceil(stat / nature);
  const rawStatUpper = Math.ceil((stat + 1) / nature);
  return createIVRange(
    solveOtherIV(baseStat, ev, level, rawStatLower),
    solveOtherIV(baseStat, ev, level, rawStatUpper) - 1,
  );
}

function getIVRanges(
  baseStats: BaseStats,
  nature: NatureModifiers,
  statLevel: StatLevel,
) {
  const hp = calcHPIVRange(
    baseStats.HP,
    statLevel.HPEV,
    statLevel.Level,
    statLevel.HP,
  );
  const attack = calcOtherStatIVRange(
    baseStats.Attack,
    statLevel.AttackEV,
    statLevel.Level,
    nature.Attack,
    statLevel.Attack,
  );
  const defense = calcOtherStatIVRange(
    baseStats.Defense,
    statLevel.DefenseEV,
    statLevel.Level,
    nature.Defense,
    statLevel.Defense,
  );
  const spAttack = calcOtherStatIVRange(
    baseStats.SpAttack,
    statLevel.SpAttackEV,
    statLevel.Level,
    nature.SpAttack,
    statLevel.SpAttack,
  );
  const spDefense = calcOtherStatIVRange(
    baseStats.SpDefense,
    statLevel.SpDefenseEV,
    statLevel.Level,
    nature.SpDefense,
    statLevel.SpDefense,
  );
  const speed = calcOtherStatIVRange(
    baseStats.Speed,
    statLevel.SpeedEV,
    statLevel.Level,
    nature.Speed,
    statLevel.Speed,
  );
  return [hp, attack, defense, spAttack, spDefense, speed];
}

function narrowByHiddenPower(
  hpIVRange: number[],
  atkIVRange: number[],
  defIVRange: number[],
  speIVRange: number[],
  spaIVRange: number[],
  spdIVRange: number[],
  targetHPType: string,
) {
  const TYPES = {
    0: 'Fighting',
    1: 'Flying',
    2: 'Poison',
    3: 'Ground',
    4: 'Rock',
    5: 'Bug',
    6: 'Ghost',
    7: 'Steel',
    8: 'Fire',
    9: 'Water',
    10: 'Grass',
    11: 'Electric',
    12: 'Psychic',
    13: 'Ice',
    14: 'Dragon',
    15: 'Dark',
  };
  const hpRange: Set<number> = new Set();
  const atkRange: Set<number> = new Set();
  const defRange: Set<number> = new Set();
  const speRange: Set<number> = new Set();
  const spaRange: Set<number> = new Set();
  const spdRange: Set<number> = new Set();
  /*
   *  Below loops through all possible combinations of LSBs of the
   *  six stats. This creates a lookup table on the fly for
   *  a specific hidden power.
   */
  for (const hpLSB of [0, 1]) {
    for (const atkLSB of [0, 1]) {
      for (const defLSB of [0, 1]) {
        for (const speLSB of [0, 1]) {
          for (const spaLSB of [0, 1]) {
            for (const spdLSB of [0, 1]) {
              const hpType = Math.floor(
                ((hpLSB +
                  2 * atkLSB +
                  4 * defLSB +
                  8 * speLSB +
                  16 * spaLSB +
                  32 * spdLSB) *
                  15) /
                  63,
              );
              if (!(TYPES[hpType] === targetHPType)) continue;
              hpRange.add(hpLSB);
              atkRange.add(atkLSB);
              defRange.add(defLSB);
              speRange.add(speLSB);
              spaRange.add(spaLSB);
              spdRange.add(spdLSB);
            }
          }
        }
      }
    }
  }
  return [
    hpIVRange.filter(iv => hpRange.has(iv & 1)),
    atkIVRange.filter(iv => atkRange.has(iv & 1)),
    defIVRange.filter(iv => defRange.has(iv & 1)),
    speIVRange.filter(iv => speRange.has(iv & 1)),
    spaIVRange.filter(iv => spaRange.has(iv & 1)),
    spdIVRange.filter(iv => spdRange.has(iv & 1)),
  ];
}

function getNextLevel(
  stat: Stat,
  baseStat: number,
  ivRange: number[],
  ev: number,
  lastStatLevel: number,
  nature: number,
) {
  // Protect against infinite loops in zero-length arrays
  if (!(ivRange.length > 0)) {
    return null;
  } else if (!(ivRange.length > 1)) {
    return lastStatLevel;
  }
  // Assuming EVs won't change is a lot easier to program,
  // and leads to less unexpected results
  let level = lastStatLevel;
  const calcFormula = stat === 'HP' ? hpFormula : otherStatFormula;
  do {
    level += 1;
  } while (
    ivRange
      .map(iv => calcFormula(baseStat, iv, ev, level, nature))
      .every((result, _, arr) => result === arr[0])
  );
  return level;
}

export function calculateIVs(
  baseStats: BaseStats,
  statLevels: StatLevel[],
  natureInput: string,
  characteristicInput: string,
  hiddenPower: string,
): [
  number[],
  number[],
  number[],
  number[],
  number[],
  number[],
  number,
  number,
  number,
  number,
  number,
  number,
] {
  const [
    hpIVRange,
    atkIVRange,
    defIVRange,
    spaIVRange,
    spdIVRange,
    speIVRange,
  ] = getIVRanges(baseStats, Natures[natureInput], statLevels[0]);
  const checkIVMembership = (arr: number[], l: number[]) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!l.includes(arr[i])) {
        arr.splice(i, 1);
      }
    }
  };
  if (statLevels.length > 1) {
    for (const statLevel of statLevels.slice(1)) {
      for (const [ivRange, newIVRange] of getIVRanges(
        baseStats,
        Natures[natureInput],
        statLevel,
      ).map((_ivRange, i) => [
        [hpIVRange, atkIVRange, defIVRange, spaIVRange, spdIVRange, speIVRange][
          i
        ],
        _ivRange,
      ])) {
        for (let i = ivRange.length - 1; i >= 0; i--) {
          if (!newIVRange.includes(ivRange[i])) {
            ivRange.splice(i, 1);
          }
        }
      }
    }
  }
  if (hiddenPower !== null) {
    for (const [ivRange, newIVRange] of narrowByHiddenPower(
      hpIVRange,
      atkIVRange,
      defIVRange,
      speIVRange,
      spaIVRange,
      spdIVRange,
      hiddenPower,
    ).map((_ivRange, i) => [
      [hpIVRange, atkIVRange, defIVRange, speIVRange, spaIVRange, spdIVRange][
        i
      ],
      _ivRange,
    ])) {
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (!newIVRange.includes(ivRange[i])) {
          ivRange.splice(i, 1);
        }
      }
    }
  }
  if (characteristicInput !== null && characteristicInput in Characteristics) {
    let highestIV = [
      ...hpIVRange,
      ...atkIVRange,
      ...defIVRange,
      ...spaIVRange,
      ...spdIVRange,
      ...speIVRange,
    ].reduce((prev, value) => Math.max(prev, value));
    const characteristic: Characteristic = Characteristics[characteristicInput];
    const charIVRange = characteristic.IVs.filter(value => value <= highestIV);
    highestIV = charIVRange[charIVRange.length - 1];
    for (const ivRange of [
      hpIVRange,
      atkIVRange,
      defIVRange,
      spaIVRange,
      spdIVRange,
      speIVRange,
    ]) {
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (ivRange[i] > highestIV) {
          ivRange.splice(i, 1);
        }
      }
    }
    switch (characteristic.Stat) {
      case 'HP':
        checkIVMembership(hpIVRange, charIVRange);
        break;
      case 'Attack':
        checkIVMembership(atkIVRange, charIVRange);
        break;
      case 'Defense':
        checkIVMembership(defIVRange, charIVRange);
        break;
      case 'SpAttack':
        checkIVMembership(spaIVRange, charIVRange);
        break;
      case 'SpDefense':
        checkIVMembership(spdIVRange, charIVRange);
        break;
      case 'Speed':
        checkIVMembership(speIVRange, charIVRange);
        break;
    }
  }
  const nextHPLevel = getNextLevel(
    'HP',
    baseStats.HP,
    hpIVRange,
    statLevels[statLevels.length - 1].HPEV,
    statLevels[statLevels.length - 1].Level,
    null,
  );
  const nextAtkLevel = getNextLevel(
    'Attack',
    baseStats.Attack,
    atkIVRange,
    statLevels[statLevels.length - 1].AttackEV,
    statLevels[statLevels.length - 1].Level,
    Natures[natureInput].Attack,
  );
  const nextDefLevel = getNextLevel(
    'Defense',
    baseStats.Defense,
    defIVRange,
    statLevels[statLevels.length - 1].DefenseEV,
    statLevels[statLevels.length - 1].Level,
    Natures[natureInput].Defense,
  );
  const nextSpALevel = getNextLevel(
    'SpAttack',
    baseStats.SpAttack,
    spaIVRange,
    statLevels[statLevels.length - 1].SpAttackEV,
    statLevels[statLevels.length - 1].Level,
    Natures[natureInput].SpAttack,
  );
  const nextSpDLevel = getNextLevel(
    'SpDefense',
    baseStats.SpDefense,
    spdIVRange,
    statLevels[statLevels.length - 1].SpDefenseEV,
    statLevels[statLevels.length - 1].Level,
    Natures[natureInput].SpDefense,
  );
  const nextSpeLevel = getNextLevel(
    'Speed',
    baseStats.Speed,
    speIVRange,
    statLevels[statLevels.length - 1].SpeedEV,
    statLevels[statLevels.length - 1].Level,
    Natures[natureInput].Speed,
  );
  return [
    hpIVRange,
    atkIVRange,
    defIVRange,
    spaIVRange,
    spdIVRange,
    speIVRange,
    nextHPLevel,
    nextAtkLevel,
    nextDefLevel,
    nextSpALevel,
    nextSpDLevel,
    nextSpeLevel,
  ];
}
