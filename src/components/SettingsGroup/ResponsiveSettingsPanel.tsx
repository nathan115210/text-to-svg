'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import BottomSheetModal from '@/components/BottomSheetModal/BottomSheetModal';
import SideBar from '@/components/SideBar/SideBar';

export default function ResponsiveSettingsPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BottomSheetModal>{children}</BottomSheetModal>;
  } else {
    return <SideBar>{children}</SideBar>;
  }
}
