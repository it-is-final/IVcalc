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

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ConsiderEVsCheckboxProps {
  considerEVs: boolean;
  setConsiderEVs: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConsiderEVsCheckbox({
  considerEVs,
  setConsiderEVs,
}: ConsiderEVsCheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={considerEVs}
          onChange={(e) => setConsiderEVs(e.target.checked)}
        />
      }
      label="Consider EVs"
    />
  );
}
