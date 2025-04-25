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
            <div className="w-full h-screen relative max-lg:grid-cols-1">
                <div className="w-1/2 max-lg:w-full min-h-screen">
                    {children}
                </div>
                <div className="w-1/2 fixed right-0 top-0 max-lg:hidden">
                    <img src="/familia.webp" alt="jesus" className="w-full h-screen object-cover" />
                </div>
            </div>
        </SubscriptionProvider>
    )
}