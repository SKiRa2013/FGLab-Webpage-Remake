import { Link } from '../../routes/Link.jsx';

const MENU_ITEMS = [
  { label: 'Top Page', path: '/' },
  { label: 'About Lab', path: '/labo' },
  { 
    label: 'Future Gadget', 
    path: '/seika', 
    tag: '(updeto!!)' 
  },
  { label: 'Phenix BBS', path: '/bbs' },
  { label: 'link', path: '/links' },
];

export default function Hidari() {
    return (
        <>
            <aside className="w-[200px] flex-shrink-0 min-h-screen bg-black text-white p-4 border-r border-neutral-900 select-none"
                style={{
                    fontFamily: '"MS PMincho", "Hiragino Mincho Pro", serif',
                    fontSize: '16px',
                }}
            >

            <nav className="flex flex-col gap-3">
                {MENU_ITEMS.map((item) => (
                    <p key={item.path} className="m-0 leading-normal">
                        <Link to={item.path} className="text-blue-400 underline hover:text-blue-300 visited:text-purple-400">
                            {item.label}
                        </Link>

                        {item.tag && (
                            <span className="text-red-600 font-bold ml-1 text-sm inline-block animate-pulse">
                                {item.tag}
                            </span>
                        )}
                    </p>
                ))}
            </nav>
            </aside>
        </>
    );
};
