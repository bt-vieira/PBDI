import React, {memo} from 'react';
import { Divider, Grid, Paper } from '@material-ui/core';

import useStyles from './useStyles';

const Receita = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={5}>
        <Paper className={[classes.paper, classes.form]}>
          <h1>Alunos</h1>
          <p>Beatriz Tavares - 181022011</p>
          <p>Karen Murakawa - 181025701</p>
          <p>Maurício Scarelli Arantes - 181020904</p>
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

export default memo(Receita);
