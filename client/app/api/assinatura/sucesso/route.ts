import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession();
    if (!session || !session.user?.email)
        return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`, 303);

    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, 303);
}