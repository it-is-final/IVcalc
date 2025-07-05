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

import type { HiddenPower, Nature, Stat, Stats, StatLevel, Characteristic, CalculatedIvs } from "./data";
import { hiddenPowerTypes, natureModifiers, stats, characteristicsStats } from "./data";

function calcHpStat(
  baseStat: number,
  iv: number,
  ev: number,
  level: number,
  isShedinja: boolean,
) {
  return (
    (!isShedinja)
      ? (Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10)
      : 1
  );
}

function calcOtherStat(
  baseStat: number,
  iv: number,
  ev: number,
  level: number,
  natureModifier: 0 | -1 | 1,
) {
  const rawStat = Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  switch (natureModifier) {
    case 0: {
      return rawStat;
    }
    case 1: {
      return Math.floor((rawStat * 110) / 100);
    }
    case -1: {
      return Math.floor((rawStat * 90) / 100);
    }
  }
}

function calcMinimumHpIv(baseStat: number, ev: number, level: number, stat: number) {
  return Math.ceil(
    (stat - level - 10) / (level / 100) - 2 * baseStat - Math.floor(ev / 4),
  );
}

function calcMinimumOtherStatIv(
  baseStat: number,
  ev: number,
  level: number,
  stat: number,
  nature: number,
) {
  let rawStat: number;
  switch (nature) {
    case 1:
      rawStat = Math.ceil(stat / 1.1);
      break;
    case -1:
      rawStat = Math.ceil(stat / 0.9);
      break;
    default:
      rawStat = stat;
  }
  return Math.ceil(
    (rawStat - 5) / (level / 100) - 2 * baseStat - Math.floor(ev / 4),
  );
}

function narrowByHiddenPower(hiddenPower: HiddenPower) {
  const lsbRanges = {
    hp: new Set<number>(),
    attack: new Set<number>(),
    defense: new Set<number>(),
    specialAttack: new Set<number>(),
    specialDefense: new Set<number>(),
    speed: new Set<number>(),
  }
  // In here, ivLSBs is the binary number formed from
  // hpLSB + 2 * atkLSB + 4 * defLSB + 8 * speLSB + 16 * spaLSB + 32 * spdLSB
  // in the hidden power formula
  // (15 / 63) is the remaining part of the equation after removing ivLSBs
  // Based off https://math.stackexchange.com/a/1683536
  const minIvLsbs = Math.max(
    Math.ceil(hiddenPowerTypes[hiddenPower] / (15 / 63)),
    0,
  );
  const maxIvLsbs = Math.min(
    Math.ceil(hiddenPowerTypes[hiddenPower] / (15 / 63)),
    63,
  );
  for (let ivLsbs = minIvLsbs; ivLsbs <= maxIvLsbs; ivLsbs++) {
    lsbRanges.hp.add((ivLsbs >> 0) & 1);
    lsbRanges.attack.add((ivLsbs >> 1) & 1);
    lsbRanges.defense.add((ivLsbs >> 2) & 1);
    lsbRanges.speed.add((ivLsbs >> 3) & 1);
    lsbRanges.specialAttack.add((ivLsbs >> 4) & 1);
    lsbRanges.specialDefense.add((ivLsbs >> 5) & 1);
  }
  return lsbRanges;
}

export function getNextIvLevel(
  stat: Stat,
  baseStat: number,
  ivRange: number[],
  ev: number,
  lastStatLevel: number,
  nature: Nature,
  isShedinja: boolean,
) {
  // Protect against infinite loops in zero-length arrays
  if (ivRange.length <= 0) {
    return null;
  }
  // Assuming EVs won't change is a lot easier to program,
  // and leads to less unexpected results
  let level = lastStatLevel;
  if (isShedinja && stat === "hp") {
    return level;
  }
  if (ivRange.length <= 1) {
    return level;
  }
  const natureModifier = stat !== "hp" ? natureModifiers[nature][stat] : 0;
  while (
    ivRange
      .map(iv => (
        stat === "hp"
          ? calcHpStat(baseStat, iv, ev, level, isShedinja)
          : calcOtherStat(baseStat, iv, ev, level, natureModifier)
      ))
      .every((result, _, arr) => result === arr[0])
  ) {
    level += 1;
  }
  return level;
}

