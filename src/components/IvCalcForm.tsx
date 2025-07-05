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

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { type SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState, type FormEvent } from "react";
import IvCalcOutput from "./IvCalcOutput";
import {
  generations,
  type Stats,
  type CalculatedIvs,
  type Characteristic,
  type Generation,
  type HiddenPower,
  type MonEntry,
  type Nature,
  type StatLevel,
  type NextLevels,
} from "../ivcalc/data";
import { fetchPokemonData } from "../ivcalc/util";
import CalculationModeRadios from "./form_elements/CalculationModeRadios";
import CharacteristicSelect from "./form_elements/CharacteristicSelect";
import GenerationSelect from "./form_elements/GenerationSelect";
import HiddenPowerSelect from "./form_elements/HiddenPowerSelect";
import NatureSelect from "./form_elements/NatureSelect";
import PokemonFormSelect from "./form_elements/PokemonFormSelect";
import PokemonSelect from "./form_elements/PokemonSelect";
import StatsInputTextarea from "./form_elements/StatsInputTextarea";
import InitialLevelInput from "./form_elements/InitialLevelInput";
import ConsiderEVsCheckbox from "./form_elements/ConsiderEVsCheckbox";
import { mapStatLevel } from "./form_elements/formElementUtil";
import { calcIvRanges, getNextIvLevel } from "../ivcalc/calculate";

