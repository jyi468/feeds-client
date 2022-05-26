import { PlusCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="sticky top-0 shadow-md">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">Feeds</a>
                </div>
                <div className="navbar-center">
                    <Link href="/feeds/create">
                        <a className="btn btn-primary">Create <PlusCircleIcon className="h-5 w-5 pl-1" /></a>
                    </Link>
                </div>
                <div className="navbar-end">
                    <a className="btn">Get started</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;