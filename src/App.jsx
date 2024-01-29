import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [posts, setPosts] = useState([])
    const postsPerPage = 6
    const firstPostOfPageIndex = (currentPage - 1) * postsPerPage


    const fetchData = () => {
        fetch(`https://dummyjson.com/posts`)
            .then(resp => resp.json())
            .then(data => {
                const pagesCount = (data.posts.length) / postsPerPage
                const pagesArr = []
                for (let i = 0; i < pagesCount; i++) {
                    pagesArr.push(i + 1)
                }
                setPages(pagesArr)
            })
    }

    const fetchDataByPage = (postsPerPage, firstPostOfPageIndex, cPage) => {
        fetch(`https://dummyjson.com/posts?limit=${postsPerPage}&skip=${firstPostOfPageIndex}`)
            .then(resp => resp.json())
            .then(data => {
                setPosts(data.posts)
                setCurrentPage(cPage)
            })
    }

    const changePage = (page) => {
        fetchDataByPage(postsPerPage, (page - 1) * postsPerPage, page)
    }


    useEffect(() => {
        fetchData(postsPerPage, firstPostOfPageIndex)
        fetchDataByPage(postsPerPage, firstPostOfPageIndex, currentPage)
    }, [])

    return (
        <div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <span>{post.id}. </span>
                        {post.title}</li>
                ))}
            </ul>
            <ul className="pagesBtns">
                <li>
                    <button onClick={()=>changePage(currentPage === 1 ? 1 : currentPage - 1)}>prev</button></li>
                {pages.map(page => (
                    <li key={page}>
                        <button style={page === currentPage ? {backgroundColor: "lightgrey"} : {}} onClick={()=>changePage(page)}>{page}</button>
                    </li>
                ))}
                <li>
                    <button onClick={()=>changePage(currentPage === pages.length ? pages.length : currentPage + 1)}>next</button></li>
            </ul>

        </div>
    )
}

export default App
