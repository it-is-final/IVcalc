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
import { generations } from "../../ivcalc/data";
import type { Generation } from "../../ivcalc/data";

interface GenerationSelectProps {
  generation: Generation | "";
  onGenerationChange: (e: SelectChangeEvent) => void;
}

export default function GenerationSelect({
  generation,
  onGenerationChange,
}: GenerationSelectProps) {
  const options = generations.map((generation) => (
    <MenuItem value={generation} key={generation}>
      {generation}
    </MenuItem>
  ));
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="generation-select-label">Generation</InputLabel>
        <Select
          labelId="generation-select-label"
          value={generation}
          id="generation-select"
          label="Generation"
          onChange={onGenerationChange}
          required
        >
          {options}
        </Select>
      </FormControl>
    </Grid>
  );
}
