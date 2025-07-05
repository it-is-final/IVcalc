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

import { stats, type StatLevel } from "../../ivcalc/data";

export function fixDiffStatsInput(statsInput: string, setStatsInput: React.Dispatch<React.SetStateAction<string>>) {
  setStatsInput(statsInput.replace(/(?<=^)\n/gm, ""));
}

export function mapStatLevel(statLevel: number[], statLevels: StatLevel[], calcMode: string) {
  const statLevelIndex = {
    hp: 0,
    attack: 1,
    defense: 2,
    specialAttack: 3,
    specialDefense: 4,
    speed: 5,
  } as const;
  const monStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }
  for (const stat of stats) {
    const input = statLevel[statLevelIndex[stat]];
    switch (calcMode) {
      case "exact": {
        monStats[stat] = input;
        break;
      }
      case "diff": {
        monStats[stat] = statLevels[statLevels.length - 1].stats[stat] + input;
        break;
      }
      default: {
        break;
      }
    }
  }
  return monStats;
}
