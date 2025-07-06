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

import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import type { MonEntry } from "../../ivcalc/data";
import { getPokemonForms } from "../../ivcalc/util";

interface PokemonSelectProps {
  pokemon: string;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setPokemonForm: React.Dispatch<React.SetStateAction<string>>;
  pokemonData: MonEntry[];
}

export default function PokemonSelect({
  pokemon,
  setPokemon,
  setPokemonForm,
  pokemonData,
}: PokemonSelectProps) {
  const pokemonNames = [...new Set(pokemonData.map((pokemon) => pokemon.name))];
  function handleChange(_: React.SyntheticEvent, newValue: string | null) {
    if (newValue) {
      setPokemon(newValue);
      const defaultForm = getPokemonForms(newValue, pokemonData)[0];
      setPokemonForm(defaultForm);
    } else {
      setPokemon("");
      setPokemonForm("");
    }
  }
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Autocomplete
        fullWidth
        disablePortal
        options={pokemonNames}
        onChange={handleChange}
        disabled={!(pokemonData.length > 0)}
        value={pokemon}
        renderInput={(params) => (
          <TextField {...params} label="Pokémon" required />
        )}
      />
    </Grid>
  );
}
