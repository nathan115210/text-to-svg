import React from 'react';
import './SideBar.scss';

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return <aside className={'sideBar'}>{children}</aside>;
};
export default SideBar;
