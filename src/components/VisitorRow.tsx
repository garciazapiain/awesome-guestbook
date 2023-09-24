import React from "react";
import { VisitorData } from "../types";
import { TableRow, TableCell, Checkbox, Chip } from "@mui/material";

interface VisitorProps {
  visitor: VisitorData;
  isSelected: boolean;
  toggleSelect: (email: string) => void;
}

const VisitorRow: React.FC<VisitorProps> = ({
  visitor,
  isSelected,
  toggleSelect,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onChange={() => toggleSelect(visitor.email)}
        />
      </TableCell>
      <TableCell>{visitor.name}</TableCell>
      <TableCell>{visitor.email}</TableCell>
      <TableCell style={{textAlign:"end"}}><Chip
        label={visitor.department}
        variant="outlined"
        size="small"
        color="primary"
      /></TableCell>
    </TableRow>
  );
};

export default VisitorRow;
