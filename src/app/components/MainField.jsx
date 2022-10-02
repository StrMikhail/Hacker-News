import React, { useEffect } from 'react';
import StoriesField from './StoriesField.jsx';
import { useSelector, useDispatch } from "react-redux";
import { fetchStoriesList, getLoadingStatus, getStories } from '../store/stories';
import Spiner from './Spiner';

const MainField = () => {
    const dispatch = useDispatch();
    const stories = useSelector(getStories())
    const isLoading = useSelector(getLoadingStatus())

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(fetchStoriesList())
            clearInterval(timer)
        }, [60000])
        return () => clearTimeout(timer);
    },[stories])

    useEffect(() => {
        if (stories.length === 0) {
            dispatch(fetchStoriesList())
        }
    }, [])
 
    return (
        <>
            <div 
                onClick={() => dispatch(fetchStoriesList())}
                className='absolute flex justify-center statick m-10 bot-1 h-20 w-40 bg-slate-400 p-5 text-white cursor-pointer'>
                    <span className='inline-bclok m-auto text-lg'>Refresh</span> 
            </div>
            <div className='container flex relative mt-10 h-[80%]'>
                    {isLoading
                        ? <Spiner />
                        :(
                            <div className=' bg-grey-100 grid gap-1 grid-cols-2'>
                                {stories.map((i) => <StoriesField key={i.id} story={i}/>)}
                            </div>
                         )
                        }
            </div>
        </>
    );
};

export default MainField;