export default function IvCalcForm() {
  const [isInitialLoad, setisInitialLoad] = useState(true);
  const [generation, setGeneration] = useState<Generation | "">("");
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState<MonEntry[]>([]);
  const [pokemonForm, setPokemonForm] = useState("");
  const [nature, setNature] = useState<Nature | "">("");
  const [characteristic, setCharacteristic] = useState<Characteristic | "">("");
  const [characteristicAvailable, setCharacteristicAvailable] = useState(false);
  const [hiddenPower, setHiddenPower] = useState<HiddenPower | "">("");
  const [hiddenPowerAvailable, setHiddenPowerAvailable] = useState(false);
  const [statsInput, setStatsInput] = useState("");
  const [calculationMode, setCalculationMode] = useState("exact");
  const [initialLevel, setInitialLevel] = useState(1);
  const [considerEVs, setConsiderEVs] = useState(false);
  const [results, setResults] = useState<CalculatedIvs>({
    hp: [],
    attack: [],
    defense: [],
    specialAttack: [],
    specialDefense: [],
    speed: [],
  });
  const [nextLevels, setNextLevels] = useState<NextLevels>({
    hp: null,
    attack: null,
    defense: null,
    specialAttack: null,
    specialDefense: null,
    speed: null,
  });

  function handleGenerationChange(e: SelectChangeEvent) {
    const maybeGeneration = e.target.value;
    const generation = generations.find(
      (validGeneration) => validGeneration === maybeGeneration,
    );
    if (generation === undefined) {
      return;
    }
    setGeneration(generation);
    setPokemon("");
    setPokemonForm("");
    switch (generation) {
      case "3": {
        setCharacteristic("");
        setCharacteristicAvailable(false);
        setHiddenPowerAvailable(true);
        break;
      }
      case "4":
      case "5":
      case "6":
      case "7": {
        setCharacteristicAvailable(true);
        setHiddenPowerAvailable(true);
        break;
      }
      case "8":
      case "9": {
        setHiddenPower("");
        setCharacteristicAvailable(true);
        setHiddenPowerAvailable(false);
        break;
      }
    }
    fetchPokemonData(generation).then(setPokemonData);
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const speciesData = pokemonData.find(
      (entry) => entry.name === pokemon && entry.form === pokemonForm,
    );
    if (speciesData === undefined) {
      return;
    }
    const baseStats: Stats = {
      hp: speciesData.hp,
      attack: speciesData.attack,
      defense: speciesData.defense,
      specialAttack: speciesData.specialAttack,
      specialDefense: speciesData.specialDefense,
      speed: speciesData.speed,
    };
    const statLevels: StatLevel[] = [];
    const rawStatLevels = statsInput
      .split("\n")
      .map((level) =>
        level.split(" ").map((stat) => (stat !== "" ? Number(stat) : null)),
      );
    for (const [i, statLevel] of rawStatLevels.entries()) {
      if (statLevel.length === 1 && statLevel.includes(null) && i !== 0) {
        continue;
      }
      if (
        statLevel.length !== (considerEVs ? 12 : 6) ||
        statLevel.includes(null)
      ) {
        alert("Input is incorrectly formatted, please fix this.");
        return;
      }
      // Hard pass initial stats as 'exact' mode
      statLevels.push({
        level: initialLevel + i,
        stats: mapStatLevel(
          statLevel as number[],
          statLevels,
          i === 0 ? "exact" : calculationMode,
        ),
        ev: {
          hp: statLevel[6] ?? 0,
          attack: statLevel[7] ?? 0,
          defense: statLevel[8] ?? 0,
          specialAttack: statLevel[9] ?? 0,
          specialDefense: statLevel[10] ?? 0,
          speed: statLevel[11] ?? 0,
        },
      });
    }
    const calculatedIvs = calcIvRanges(
      baseStats,
      statLevels,
      nature as Nature,
      characteristic,
      hiddenPower,
      speciesData.number === 292,
    );
    setisInitialLoad(false);
    setResults(calculatedIvs);
    setNextLevels({
      hp: getNextIvLevel(
        "hp",
        baseStats.hp,
        calculatedIvs.hp,
        statLevels[statLevels.length - 1].ev.hp,
        statLevels[statLevels.length - 1].level,
        nature as Nature,
        speciesData.number === 292,
      ),
      attack: getNextIvLevel(
        "attack",
        baseStats.attack,
        calculatedIvs.attack,
        statLevels[statLevels.length - 1].ev.attack,
        statLevels[statLevels.length - 1].level,
        nature as Nature,
        speciesData.number === 292,
      ),
      defense: getNextIvLevel(
        "defense",
        baseStats.defense,
        calculatedIvs.defense,
        statLevels[statLevels.length - 1].ev.defense,
        statLevels[statLevels.length - 1].level,
        nature as Nature,
        speciesData.number === 292,
      ),
      specialAttack: getNextIvLevel(
        "specialAttack",
        baseStats.specialAttack,
        calculatedIvs.specialAttack,
        statLevels[statLevels.length - 1].ev.specialAttack,
        statLevels[statLevels.length - 1].level,
        nature as Nature,
        speciesData.number === 292,
      ),
      specialDefense: getNextIvLevel(
        "specialDefense",
        baseStats.specialDefense,
        calculatedIvs.specialDefense,
        statLevels[statLevels.length - 1].ev.specialDefense,
        statLevels[statLevels.length - 1].level,
        nature as Nature,
        speciesData.number === 292,
      ),
      speed: getNextIvLevel(
        "speed",
        baseStats.speed,
        calculatedIvs.speed,
        statLevels[statLevels.length - 1].ev.speed,
        statLevels[statLevels.length - 1].level,
        nature as Nature,
        speciesData.number === 292,
      ),
    });
  }

  return (
    <Grid container component="form" spacing={1} onSubmit={handleFormSubmit}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid size={12} container spacing={2}>
          <GenerationSelect
            generation={generation}
            onGenerationChange={handleGenerationChange}
          />
          <PokemonSelect
            pokemon={pokemon}
            setPokemon={setPokemon}
            setPokemonForm={setPokemonForm}
            pokemonData={pokemonData}
          />
          <PokemonFormSelect
            pokemon={pokemon}
            pokemonForm={pokemonForm}
            setPokemonForm={setPokemonForm}
            pokemonData={pokemonData}
          />
          <NatureSelect nature={nature} setNature={setNature} />
          <CharacteristicSelect
            characteristic={characteristic}
            setCharacteristic={setCharacteristic}
            disabled={!characteristicAvailable}
          />
          <HiddenPowerSelect
            hiddenPower={hiddenPower}
            setHiddenPower={setHiddenPower}
            disabled={!hiddenPowerAvailable}
          />
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <InitialLevelInput
                initialLevel={initialLevel}
                setInitialLevel={setInitialLevel}
              />
              <ConsiderEVsCheckbox
                considerEVs={considerEVs}
                setConsiderEVs={setConsiderEVs}
              />
              <CalculationModeRadios
                calculationMode={calculationMode}
                setCalculationMode={setCalculationMode}
                statsInput={statsInput}
                setStatsInput={setStatsInput}
              />
            </Stack>
          </Grid>
          <StatsInputTextarea
            statsInput={statsInput}
            setStatsInput={setStatsInput}
            calculationMode={calculationMode}
          />
          <Grid size={12}>
            <Button variant="contained" type="submit" fullWidth>
              Find
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <IvCalcOutput
          initial={isInitialLoad}
          ivs={results}
          nextLevels={nextLevels}
        />
      </Grid>
    </Grid>
  );
}
