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
import { hiddenPowers } from "../../ivcalc/data";
import type { HiddenPower } from "../../ivcalc/data";

interface HiddenPowerSelectProps {
  hiddenPower: HiddenPower | "";
  setHiddenPower: React.Dispatch<React.SetStateAction<HiddenPower | "">>;
  disabled: boolean;
}

export default function HiddenPowerSelect({
  hiddenPower,
  setHiddenPower,
  disabled,
}: HiddenPowerSelectProps) {
  const options = hiddenPowers.map((hiddenPower) => (
    <MenuItem key={hiddenPower} value={hiddenPower}>
      {hiddenPower}
    </MenuItem>
  ));
  function handleChange(e: SelectChangeEvent) {
    const maybeHiddenPower = e.target.value;
    const hiddenPower =
      maybeHiddenPower === "NONE"
        ? ""
        : hiddenPowers.find(
            (validHiddenPower) => validHiddenPower === maybeHiddenPower,
          );
    if (hiddenPower !== undefined) {
      setHiddenPower(hiddenPower);
    }
  }
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="hidden-power-select-label">Hidden Power</InputLabel>
        <Select
          labelId="hidden-power-select-label"
          id="hidden-power-select"
          label="Hidden Power"
          value={hiddenPower === "" ? "NONE" : hiddenPower}
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
