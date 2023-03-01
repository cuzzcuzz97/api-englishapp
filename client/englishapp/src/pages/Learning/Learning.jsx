import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './learning.css';
import { useParams } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';

const Learning = () => {
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollRef = useRef(0);
    const [cards,setCards] = useState([]);
    const { id } = useParams();
    
    const { speak } = useSpeechSynthesis();
    
    const handleOnClickSpeak = (text) => {
        speak({text:text})
    }

    const handleScroll = (scrollOffset) => {
      scrollRef.current.scrollLeft += scrollOffset;
      setScrollLeft(scrollRef.current.scrollLeft);
    };

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        const getVocab = async (id) => {
            try {
              const response = await fetch(`http://localhost:5000/app/vocab/${id}`);
              const jsonData = await response.json();
              setCards(jsonData);
            } catch (err) {
              console.log(err)
            }
          }
        getVocab(id);
      },[])

  return (
      <Layout>
        <div className='container d-flex flex-column align-items-center justify-content-center'>
            <div className='title m-5'>Learning Here</div>
            <div className='d-flex flex-row align-items-center justify-content-center'
            style={{width: '100%' }}
            >
            <button
            className="btn btn-secondary no-select"
            disabled={scrollLeft === 0}

            onClick={() => {
                handleScroll(-scrollRef.current.offsetWidth)
                setIsFlipped(false)
            }}
          >
            {"<"}
          </button>
            <div className="card-group d-flex flex-row flex-nowrap overflow-scroll"
             
             ref={scrollRef}
             > {cards.map((card,index) => (
                <>
                <div className='card text-center' style={{flex: "0 0 100%", width: '500px', height: "200px",padding: "10px" }} key={index+=1}>
                    <div className={`card-body flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front d-flex align-items-center justify-content-center">
                                <h2 className='no-select'>{card.name}</h2>
                            </div>
                            <div className="flip-card-back d-flex align-items-center justify-content-center">
                                <h2 className='no-select'>{card.meaning}</h2>
                            </div>
                        </div>
                    </div>
                <p onClick={() => {
                    handleOnClickSpeak(card.name)
                }
                    }> SPEAK </p>
                </div>
                </>
             ))}


            </div>
            <button
            className="btn btn-secondary no-select"
            disabled={scrollLeft === scrollRef.current.scrollWidth - scrollRef.current.offsetWidth}
            onClick={() => {
                setIsFlipped(false)
                handleScroll(scrollRef.current.offsetWidth)
            }
                
            }
          >
            {">"}
          </button>
          </div>
        </div>
    </Layout>
  )
}

export default Learning