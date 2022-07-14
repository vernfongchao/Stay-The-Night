import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

import './SearchBar.css'



const SearchPage = () => {
    const questions = useSelector((state) => state.questionState?.questions)
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const questionsArr = Object.values(questions)

    const searchArr = questionsArr.filter(({ title, content }) => {
        return title.toLowerCase().includes(location.state.detail.toLowerCase())
            || content.toLowerCase().includes(location.state.detail.toLowerCase())
    })


    return (
        <div className='search-page-container'>

        </div>
    )
}

export default SearchPage