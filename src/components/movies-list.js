import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieDataServices from '../services/movies';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const [ratings, setRatings] = useState(['All Ratings']);

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);
    const retrieveMovies = async () => {
        try {
            const response = await MovieDataServices.getAll();
            setMovies(response.data.movies);
        } catch (error) {
            throw error;
        }
    };

    const retrieveRatings = async () => {
        try {
            const response = await MovieDataServices.getRatings();
            setRatings(['All Ratings'].concat(response.data));
        } catch (error) {
            throw error;
        }
    };

    const find = async (query, by) => {
        try {
            const response = await MovieDataServices.find(query, by);
            setMovies(response.data.movies);
        } catch (error) {
            throw error;
        }
    };

    const findByTitle = () => {
        find(searchTitle, 'title');
    };
    const findByRating = () => {
        if (searchRating === 'All Ratings') {
            retrieveMovies();
        } else {
            find(searchRating, 'rated');
        }
    };

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search Title"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByTitle}>
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select" onChange={(e) => setSearchRating(e.target.value)}>
                                    {ratings.map((rating, index) => {
                                        return (
                                            <option key={index} value={rating}>
                                                {rating}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByRating}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {movies.map((movie, index) => {
                            return (
                                <Col key={index}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img src={`${movie.poster}/100px180`} />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>Rating: {movie.rated}</Card.Text>
                                            <Card.Text>{movie.plot}</Card.Text>
                                            <Link to={`${movie._id}`}>View Reviews</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default MoviesList;
