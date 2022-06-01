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
        const sortable = new Sortable(containers, {
            draggable: 'tr',
            handle: '.checkbox',
        });
    }
), { ssr: false });

type CreateListProps = {
    data?: any[];
}

interface ListRow {
    isChecked: boolean,
    url: string,
}

const CreateList = ({data} : CreateListProps) => {
    const mockRows: ListRow[] = [
        {isChecked: true, url: 'https://www.google.com'},
        {isChecked: false, url: 'https://www.yahoo.com'},
        {isChecked: true, url: 'https://www.facebook.com'},
    ]
    data = mockRows;
    const [rows, setRows] = useState(data ?? []);

    const handleOnCheck = (event: any) => {

    };

    const handleOnInputChange = ({row, index, event}: any) => {
        const oldRows = rows;
        const oldRow = oldRows[index];
        const newRow = {...oldRow, [event.target.name]: event.target.value};
        oldRows[index] = newRow;
        setRows(oldRows);
    };
    return (
        <>
            <SortableDynamic></SortableDynamic>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>URL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <th>
                                    <label>
                                        <input name="isChecked" type="checkbox" className="checkbox" checked={row.isChecked} onChange={handleOnCheck}/>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex">
                                        {/* <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div> */}
                                        <input name="url" type="text" className="input input-bordered w-full max-w-xs" value={row.url} onChange={(event) => handleOnInputChange({row, index, event})}/>
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
        </>
    );
}

export default CreateList;