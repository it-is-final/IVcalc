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
import { characteristics } from "../../ivcalc/data";
import type { Characteristic } from "../../ivcalc/data";

interface CharacteristicSelectProps {
  characteristic: Characteristic | "";
  setCharacteristic: React.Dispatch<React.SetStateAction<Characteristic | "">>;
  disabled: boolean;
}

export default function CharacteristicSelect({
  characteristic,
  setCharacteristic,
  disabled,
}: CharacteristicSelectProps) {
  const options = characteristics.map((characteristic) => (
    <MenuItem key={characteristic} value={characteristic}>
      {characteristic}
    </MenuItem>
  ));
  function handleChange(e: SelectChangeEvent) {
    const maybeCharacteristic = e.target.value;
    const characteristic =
      maybeCharacteristic === "NONE"
        ? ""
        : characteristics.find(
            (validCharacteristic) =>
              validCharacteristic === maybeCharacteristic,
          );
    if (characteristic !== undefined) {
      setCharacteristic(characteristic);
    }
  }
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="characteristic-select-label">Characteristic</InputLabel>
        <Select
          labelId="characteristic-select-label"
          id="characteristic-select"
          label="Characteristic"
          value={characteristic === "" ? "NONE" : characteristic}
          onChange={handleChange}
          disabled={disabled}
        >
          <MenuItem value={"NONE"}>{"None"}</MenuItem>
          {options}
        </Select>
      </FormControl>
    </Grid>
  );
}
