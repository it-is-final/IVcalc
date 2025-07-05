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

import TextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";

interface InitialLevelInputProps {
  initialLevel: number;
  setInitialLevel: React.Dispatch<React.SetStateAction<number>>;
}

export default function InitialLevelInput({
  initialLevel,
  setInitialLevel,
}: InitialLevelInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInitialLevel(Math.min(Math.max(parseInt(e.target.value, 10), 1), 100));
  }
  return (
    <TextField
      label="Initial Level"
      value={initialLevel}
      onChange={handleChange}
      slotProps={{
        htmlInput: {
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]^",
          min: 0,
          max: 100,
        },
      }}
    />
  );
}
