import React, { memo, useCallback } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const HeaderItem = memo(({ path, title }) => {

  const history = useHistory();

  const { pathname } = useLocation();

  const onClick = useCallback(() => history.push(path), [history, path]);

  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary = {title}/>
      <span className={clsx(pathname === path )} />
    </ListItem>
  );
});

HeaderItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};

HeaderItem.defaultProps = {
  path: 'path',
  title: '',
};

export default HeaderItem;
