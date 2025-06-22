import React from 'react';
import SetFontFamily from '@/components/Settings/SetFontFamily/SetFontFamily';
import SetFontVariant from '@/components/Settings/SetFontVariant/SetFontVariant';
import SetFontSize from '@/components/Settings/SetFontSize/SetFontSize';
import SetText from '@/components/Settings/SetText/SetText';
import './SettingsGroup.scss';
import ResponsiveSettingsPanel from '@/components/SettingsGroup/ResponsiveSettingsPanel';

function SettingsList() {
  return (
    <div className={'settings-group'}>
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
    </div>
  );
}

export default function SettingsGroup() {
  return (
    <ResponsiveSettingsPanel>
      <SettingsList />
    </ResponsiveSettingsPanel>
  );
}
