import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
const Member = () => {
    return (
    <div>
        Member
    </div>
    );
};

export default Member;
export const getServerSideProps = withPageAuthRequired();