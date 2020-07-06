import React, {memo} from 'react';
import { Divider, Grid, Paper } from '@material-ui/core';
import cruz from '../../assets/images/redCross.gif';
import useStyles from './useStyles';

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={5}>
        <Paper className={[classes.paper, classes.form]}>
          <h1>Home</h1>
          <img src={cruz} width='50%' height='50%'/>
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

export default memo(Home);
