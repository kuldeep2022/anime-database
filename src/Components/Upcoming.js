import React from 'react'
import { useGlobalContext } from '../context/global';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default function Upcoming({rendered}) {
    const {upcomingAnime,isSearch,searchResults} = useGlobalContext()

    const conditionalRender = () => {
        if(!isSearch && rendered == 'upcoming') {
            return upcomingAnime.map((anime) => {
              return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} />
                </Link>
            })
        }
        else{
          return  searchResults.length > 0 && searchResults.map((anime) => {
            return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} />
              </Link>
          }) 
        }
    }

  return (
    <PopularStyle>
        <div className="upcoming-anime">
          {conditionalRender()}
        </div>
    </PopularStyle>
  )
}

const PopularStyle = styled.div`
  display:flex;
  .upcoming-anime{
    margin-bottom:2rem;
    margin-top:2rem;
    padding-left:5rem;
    padding-top :2rem;
    padding-right:0;
    width:100%;
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
    grid-gap: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    a{
      height:500px;
      border-radius: 7px;
      border: 5px solid #e5e7eb;
    }
    a img{
      width:100%;
      height:100%;
      object-fit:cover;
      border-radius:5px;
    }
  }
`;