export function calcIvRanges(
  baseStats: Stats,
  statLevels: StatLevel[],
  nature: Nature,
  characteristic: Characteristic | "",
  hiddenPower: HiddenPower | "",
  isShedinja: boolean
): CalculatedIvs {
  const ivRanges = {
    hp: Array<number>(),
    attack: Array<number>(),
    defense: Array<number>(),
    specialAttack: Array<number>(),
    specialDefense: Array<number>(),
    speed: Array<number>(),
  };
  const minIvs = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }
  const maxIvs = {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  }
  for (const statLevel of statLevels) {
    for (const stat of stats) {
      if (isNaN(minIvs[stat]) || isNaN(maxIvs[stat])) {
        continue;
      }
      if (stat === "hp" && isShedinja) {
        continue;
      }
      let lowerBound: number;
      let upperBound: number;
      if (stat === "hp") {
        lowerBound = calcHpStat(
          baseStats[stat],
          minIvs[stat],
          statLevel.ev[stat],
          statLevel.level,
          isShedinja
        )
        upperBound = calcHpStat(
          baseStats[stat],
          maxIvs[stat],
          statLevel.ev[stat],
          statLevel.level,
          isShedinja
        )
      } else {
        lowerBound = calcOtherStat(
          baseStats[stat],
          minIvs[stat],
          statLevel.ev[stat],
          statLevel.level,
          natureModifiers[nature][stat]
        )
        upperBound = calcOtherStat(
          baseStats[stat],
          maxIvs[stat],
          statLevel.ev[stat],
          statLevel.level,
          natureModifiers[nature][stat]
        )
      }
      let minIv: number;
      let maxIv: number;
      if (lowerBound <= statLevel.stats[stat] && statLevel.stats[stat] <= upperBound) {
        if (stat === "hp") {
          minIv = Math.min(
            Math.max(
              calcMinimumHpIv(
                baseStats[stat],
                statLevel.ev[stat],
                statLevel.level,
                statLevel.stats[stat],
              ),
              0,
            ),
            31,
          );
          maxIv = Math.min(
            Math.max(
              calcMinimumHpIv(
                baseStats[stat],
                statLevel.ev[stat],
                statLevel.level,
                statLevel.stats[stat] + 1,
              ) - 1,
              0,
            ),
            31,
          );
        } else {
          minIv = Math.min(
            Math.max(
              calcMinimumOtherStatIv(
                baseStats[stat],
                statLevel.ev[stat],
                statLevel.level,
                statLevel.stats[stat],
                natureModifiers[nature][stat],
              ),
              0,
            ),
            31,
          );
          maxIv = Math.min(
            Math.max(
              calcMinimumOtherStatIv(
                baseStats[stat],
                statLevel.ev[stat],
                statLevel.level,
                statLevel.stats[stat] + 1,
                natureModifiers[nature][stat],
              ) - 1,
              0,
            ),
            31,
          );
        }
      } else {
        minIvs[stat] = NaN;
        maxIvs[stat] = NaN;
        continue;
      }
      if (minIv > minIvs[stat]) {
        minIvs[stat] = minIv;
      }
      if (maxIv < maxIvs[stat]) {
        maxIvs[stat] = maxIv;
      }
    }
  }
  for (const stat of stats) {
    const ivRange = ivRanges[stat];
    for (let iv = minIvs[stat]; iv <= maxIvs[stat]; iv++) {
      ivRange.push(iv);
    }
  }
  if (hiddenPower !== "") {
    const lsbRanges = narrowByHiddenPower(hiddenPower);
    for (const stat of stats) {
      const ivRange = ivRanges[stat];
      const lsbRange = lsbRanges[stat];
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (!lsbRange.has(ivRange[i] & 1)) {
          ivRange.splice(i, 1);
        }
      }
      minIvs[stat] = ivRange[0] ?? NaN;
      maxIvs[stat] = ivRange[ivRange.length - 1] ?? NaN;
    }
  }
  if (characteristic !== "") {
    const highestStat: Stat = characteristicsStats[characteristic].stat;
    const ivModulo = characteristicsStats[characteristic].ivModulo;
    let highestIv = maxIvs[highestStat];
    if (highestIv % 5 > ivModulo) {
      highestIv -= (highestIv % 5) - ivModulo;
    }
    if (highestIv % 5 < ivModulo) {
      highestIv -= (highestIv % 5) + (5 - ivModulo);
    }
    for (const stat of stats) {
      const ivRange = ivRanges[stat];
      for (let i = ivRange.length - 1; i >= 0; i--) {
        if (
          (stat === highestStat && ivRange[i] % 5 !== ivModulo)
          || ivRange[i] > highestIv
        ) {
          ivRange.splice(i, 1);
        }
      }
    }
  }
  return ivRanges;
}
