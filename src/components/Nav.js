import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const [show,setShow] = useState(false)
    const [searchValue,setSearchValue] = useState("")

    const navigate = useNavigate();
    
    useEffect(() => {
        window.addEventListener("scroll",() => {
            if(window.scrollY > 50){
                setShow(true)
            }else{
                setShow(false)
            }
        })
        return () => {
            window.removeEventListener("scroll",()=>{});
        };
    },[])

    const handleChange = (e) => {
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    }

  return (
    <nav className={`nav ${show && 'nav_black'}`}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png' alt='netflix-logo' className='nav_logo' onClick={()=> window.location.reload}/>
        <input value={searchValue} onChange={handleChange} className='nav__input' type="text" placeholder='영화를 검색해 주세요'/>
        <img 
            alt='User logged'
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg'
            className='nav_avatar'
        />
    </nav>
  )
}

export default Nav
