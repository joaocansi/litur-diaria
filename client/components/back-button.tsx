'use client';

import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export const BackButton = () => {
    const searchParams = useSearchParams();
    const referrer = searchParams.get('from') || '';
    const returnLink = referrer === 'dashboard' ? '/dashboard' : '/';

    return (
        <Link href={returnLink}>
            <FaArrowLeft size={24} />
        </Link>
    )
}