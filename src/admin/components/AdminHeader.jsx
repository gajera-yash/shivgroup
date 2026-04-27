import { HiOutlineMenuAlt2, HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';

const AdminHeader = ({ onMenuToggle, title }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <HiOutlineMenuAlt2 className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-[17px] font-bold text-slate-800 tracking-tight">{title}</h2>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-[220px]">
            <HiOutlineSearch className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
            <HiOutlineBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#AB2F2F]" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#AB2F2F] to-[#e04848] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-red-500/15">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-bold text-slate-800 leading-tight">Admin</p>
              <p className="text-[11px] text-slate-400 font-medium">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
