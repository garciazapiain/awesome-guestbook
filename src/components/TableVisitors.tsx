import React, { useState } from "react";
import { VisitorData } from "../types";
import VisitorRow from "./VisitorRow";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import '../App.css';

interface TableProps {
  visitors: VisitorData[];
  setVisitors: (visitors: VisitorData[]) => void;
}

const VisitorTable: React.FC<TableProps> = ({ visitors, setVisitors }) => {
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);
  const areAllVisitorsSelected = selectedVisitors.length === visitors.length;

  const theme = useTheme();

  const toggleSelect = (email: string) => {
    setSelectedVisitors((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((item) => item !== email)
        : [...prevSelected, email]
    );
  };

  const handleRemoveSelected = () => {
    // Filter out the selected visitors from the original list
    const updatedVisitors = visitors.filter(
      (visitor) => !selectedVisitors.includes(visitor.email)
    );

    // Clear selected visitors
    setSelectedVisitors([]);

    // Update local state with the removed visitor
    setVisitors(updatedVisitors);

    // Update local storage with the updated visitors
    localStorage.setItem("visitors", JSON.stringify(updatedVisitors));
  };

  const toggleSelectAll = () => {
    if (!areAllVisitorsSelected) {
      // If not all visitors are selected, select all.
      setSelectedVisitors(visitors.map((visitor) => visitor.email));
    } else {
      // If all visitors are selected, deselect all.
      setSelectedVisitors([]);
    }
  };

  return (
    <div className="tableVisitorsContainer">
      <h1 style={{ display: "flex" }}>Visitor management</h1>
      <div>
        <Button style={{ margin:"1rem 0", display: "flex", backgroundColor:theme.palette.error.main }} variant="contained" color="primary" onClick={handleRemoveSelected}>
          Remove
        </Button>
        <TableContainer style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "1rem" }}>
                  <Checkbox
                    checked={areAllVisitorsSelected && visitors.length > 0}
                    onChange={toggleSelectAll}
                  />
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Visitor</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "end" }}>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visitors.map((visitor) => (
                <VisitorRow
                  key={visitor.email}
                  visitor={visitor}
                  isSelected={selectedVisitors.includes(visitor.email)}
                  toggleSelect={toggleSelect}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default VisitorTable;
