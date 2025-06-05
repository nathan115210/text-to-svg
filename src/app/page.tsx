import './page.scss';
import SideBar from '@/components/SideBar/SideBar';

export default function Home() {
  return (
    <main className="container">
      <SideBar></SideBar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Log cards will be rendered here */}
      </div>
    </main>
  );
}
