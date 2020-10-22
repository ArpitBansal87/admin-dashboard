import React from 'react';
import Sidebar  from './sidebar';
import { render } from '@testing-library/react';
test('should test Sidebar component', () => {
 const { getByTestId} = render(<Sidebar ></Sidebar>);
 const drawerExist = getByTestId('data-menu-item');
 expect(drawerExist).toBeTruthy();
});