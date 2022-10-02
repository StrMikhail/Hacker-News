import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchStoryData, getLoadingDataStatus, getStoryData } from '../store/stories';
import Comment from './Comment';
import { mapTime } from '../utils/mapTime';
import Spiner from './Spiner';

const Story = () => {
    const dispatch = useDispatch()
    const { storyId } = useParams()
    
    let data = useSelector(getStoryData())
    const isLoading = useSelector(getLoadingDataStatus())
    
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(fetchStoryData(storyId))
            clearInterval(timer)
        }, [60000])
        return () => clearTimeout(timer);
    },[data])

    useEffect(() => {
        dispatch(fetchStoryData(storyId))
    }, [])
    
    return (
        <>
            <div className=' absolute flex flex-col'>
                <Link 
                    className='flex justify-center h-20 w-40 mt-10 statick m-10 bot-1 bg-slate-400 p-5 text-white hover:opacity-90'
                    to={`/`}> 
                    <span className='inline-bclok m-auto text-lg'>Back to stories </span>
                </Link>
                <div 
                    onClick={() => {
                        dispatch(fetchStoryData(storyId))}}
                    className='absolute flex justify-center statick m-10 top-[60%] h-20 w-40 bg-slate-400 p-5 text-white cursor-pointer hover:opacity-90'>
                        <span className='inline-bclok m-auto text-lg'>Refresh</span> 
                </div>
            </div>

            <div className='container h-[80%]'>
                <div className='my-10 h-full '>
                    {isLoading 
                        ? <Spiner/>
                        : (<>
                            <div className='flex justify-between p-10 bg-slate-200'>
                                <span className='text-3xl'>{data.title}</span>
                                <button 
                                    className='text-slate-400'
                                    onClick={() => window.open(data.url, "_blank")}>
                                        Read the story...
                                </button>
                            </div>
                            <div className='bg-slate-100 grid grid-cols-4 p-5'>
                                <div className='text-center text-slate-400'>Rating: <span className='text-2xl text-black'>{data.score}</span> </div>
                                <div className='text-center text-slate-400'> By: <span className='text-2xl text-black'>{data.by}</span> </div>
                                <div className='text-center text-slate-400'> Date: <span className='text-2xl text-black'>{ mapTime(data.time)}</span> </div>
                                <div className='text-center text-slate-400'> Comments:<span className='text-2xl text-black'> {data["kids"] !== undefined ? data.kids.length : 0}</span></div>
                            </div>
                                {data.text? <div className='p-5'>{data.text}</div> : null }
                            
                            {data.kids ? 
                                <div className='comments bg-white pt-5'>
                                {data.kids.map(i => <Comment key={i} comment={i}/>)}
                            </div> 
                            : null }
                            </>
                        )
                    }
                </div>
            </div>
        </>

    );
};

export default Story;