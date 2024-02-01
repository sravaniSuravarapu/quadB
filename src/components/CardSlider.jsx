import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NoImage from '../assets/NoImage.png'
import { FaStar } from "react-icons/fa";
import './CardSlider.css'
function CardSlider() {
    const [items, setItems] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get('https://api.tvmaze.com/search/shows?q=all');
            setItems(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(items);
    return (
        <div className='card-slider'>
            {items.map((item) => (
                <Card key={item.show.id} >

                    {item.show.image === null ? <Card.Img variant="top" src={NoImage} style={{ width: '100%' }} /> : <Card.Img variant="top" src={item.show.image.medium} />}
                    <div style={{ background: 'black', color: 'white' }}>
                        <FaStar style={{ color: 'rgb(248, 68, 100)' }} />   rating :{item.show.rating.average !== null ? item.show.rating.average + " / 10" : 'null'}
                    </div>
                    <Card.Body>
                        <Card.Title style={{ color: "rgb(34, 34, 34)", fontSize: "30px", fontWeight: "500" }}>{item.show.name}</Card.Title>
                        <Card.Text >
                            <span style={{ color: "rgb(102, 102, 102)", fontFamily: "Roboto" }}>
                                {item.show.genres.map((genre, index) => <span>{genre}{index !== item.show.genres.length - 1 ? '/' : ''}</span>)}
                            </span>

                        </Card.Text>
                        <Button variant="primary">Click Here</Button>
                    </Card.Body>
                </Card >
            ))
            }
        </div>
    );
}

export default CardSlider;
