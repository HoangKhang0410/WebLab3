import React, { useEffect, useState } from 'react';
import MovieDataServices from '../services/movies';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';

const Movie = ({ user }) => {
    const params = useParams();
    const [movie, setMovie] = useState({
        id: null,
        title: '',
        rated: '',
        reviews: [],
    });

    const getMovie = async (id) => {
        try {
            const response = await MovieDataServices.get(id);
            setMovie(response.data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getMovie(params.id);
    }, [params.id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + '/100px250'} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {user && <Link to="review">Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br />
                        <h2>Reviews</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;
