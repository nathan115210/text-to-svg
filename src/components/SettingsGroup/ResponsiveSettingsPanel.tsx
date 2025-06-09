'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import BottomSheetModal from '@/components/BottomSheetModal/BottomSheetModal';
import SideBar from '@/components/SideBar/SideBar';

const ResponsiveSettingsPanel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BottomSheetModal>{children}</BottomSheetModal>;
  } else {
    return <SideBar>{children}</SideBar>;
  }
};

export default React.memo(ResponsiveSettingsPanel);
