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

import Papa from "papaparse";
import type { Generation, MonEntry } from "./data.ts";
import gen35data from "../assets/pkmn_g3-g5.csv?raw";
import gen6data from "../assets/pkmn_g3-g5.csv?raw";
import gen7data from "../assets/pkmn_g3-g5.csv?raw";
import gen8data from "../assets/pkmn_g3-g5.csv?raw";
import gen9data from "../assets/pkmn_g3-g5.csv?raw";

function filterPokemonData(csvData: MonEntry[], generation: Generation) {
  let nationalDexSize: number;
  switch (generation) {
    case "3": {
      nationalDexSize = 386;
      break;
    }
    case "4": {
      nationalDexSize = 493;
      break;
    }
    case "5": {
      nationalDexSize = 649;
      break;
    }
    case "6": {
      nationalDexSize = 721;
      break;
    }
    case "7": {
      nationalDexSize = 809;
      break;
    }
    case "8": {
      nationalDexSize = 905;
      break;
    }
    case "9": {
      nationalDexSize = 1025;
      break;
    }
  }
  return csvData.filter(
    (pokemon) => pokemon.number >= 1 && pokemon.number <= nationalDexSize,
  );
}

function processPokemonDataCsv(generation: Generation) {
  let csv;
  switch (generation) {
    case "3":
    case "4":
    case "5": {
      csv = gen35data;
      break;
    }
    case "6": {
      csv = gen6data;
      break;
    }
    case "7": {
      csv = gen7data;
      break;
    }
    case "8": {
      csv = gen8data;
      break;
    }
    case "9": {
      csv = gen9data;
      break;
    }
  }
  const parsedCsv = Papa.parse(csv, {
    header: true,
    transformHeader: (header) => {
      switch (header) {
        case "Number": {
          return "number";
        }
        case "Name": {
          return "name";
        }
        case "Form": {
          return "form";
        }
        case "HP": {
          return "hp";
        }
        case "Attack": {
          return "attack";
        }
        case "Defense": {
          return "defense";
        }
        case "Sp.Attack": {
          return "specialAttack";
        }
        case "Sp.Defense": {
          return "specialDefense";
        }
        case "Speed": {
          return "speed";
        }
        default: {
          return header;
        }
      }
    },
    transform: (v, h) => {
      switch (h) {
        case "number":
        case "hp":
        case "attack":
        case "defense":
        case "specialAttack":
        case "specialDefense":
        case "speed": {
          return Number(v);
        }
        case "name":
        case "form": {
          return v;
        }
      }
    },
  }) as Papa.ParseResult<MonEntry>;
  return filterPokemonData(parsedCsv.data, generation);
}

const pokemonData = {
  "3": processPokemonDataCsv("3"),
  "4": processPokemonDataCsv("4"),
  "5": processPokemonDataCsv("5"),
  "6": processPokemonDataCsv("6"),
  "7": processPokemonDataCsv("7"),
  "8": processPokemonDataCsv("8"),
  "9": processPokemonDataCsv("9"),
};

export function fetchPokemonData(generation: Generation) {
  return pokemonData[generation];
}

export function getPokemonForms(
  currentPokemon: string,
  pokemonData: MonEntry[],
) {
  const entries = pokemonData.filter(
    (pokemon) => pokemon.name === currentPokemon,
  );
  return entries.map((pokemon) => pokemon.form);
}
