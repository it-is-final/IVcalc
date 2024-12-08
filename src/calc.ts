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

const Natures = Object.freeze({
  Hardy: { Attack: -1, Defense: 0, Speed: 0, SpAttack: 0, SpDefense: 0 },
  Lonely: { Attack: 1, Defense: -1, Speed: 0, SpAttack: 0, SpDefense: 0 },
  Brave: { Attack: 1, Defense: 0, Speed: -1, SpAttack: 0, SpDefense: 0 },
  Adamant: { Attack: 1, Defense: 0, Speed: 0, SpAttack: -1, SpDefense: 0 },
  Naughty: { Attack: 1, Defense: 0, Speed: 0, SpAttack: 0, SpDefense: -1 },
  Bold: { Attack: -1, Defense: 1, Speed: 0, SpAttack: 0, SpDefense: 0 },
  Docile: { Attack: 0, Defense: -1, Speed: 0, SpAttack: 0, SpDefense: 0 },
  Relaxed: { Attack: 0, Defense: 1, Speed: -1, SpAttack: 0, SpDefense: 0 },
  Impish: { Attack: 0, Defense: 1, Speed: 0, SpAttack: -1, SpDefense: 0 },
  Lax: { Attack: 0, Defense: 1, Speed: 0, SpAttack: 0, SpDefense: -1 },
  Timid: { Attack: -1, Defense: 0, Speed: 1, SpAttack: 0, SpDefense: 0 },
  Hasty: { Attack: 0, Defense: -1, Speed: 1, SpAttack: 0, SpDefense: 0 },
  Serious: { Attack: 0, Defense: 0, Speed: -1, SpAttack: 0, SpDefense: 0 },
  Jolly: { Attack: 0, Defense: 0, Speed: 1, SpAttack: -1, SpDefense: 0 },
  Naive: { Attack: 0, Defense: 0, Speed: 1, SpAttack: 0, SpDefense: -1 },
  Modest: { Attack: -1, Defense: 0, Speed: 0, SpAttack: 1, SpDefense: 0 },
  Mild: { Attack: 0, Defense: -1, Speed: 0, SpAttack: 1, SpDefense: 0 },
  Quiet: { Attack: 0, Defense: 0, Speed: -1, SpAttack: 1, SpDefense: 0 },
  Bashful: { Attack: 0, Defense: 0, Speed: 0, SpAttack: -1, SpDefense: 0 },
  Rash: { Attack: 0, Defense: 0, Speed: 0, SpAttack: 1, SpDefense: -1 },
  Calm: { Attack: -1, Defense: 0, Speed: 0, SpAttack: 0, SpDefense: 1 },
  Gentle: { Attack: 0, Defense: -1, Speed: 0, SpAttack: 0, SpDefense: 1 },
  Sassy: { Attack: 0, Defense: 0, Speed: -1, SpAttack: 0, SpDefense: 1 },
  Careful: { Attack: 0, Defense: 0, Speed: 0, SpAttack: -1, SpDefense: 1 },
  Quirky: { Attack: 0, Defense: 0, Speed: 0, SpAttack: 0, SpDefense: -1 },
});

const Characteristics = Object.freeze({
  'Loves to eat': { Stat: 'HP', IVModulo: 0 },
  'Proud of its power': { Stat: 'Attack', IVModulo: 0 },
  'Sturdy body': { Stat: 'Defense', IVModulo: 0 },
  'Likes to run': { Stat: 'Speed', IVModulo: 0 },
  'Highly curious': { Stat: 'SpAttack', IVModulo: 0 },
  'Strong willed': { Stat: 'SpDefense', IVModulo: 0 },
  'Takes plenty of siestas': { Stat: 'HP', IVModulo: 1 },
  'Likes to thrash about': { Stat: 'Attack', IVModulo: 1 },
  'Capable of taking hits': { Stat: 'Defense', IVModulo: 1 },
  'Alert to sounds': { Stat: 'Speed', IVModulo: 1 },
  'Mischievous': { Stat: 'SpAttack', IVModulo: 1 },
  'Somewhat vain': { Stat: 'SpDefense', IVModulo: 1 },
  'Nods off a lot': { Stat: 'HP', IVModulo: 2 },
  'A little quick tempered': { Stat: 'Attack', IVModulo: 2 },
  'Highly persistent': { Stat: 'Defense', IVModulo: 2 },
  'Impetuous and silly': { Stat: 'Speed', IVModulo: 2 },
  'Thoroughly cunning': { Stat: 'SpAttack', IVModulo: 2 },
  'Strongly defiant': { Stat: 'SpDefense', IVModulo: 2 },
  'Scatters things often': { Stat: 'HP', IVModulo: 3 },
  'Likes to fight': { Stat: 'Attack', IVModulo: 3 },
  'Good endurance': { Stat: 'Defense', IVModulo: 3 },
  'Somewhat of a clown': { Stat: 'Speed', IVModulo: 3 },
  'Often lost in thought': { Stat: 'SpAttack', IVModulo: 3 },
  'Hates to lose': { Stat: 'SpDefense', IVModulo: 3 },
  'Likes to relax': { Stat: 'HP', IVModulo: 4 },
  'Quick tempered': { Stat: 'Attack', IVModulo: 4 },
  'Good perseverance': { Stat: 'Defense', IVModulo: 4 },
  'Quick to flee': { Stat: 'Speed', IVModulo: 4 },
  'Very finicky': { Stat: 'SpAttack', IVModulo: 4 },
  'Somewhat stubborn': { Stat: 'SpDefense', IVModulo: 4 },
});

