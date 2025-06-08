'use client';

import React from 'react';
import './SideBar.scss';
import Logo from '@/components/Logo/Logo';
import SetFontFamily from '@/components/Settings/SetFontFamily/SetFontFamily';
import SetFontVariant from '@/components/Settings/SetFontVariant/SetFontVariant';
import SetFontSize from '@/components/Settings/SetFontSize/SetFontSize';
import SetText from '@/components/Settings/SetText/SetText';

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
        <li>
          <SetFontSize label={'Font Size'} />
        </li>
        <li>
          <SetText label={'Text'} />
        </li>
      </ul>
    </aside>
  );
};
export default SideBar;
