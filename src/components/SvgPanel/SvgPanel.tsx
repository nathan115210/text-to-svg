import './SvgPanel.scss';
import SvgPreview from '@/components/SvgPreview/SvgPreview';
import SvgCode from '@/components/SvgCode/SvgCode';
export default function SvgPanel() {
  return (
    <div className="svg-panel">
      {/* left: live preview */}
      <SvgPreview />
      {/* right: code + buttons */}
      <SvgCode />
    </div>
  );
}
