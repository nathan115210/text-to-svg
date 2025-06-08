import React from 'react';
import SideBar from '@/components/SideBar/SideBar';
import './page.scss';
import BottomSheetModal from '@/components/BottomSheetModal/BottomSheetModal';
import SetFontFamily from '@/components/Settings/SetFontFamily/SetFontFamily';
import SetFontVariant from '@/components/Settings/SetFontVariant/SetFontVariant';
import SetFontSize from '@/components/Settings/SetFontSize/SetFontSize';
import SetText from '@/components/Settings/SetText/SetText';

export default function Home() {
  return (
    <main className="page-container">
      <SideBar></SideBar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Log cards will be rendered here */}
      </div>
      <BottomSheetModal>
        <>
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
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>{' '}
            <li>
              <SetText label={'Text'} />
            </li>
          </ul>
        </>
      </BottomSheetModal>
    </main>
  );
}
