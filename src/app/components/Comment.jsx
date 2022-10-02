import React, { useEffect, useState } from 'react';
import newsStoriesService from '../services/stories';
import { mapTime } from '../utils/mapTime';

const Comment = ({comment}) => {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        setData(getComment(comment))
        setLoading(false)
    }, [])

    const getComment = async (id) => {
        try {
            const { content } = await newsStoriesService.getStory(id)
            setData(content)
            return await content
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
        {isLoading ? null : 
            
        <div className='my-2 border-2'>
            <div className='grid grid-cols-3 p-3 bg-slate-200'>
                <div className='col-span-1 '>By: {data.by}</div>
                {data.kids ? <div className='text-center'>Comments: {data.kids.length}</div>: null}
                <div className={(data.kids? `col-span-1` : `col-span-2`)+ " text-right"}>{ mapTime(data.time)}</div>
            </div>
            <div className='relative p-4'>
                <p>{data.text}</p>
                {data.kids
                    ? <span 
                        onClick={() => setOpen(!open)} 
                        className='absolute right-1 bottom-0 text-4xl cursor-pointer'>
                            {!open ? '+' : '-'}
                     </span>
                    : null}
            </div>
            {open
                ? <div className='py-5 pl-10'>
                    {data.kids.map(i =><Comment key={i} comment={i}/>)}
                </div>
                : null }
        </div>
            }
            </>
    );
};

export default Comment;