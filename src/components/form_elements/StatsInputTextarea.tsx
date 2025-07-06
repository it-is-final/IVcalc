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
import type { ChangeEvent } from "react";
import { fixDiffStatsInput } from "./formElementUtil";
import TextField from "@mui/material/TextField";

interface StatsInputTextareaProps {
  statsInput: string;
  setStatsInput: React.Dispatch<React.SetStateAction<string>>;
  calculationMode: string;
}

export default function StatsInputTextarea({
  statsInput,
  setStatsInput,
  calculationMode,
}: StatsInputTextareaProps) {
  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setStatsInput(e.target.value.replace(/[^0-9\s]+| {2,}| (?=\n)/, ""));
    if (calculationMode === "diff") {
      fixDiffStatsInput(
        e.target.value.replace(/[^0-9\s]+| {2,}| (?=\n)/, ""),
        setStatsInput,
      );
    }
  }
  return (
    <Grid size={{ xs: 12, sm: 8 }}>
      <TextField
        multiline
        label="Stats"
        rows={9}
        onChange={handleInput}
        value={statsInput}
        required
        style={{
          width: "100%",
          height: "100%",
        }}
        autoComplete="false"
        autoCorrect="false"
        spellCheck={false}
      />
    </Grid>
  );
}
