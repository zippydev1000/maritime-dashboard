import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { columns } from './TargetTableColumns';

describe('Threat Level renderCell (no JSX)', () => {
  const threatColumn = columns.find((col) => col.field === 'threat_level');
  if (!threatColumn) {
    throw new Error('Could not find a column with field "threat_level"');
  }

  if (typeof threatColumn.renderCell !== 'function') {
    throw new Error('The "threat_level" column does not have a renderCell function');
  }

  const renderCellFn = threatColumn.renderCell;

  it('renders HIGH threat level with class "highThreat"', () => {
    const cellNode = renderCellFn({ value: 'HIGH' } as any);
    const element = cellNode as React.ReactElement;
    render(element);

    expect(screen.getByText('HIGH')).toHaveClass('highThreat');
  });

  it('renders MEDIUM threat level with class "mediumThreat"', () => {
    const cellNode = renderCellFn({ value: 'MEDIUM' } as any);
    const element = cellNode as React.ReactElement;
    render(element);

    expect(screen.getByText('MEDIUM')).toHaveClass('mediumThreat');
  });

  it('renders LOW (or anything else) threat level with class "lowThreat"', () => {
    const cellNode = renderCellFn({ value: 'LOW' } as any);
    const element = cellNode as React.ReactElement;
    render(element);

    expect(screen.getByText('LOW')).toHaveClass('lowThreat');
  });
});
