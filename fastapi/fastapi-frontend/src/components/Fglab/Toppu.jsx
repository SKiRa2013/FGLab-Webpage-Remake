import './Fglab.css';

import { Link } from '../../routes/Link.jsx';

export default function Toppu() {
    return (
        <article className="fglab-container flex flex-col min-h-full justify-between items-center text-center">
            <header className="flex flex-col items-center gap-2 mb-6">
                <img src="/Data/taitoru.jpg" alt="titoru.jpg" className="max-w-full" />

                <p className="aa"><strong>HOMEPAGE</strong></p>
            </header>

            <section className="flex flex-col items-center gap-4 my-auto w-full max-w-xl">
                <p>You're the <span className="aaa">0000225485558TH</span> visitor to this site.</p>

                <p className="bb mb-4">Welcome to the Future Gadget Laboratory Homepage!</p>

                <div className="space-y-1">
                    <p className="blink">Breaking News</p>
                    <p className="blink">!!!Stage 1 of expansion of the western!!!</p>
                </div>
                
                <div>
                    <Link to="/seika" style={{ fontSize: 'large', color: '#00F', textDecoration: 'underline' }}>Future Gadget update!</Link>
                </div>

                <table className="fglab-table">
                    <tbody>
                        <tr>
                            <td className="p-3">
                                <p className="mb-2">
                                    This Paige of English is made of efforts to expansion into west, as a making into perfect English by glorious Super Hacka with a helping of machine translation software
                                </p>

                                <Link
                                    to="https://web.archive.org/web/20190914035140/http://futuregadget-lab.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: '#00F', textDecoration: 'underline' }}
                                    >
                                        click here for main site
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <footer className="flex flex-col items-center gap-2 mt-8 text-neutral-400 text-xs w-full">
                <p>This HOMEPAGE is compatible with deloode chrome ver.2.0 and up.</p>
                <p>Recommended resolution is 1600x1200 pixels.</p>
                <img src="/Data/1f.jpg" alt="burankankoubou" className="mt-6" />

                <p className="mt-1">React version by S-KiRa, 2026.</p>
            </footer>
        </article>
    );
};
