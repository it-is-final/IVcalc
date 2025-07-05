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

import type { CalculatedIvs, NextLevels } from "../ivcalc/data";
import { statNames, stats } from "../ivcalc/data";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

interface IvCalcOutputProps {
  initial: boolean;
  ivs: CalculatedIvs;
  nextLevels: NextLevels;
}

function formatOutputIvs(ivRange: number[]) {
  if (!(ivRange.length > 0)) {
    return null;
  }
  if (
    ivRange.every(
      (iv, index, arr) => iv === arr[0] || iv === arr[index - 1] + 1,
    ) &&
    ivRange.length > 1
  ) {
    return `${ivRange[0]}–${ivRange[ivRange.length - 1]}`;
  }
  return ivRange.join(", ");
}

export default function IvCalcOutput({
  initial,
  ivs,
  nextLevels,
}: IvCalcOutputProps) {
  const statTable = stats.map((stat) => (
    <TableRow key={stat}>
      <TableCell component="th">{statNames[stat]}</TableCell>
      <TableCell>
        {formatOutputIvs(ivs[stat]) ?? (!initial && "Invalid")}
      </TableCell>
      <TableCell>{nextLevels[stat] ?? (!initial && "Invalid")}</TableCell>
    </TableRow>
  ));
  return (
    <TableContainer component="output">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"Stat"}</TableCell>
            <TableCell>{"IVs"}</TableCell>
            <TableCell>{"Next level"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{statTable}</TableBody>
      </Table>
    </TableContainer>
  );
}
