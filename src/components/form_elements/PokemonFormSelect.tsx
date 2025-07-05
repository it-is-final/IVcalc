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

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import type { MonEntry } from "../../ivcalc/data";
import { getPokemonForms } from "../../ivcalc/util";

interface PokemonFormSelectProps {
  pokemon: string;
  pokemonForm: string;
  setPokemonForm: React.Dispatch<React.SetStateAction<string>>;
  pokemonData: MonEntry[];
}

export default function PokemonFormSelect({
  pokemon,
  pokemonForm,
  setPokemonForm,
  pokemonData,
}: PokemonFormSelectProps) {
  const pokemonForms = getPokemonForms(pokemon, pokemonData);
  const options = pokemonForms.map((form) => (
    <MenuItem key={form} value={form === "" ? "DEFAULT" : form}>
      {form === "" ? "–" : form}
    </MenuItem>
  ));
  function handleChange(e: SelectChangeEvent) {
    setPokemonForm(e.target.value === "DEFAULT" ? "" : e.target.value);
  }
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="pokemon-form-select-label">Form</InputLabel>
        <Select
          labelId="pokemon-form-select-label"
          id="pokemon-form-select"
          label="Form"
          onChange={handleChange}
          disabled={!(pokemonData.length > 0 && options.length > 0)}
          value={
            (pokemonForms.length > 0 &&
              (pokemonForm === "" ? "DEFAULT" : pokemonForm)) ||
            ""
          }
        >
          {options}
        </Select>
      </FormControl>
    </Grid>
  );
}
