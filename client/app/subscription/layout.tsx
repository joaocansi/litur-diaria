import { SubscriptionProvider } from "@/hooks/subscription";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SubscriptionLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();
    if (!session) {
        redirect('/');
    }

    return ( 
        <SubscriptionProvider session={session}>
            <div className="w-full h-screen grid grid-cols-2">
                <div className="col-span-1">
                    {children}
                </div>
                <div className="col-span-1">
                    <img src="/familia.webp" alt="jesus" className="w-full h-screen object-cover" />
                </div>
            </div>
        </SubscriptionProvider>
    )
}