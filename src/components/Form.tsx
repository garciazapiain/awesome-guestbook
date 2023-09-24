import React, { useState } from "react";
import { VisitorData } from "../types";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormHelperText, Grid, InputLabel } from "@mui/material";

interface TableProps {
    visitors: VisitorData[];
    setVisitors: (visitors: VisitorData[]) => void;
}

const Form: React.FC<TableProps> = ({ visitors, setVisitors }) => {
    // State to manage form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("Marketing");
    const [agreement, setAgreement] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null); // State for custom error message

    const theme = useTheme();

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isEmailUnique = !visitors.some((visitor) => visitor.email === email);

        // Validate the form data (you can add more validation logic here)
        if (!name || !email || !agreement) {
            alert("To continue, please fill in all required fields and agree to the terms.");
            return;
        }

        if (!isEmailUnique) {
            setEmailError("Email address already exists. Please use a different email.");
            return;
        }

        // Create a new visitor object with form data
        const newVisitor = {
            name,
            email,
            department,
        };

        // Update local state with the new visitor
        setVisitors([...visitors, newVisitor]);

        // Update local storage with the updated visitors
        localStorage.setItem("visitors", JSON.stringify([...visitors, newVisitor]));

        // Clear the form inputs
        setName("");
        setEmail("");
        setDepartment("Marketing");
        setAgreement(false);
    };

    return (
        <div style={{ margin: "1rem" }}>
            <h2 style={{ display: "flex", fontSize: theme.typography.h2.fontSize }}>Add new visitor</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ margin: "1rem 0" }}>
                    <TextField
                        id="name"
                        label="Full name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ margin: "1rem 0" }}>
                    <TextField
                        id="email"
                        label="Email address"
                        variant="outlined"
                        fullWidth
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                    />
                    {emailError && (
                        <FormHelperText error={true}>{emailError}</FormHelperText>
                    )}
                </div>
                <div style={{ margin: "1rem 0", textAlign: "initial" }}>
                    <FormControl fullWidth>
                        <InputLabel id="department">Department</InputLabel>
                        <Select
                            label="Department"
                            variant="outlined"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value as string)}
                        >
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                            <MenuItem value="Management">Management</MenuItem>
                            <MenuItem value="Accounting">Accounting</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: "flex", margin: "1rem" }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="agreement"
                                checked={agreement}
                                onChange={(e) => setAgreement(e.target.checked)}
                                required
                            />
                        }
                        label="I agree to be added to the table"
                    />
                </div>
                <Grid container columnSpacing={1} style={{ margin: '1rem 0' }}>
                    <Grid item xs={12} sm={4}>
                        <Button
                            type="reset"
                            variant="contained"
                            style={{
                                height: '36px',
                                width: '100%',
                                marginBottom: '1rem', // Add margin at the bottom for spacing
                                background: 'white',
                                color: theme.palette.primary.main,
                                border: `1px solid ${theme.palette.primary.main}`,
                            }}
                            onClick={() => {
                                setName("");
                                setEmail("");
                                setDepartment("Marketing");
                                setAgreement(false);
                            }}
                        >
                            Reset form
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ height: '36px', width: '100%' }}
                            onClick={handleSubmit}
                        >
                            Add New Visitor
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Form;
