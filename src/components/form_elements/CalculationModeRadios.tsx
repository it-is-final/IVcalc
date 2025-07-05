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
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import type { ChangeEvent } from "react";
import { fixDiffStatsInput } from "./formElementUtil";

interface CalculationModeRadiosProps {
  calculationMode: string;
  setCalculationMode: React.Dispatch<React.SetStateAction<string>>;
  statsInput: string;
  setStatsInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function CalculationModeRadios({calculationMode, setCalculationMode, statsInput, setStatsInput}: CalculationModeRadiosProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCalculationMode(e.target.value);
    if (e.target.value === "diff") {
      fixDiffStatsInput(statsInput, setStatsInput)
    }
  }
  return (
    <FormControl>
      <FormLabel id="calculation-mode-label">Calculation Mode</FormLabel>
      <RadioGroup
        aria-labelledby="calculation-mode-label"
        defaultValue="exact"
        name="calculation-mode"
        value={calculationMode}
        onChange={handleChange}
      >
        <FormControlLabel
          value="exact"
          control={<Radio />}
          label="Exact"
        />
        <FormControlLabel
          value="diff"
          control={<Radio />}
          label="Difference"
        />
      </RadioGroup>
    </FormControl>
  );
}
