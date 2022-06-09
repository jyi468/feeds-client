import dynamic from 'next/dynamic';
import { useState, } from 'react';

const containerSelector = 'tbody';

// We must use a dynamic import here because the draggable does not work with SSR
// It must only be available client side, due to its usage of the window object.
// @ts-ignore
const SortableDynamic = dynamic(() => import('@shopify/draggable/lib/sortable').then(
    (mod: any) => {
        const Sortable = mod.default;
        const containers = document.querySelectorAll(containerSelector);
        if (containers.length === 0) {
            return false;
        }
        // const sortable = new Sortable(containers, {
        //     draggable: 'tr',
        //     handle: '.checkbox',
        // });
    }
), { ssr: false });

type CreateListProps = {
    data?: any[];
}

interface ListRow {
    isChecked: boolean,
    url: string,
}

const CreateList = ({ data }: CreateListProps) => {
    const mockRows: ListRow[] = [
        { isChecked: false, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        { isChecked: false, url: 'https://www.youtube.com/watch?v=o7Tikr2fp-c' },
        { isChecked: false, url: 'https://www.youtube.com/watch?v=mC43pZkpTec' },
    ]
    data = mockRows;
    const [rows, setRows] = useState(data ?? []);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const handleOnAllChecked = (event: any) => {
        setIsAllChecked(event.target.checked);
        setRows(rows.map(row => {
            row.isChecked = event.target.checked;
            return row;
        }));
    };

    const handleOnCheck = ({ index, event }: any) => {
        rows[index].isChecked = event.target.checked;
        setRows([...rows]);
    };

    const handleOnInputChange = () => {
        setRows([...rows]);
    };
    return (
        <div>
            <SortableDynamic></SortableDynamic>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" className="checkbox" name="checkAll" checked={isAllChecked} onChange={handleOnAllChecked} />
                            </th>
                            <th>URL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <th>
                                    <input name={`check-${index}`} type="checkbox" className="checkbox" checked={row.isChecked} onChange={(event) => handleOnCheck({ index, event })} />
                                </th>
                                <td>
                                    <div className="flex">
                                        {/* <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div> */}
                                        <input name="url" type="text" className="input input-bordered w-full max-w-xs" value={row.url} onChange={(event) => handleOnInputChange()} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>URL</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="grid grid-cols-4 justify-items-end mt-5 mr-5">
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className="btn mx-1">Swap</button>
                    <button className="btn mx-1">Preview</button>
                    <button className="btn mx-1 btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default CreateList;