function calcHPStat(baseStat: number, iv: number, ev: number, level: number) {
  return (
    Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) +
    level +
    10
  );
}

function calcOtherStat(
  baseStat: number,
  iv: number,
  ev: number,
  level: number,
  nature: number,
) {
  const rawStat =
    Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  switch (nature) {
    case 1:
      return Math.floor((rawStat * 110) / 100);
    case -1:
      return Math.floor((rawStat * 90) / 100);
    default:
      return rawStat;
  }
}

function solveHPIV(baseStat: number, ev: number, level: number, stat: number) {
  return Math.ceil(
    (stat - level - 10) / (level / 100) - 2 * baseStat - Math.floor(ev / 4),
  );
}

function solveOtherStatIV(
  baseStat: number,
  ev: number,
  level: number,
  nature: number,
  stat: number,
) {
  let natureDiv: number;
  switch (nature) {
    case 1:
      natureDiv = 1.1;
      break;
    case -1:
      natureDiv = 0.9;
      break;
    default:
      natureDiv = 1;
  }
  return Math.ceil(
    (Math.ceil(stat / natureDiv) - 5) / (level / 100) -
      2 * baseStat -
      Math.floor(ev / 4),
  );
}

function clampIV(iv: number) {
  return Math.min(Math.max(iv, 0), 31);
}

function validateStat(lower: number, upper: number, stat: number) {
  if (lower <= stat && stat <= upper) {
    return true;
  } else {
    return false;
  }
}

function validateHPStat(
  baseStat: number,
  ev: number,
  level: number,
  stat: number,
  ivRange: number[],
) {
  const lower = calcHPStat(baseStat, ivRange[0], ev, level);
  const upper = calcHPStat(baseStat, ivRange[ivRange.length - 1], ev, level);
  return validateStat(lower, upper, stat);
}

function validateOtherStat(
  baseStat: number,
  ev: number,
  level: number,
  nature: number,
  stat: number,
  ivRange: number[],
) {
  const lower = calcOtherStat(baseStat, ivRange[0], ev, level, nature);
  const upper = calcOtherStat(
    baseStat,
    ivRange[ivRange.length - 1],
    ev,
    level,
    nature,
  );
  return validateStat(lower, upper, stat);
}

function calcHPRange(
  baseStat: number,
  ev: number,
  level: number,
  stat: number,
  ivRange: number[],
): [number, number] {
  if (validateHPStat(baseStat, ev, level, stat, ivRange)) {
    return [
      clampIV(solveHPIV(baseStat, ev, level, stat)),
      clampIV(solveHPIV(baseStat, ev, level, stat + 1) - 1),
    ];
  } else {
    return [null, null];
  }
}

function calcOtherStatRange(
  baseStat: number,
  ev: number,
  level: number,
  nature: number,
  stat: number,
  ivRange: number[],
): [number, number] {
  if (validateOtherStat(baseStat, ev, level, nature, stat, ivRange)) {
    return [
      clampIV(solveOtherStatIV(baseStat, ev, level, nature, stat)),
      clampIV(solveOtherStatIV(baseStat, ev, level, nature, stat + 1) - 1),
    ];
  } else {
    return [null, null];
  }
}

function narrowByHiddenPower(targetHPType: string) {
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
  const lsbRanges = {
    HP: new Set() as Set<number>,
    Attack: new Set() as Set<number>,
    Defense: new Set() as Set<number>,
    SpAttack: new Set() as Set<number>,
    SpDefense: new Set() as Set<number>,
    Speed: new Set() as Set<number>,
  };
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
              lsbRanges.HP.add(hpLSB);
              lsbRanges.Attack.add(atkLSB);
              lsbRanges.Defense.add(defLSB);
              lsbRanges.SpAttack.add(spaLSB);
              lsbRanges.SpDefense.add(spdLSB);
              lsbRanges.Speed.add(speLSB);
            }
          }
        }
      }
    }
  }
  return lsbRanges;
}

