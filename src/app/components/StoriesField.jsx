import React from 'react';
import { Link } from 'react-router-dom';
import { mapTime } from '../utils/mapTime';

const StoriesField = ({story}) => {
    return (
        <div className='bg-slate-200 mb-2 min-h-[170px] rounded-lg cursor-pointer opacity-70 hover:opacity-100 scale-95 hover:scale-100'>
            <Link 
                to={`/${story.id}`}
                className='relative h-full'>
                <div className='bg-slate-300 h-1/2 text-2xl font-bold  text-center p-2 border-b-2 border-slate-400'>
                    <span className='inline-block align-baseline'>{story.title}</span>
                </div>
                <div className='flex justify-between h-1/2'>
                    <div className='top-8 px-4 relative text-slate-500 gap-2'>
                        <div className=''>By: <b>{story.by}</b></div>
                        <div className='text-0'>{ mapTime(story.time)}</div>
                    </div>
                    <div className='flex flex-col px-5 '>
                        <span className='text-[32px] px-2'>{story.score}</span>
                        <span>score</span>
                    </div>
                </div>  
            </Link> 
        </div>
    );
};

export default StoriesField;