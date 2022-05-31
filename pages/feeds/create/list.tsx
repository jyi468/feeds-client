import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const containerSelector = 'ul';

// We must use a dynamic import here because the draggable does not work with SSR
// It must only be available client side, due to its usage of the window object.
const SortableDynamic = dynamic(() => import('@shopify/draggable/lib/sortable').then(
    (mod: any) => {
        const Sortable = mod.default;
        const containers = document.querySelectorAll(containerSelector);
        if (containers.length === 0) {
            return false;
        }
        const sortable = new Sortable(containers, {
            draggable: 'li',
        });
    }
), { ssr: false });

const CreateList = () => {
    return (
        <ul>
            <SortableDynamic></SortableDynamic>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    );
}

export default CreateList;