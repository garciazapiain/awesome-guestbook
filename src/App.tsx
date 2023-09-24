import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import TableVisitors from './components/TableVisitors';
import { VisitorData } from "./types";
import Header from './components/Header';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your custom theme
import { Grid } from '@mui/material';

function App() {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);

  useEffect(() => {
    // Load existing visitors from local storage when the component mounts
    const storedVisitors = localStorage.getItem("visitors");
    if (storedVisitors) {
      setVisitors(JSON.parse(storedVisitors));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Grid container>
          <Grid item xs={12} lg={4}>
            <Form visitors={visitors} setVisitors={setVisitors} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TableVisitors visitors={visitors} setVisitors={setVisitors} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
