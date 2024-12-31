import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DashNav from '@/components/dashboard/DashNav';
import CreateChat from '@/components/chatGroup/CreateChat';

const dashboard = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);
    return (
        <div>
            <DashNav
                name={session?.user?.name!}
                image={session?.user?.image ?? undefined}
            />
            <div className="container">
                <div className="mt-6 text-end">
                    <CreateChat user={session?.user!} />
                </div>
            </div>
        </div>
    )
}

export default dashboard
