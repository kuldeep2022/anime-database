import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export default function AnimeItem() {
  const { id } = useParams();
  console.log(id);
  //state
  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);

  //destructure anime
  const {
    title_english,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
    
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
    const data = await response.json();
    setCharacters(data.data);
    console.log('Data',data.data);
    

  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <AnimeItemStyled>
      <h1>
      {title_english}
      </h1>
        <div className="details">
            <div className="detail">
                <div className="image">
                    <img src={images?.jpg.large_image_url} alt="" />
                </div>
                <div className="anime-details">
                    <p><span> Aired:</span><span>{aired?.string}</span></p>
                    <p><span> Rating:</span><span>{rating}</span></p>
                    <p><span> Rank:</span><span>{rank}</span></p>
                    <p><span> Score:</span><span>{score}</span></p>
                    <p><span> Score By:</span><span>{scored_by}</span></p>
                    <p><span> Popularity:</span><span>{popularity}</span></p>
                    <p><span> Status:</span><span>{status}</span></p>
                    <p><span> Source:</span><span>{source}</span></p>
                    <p><span> Season:</span><span>{season}</span></p>
                    <p><span> Duration:</span><span>{duration}</span></p>
                </div>
            </div>
            <p className="description">
                {showMore ? synopsis : synopsis?.substring(0,450) + '...'}
                <button onClick={() => {
                    setShowMore(!showMore);
                }}>{showMore ? 'Show Less' : 'Read More'}</button>
            </p>
        </div>
        <h3 className="title">
            Trailer
        </h3>
        <div className="trailer-con">
            {trailer?.embed_url &&
            <iframe 
                src={trailer?.embed_url} 
                title={title_english} 
                width="800"
                height="450"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            }
        </div>
        <h3 className="title">Characters</h3>
        <div className="characters">
            {characters?.map((char,index) =>{
                const  {role} = char;
                const {images,name,mal_id} = char.character;
                return <Link to={`/character/${mal_id}`} key={index}>
                    <div className="character">
                         <img src={images?.jpg.image_url} alt="" />
                         <h4>{name}</h4>
                         <p>{role}</p>
                    </div>
                </Link>

            })}
        </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor:pointer;
        background: linear-gradient( to right, #a855f7, #27ae60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform: skew(-3deg);
        }
    }
    .title{
        display: inline-block;
        font-size: 2rem;
        margin: 3rem 0;
        cursor: pointer;
        background: linear-gradient( to right, #a855f7, #27ae60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        
    }
    .description{
        margin-top:2rem;
        color:#6c7983;
        line-height:1.7rem;
        button{
            background-color:transparent;
            border:none;
            outline:none;
            cursor:pointer;
            font-size:1.2rem;
            color:#27ae60;
            font-weight:600;
        }
    }

    .trailer-con{
        display:flex;
        justify-content: center;
        align-items: center;
        iframe{
            outline:none;
            border: 5px solid #e5e7eb;
            padding: 1.5rem;
            border-radius:10px;
            background-color: #ffffff;
        }
    }

    .details{
        background-color:#fff;
        padding:2rem;
        border-radius: 20px;
        border: 5px solid #e5e7eb;
        .detail{
            display:grid;
            grid-template-columns: repeat(2,1fr);
            img{
                border-radius:7px;
            }
        }
    
        .anime-details{
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            p{
                display:flex;
                gap:1rem;
            }
            p span:first-child{
                font-weight: 600;
                color:#6c7983;
            }
        }
    }
    .characters{
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-gap:2rem;
        background-color:#fff;
        padding:2rem;
        border-radius:20px;
        border: 5px solid #e5e7eb;
        .character{
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color:#ededed;
            transition: all .4s ease-in-out;
            img{
                width:100%;

            }
            h4{
                padding: .5rem 0;
            }
            p{
                color:#27ae60;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
    }


`;
