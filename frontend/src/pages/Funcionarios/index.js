import React, {memo} from 'react';
import { Divider, Grid, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import Dados from './dados';
//import Modal from 'react-modal';

const Funcionarios = () => {
    const classes = useStyles();
    return (
      <Grid container justify="center">
        <Grid item xs={12} lg={5}>
          <Paper className={[classes.paper, classes.form]}>  
            <Dados />
            <Divider />
            <p >
              Código fonte em:
              <a href="https://github.com/bt-vieira/PBDI"> https://github.com/bt-vieira/PBDI</a>
            </p>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default memo(Funcionarios);