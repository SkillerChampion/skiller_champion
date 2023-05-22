import React from 'react';
import KeyPresserGame from './KeyPresserGame';
import classes from './Index.module.css';

const Index = () => {
  return (
    <div className={`${classes.root}`}>
      <KeyPresserGame />
    </div>
  );
};

export default Index;
