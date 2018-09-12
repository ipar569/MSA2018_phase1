import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

import { Link } from 'react-router-dom';

const theme = createMuiTheme({
    overrides: {
      // Name of the component ⚛️ / style sheet
      MuiAppBar: {
        // Name of the rule
        root: {
          // Some CSS
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          color: 'white',
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
  });

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <MuiThemeProvider theme={theme}>
      
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="display2" color="inherit">
                        <Link style={{color: "white"}} to="/">How's the Weather?</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
}