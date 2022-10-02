import React from 'react';

const Spiner = () => {
    return (
        <div className='spiner flex flex-col gap-4'>
            <div className='spiner__ring'></div>
            <div className='text-2xl text-slate-600'>Loading...</div>
        </div>
    );
};

export default Spiner;