export function getNextLevel(
  stat: Stat,
  baseStat: number,
  ivRange: number[],
  ev: number,
  lastStatLevel: number,
  natureName: string,
) {
  // Protect against infinite loops in zero-length arrays
  if (!(ivRange.length > 0)) {
    return null;
  }
  // Assuming EVs won't change is a lot easier to program,
  // and leads to less unexpected results
  let level = lastStatLevel;
  const statCalc = stat === 'HP' ? calcHPStat : calcOtherStat;
  // calcHPStat does not take this parameter, so no errors would
  // be caused if this is undefined
  const nature: number = (Natures[natureName] ?? {})[stat];
  while (
    ivRange
      .map(iv => statCalc(baseStat, iv, ev, level, nature))
      .every((result, _, arr) => result === arr[0]) &&
    ivRange.length > 1
  ) {
    level += 1;
  }
  return level;
}

export function calcIVRanges(
  baseStats: BaseStats,
  statLevels: StatLevel[],
  natureName: string,
  characteristicInput: string,
  hiddenPower: string,
) {
  const ivRanges = {
    HP: [...Array(32).keys()],
    Attack: [...Array(32).keys()],
    Defense: [...Array(32).keys()],
    SpAttack: [...Array(32).keys()],
    SpDefense: [...Array(32).keys()],
    Speed: [...Array(32).keys()],
  };
  for (const stats of statLevels) {
    const calcResults = {
      HP: calcHPRange(
        baseStats.HP,
        stats.HPEV,
        stats.Level,
        stats.HP,
        ivRanges.HP,
      ),
      Attack: calcOtherStatRange(
        baseStats.Attack,
        stats.AttackEV,
        stats.Level,
        Natures[natureName].Attack,
        stats.Attack,
        ivRanges.Attack,
      ),
      Defense: calcOtherStatRange(
        baseStats.Defense,
        stats.DefenseEV,
        stats.Level,
        Natures[natureName].Defense,
        stats.Defense,
        ivRanges.Defense,
      ),
      SpAttack: calcOtherStatRange(
        baseStats.SpAttack,
        stats.SpAttackEV,
        stats.Level,
        Natures[natureName].SpAttack,
        stats.SpAttack,
        ivRanges.SpAttack,
      ),
      SpDefense: calcOtherStatRange(
        baseStats.SpDefense,
        stats.SpDefenseEV,
        stats.Level,
        Natures[natureName].SpDefense,
        stats.SpDefense,
        ivRanges.SpDefense,
      ),
      Speed: calcOtherStatRange(
        baseStats.Speed,
        stats.SpeedEV,
        stats.Level,
        Natures[natureName].Speed,
        stats.Speed,
        ivRanges.Speed,
      ),
    };
    for (const [stat, ivRange] of Object.entries(ivRanges)) {
      const [minIV, maxIV] = calcResults[stat] as [number, number];
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (
          minIV === null ||
          maxIV === null ||
          !(minIV <= ivRange[i] && ivRange[i] <= maxIV)
        ) {
          ivRange.splice(i, 1);
        }
      }
    }
  }
  if (hiddenPower !== null) {
    const calcResults = narrowByHiddenPower(hiddenPower);
    for (const [stat, ivRange] of Object.entries(ivRanges)) {
      const lsbRange = calcResults[stat] as Set<number>;
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (!lsbRange.has(ivRange[i] & 1)) {
          ivRange.splice(i, 1);
        }
      }
    }
  }
  if (characteristicInput !== null && characteristicInput in Characteristics) {
    const highestStat: Stat = Characteristics[characteristicInput].Stat;
    const ivModulo: number = Characteristics[characteristicInput].IVModulo;
    let highestIV = [
      ...ivRanges.HP,
      ...ivRanges.Attack,
      ...ivRanges.Defense,
      ...ivRanges.SpAttack,
      ...ivRanges.SpDefense,
      ...ivRanges.Speed,
    ].reduce((x, y) => Math.max(x, y));
    if (highestIV % 5 > ivModulo) {
      highestIV = highestIV - ((highestIV % 5) - ivModulo);
    }
    if (highestIV % 5 < ivModulo) {
      highestIV = highestIV - (highestIV % 5) - (5 - ivModulo);
    }
    const calcRange: number[] = [];
    for (let i = 0; i <= (highestIV - (highestIV % 5)) / 5; i++) {
      const iv = i * 5 + ivModulo;
      if (iv <= highestIV) {
        calcRange.push(iv);
      }
    }
    for (const stat of Object.keys(ivRanges)) {
      const ivRange: number[] = ivRanges[stat];
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (ivRange[i] > highestIV) {
          ivRange.splice(i, 1);
        }
      }
    }
    for (let i = ivRanges[highestStat].length - 1; i >= 0; i--) {
      if (!calcRange.includes(ivRanges[highestStat][i])) {
        ivRanges[highestStat].splice(i, 1);
      }
    }
  }
  return ivRanges;
}
