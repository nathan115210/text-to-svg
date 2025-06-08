'use client';

import React from 'react';
import './SideBar.scss';
import Logo from '@/components/Logo/Logo';
import SetFontFamily from '@/components/Settings/SetFontFamily/SetFontFamily';
import SetFontVariant from '@/components/Settings/SetFontVariant/SetFontVariant';

const SideBar = () => {
  return (
    <aside className={'sideBar'}>
      <Logo />
      <h1 className={'heading'}>Settings</h1>

      <ul className={'listItem-group'}>
        <li>
          <SetFontFamily label="Font Family" />
        </li>
        <li>
          <SetFontVariant label="Font Variant" />
        </li>

        <li></li>
      </ul>
    </aside>
  );
};
export default SideBar;
