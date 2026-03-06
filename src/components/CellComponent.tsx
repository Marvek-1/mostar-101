
import React from 'react';
import { Cell as RechartCell } from 'recharts';

const Cell = ({ key, fill }: { key: string | number; fill: string }) => {
  return <RechartCell key={key} fill={fill} />;
};

export default Cell;
