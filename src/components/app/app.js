import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage/';
import BooksPage from '../pages/booksPage/';
import BooksItem from '../pages/booksItem';
import HousesPage from '../pages/housesPage/';
import gotService from '../../sevices/gotService';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import ErrorPage from '../errorPage';
export default class  App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    hideRandomChar = () => {
        this.setState({
            showRandomChar: !this.state.showRandomChar
        })
    }

    render() {
        const {showRandomChar} = this.state;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {showRandomChar ? <RandomChar/> : null}
                                <button 
                                    className='btn btn-info mb-3 text-uppercase'
                                    onClick={this.hideRandomChar}>
                                        Hide/Show block
                                </button>
                            </Col>
                        </Row>
                        <Switch>
                            <Route path="/"  exact/>
                            <Route path="/characters" exact component={CharacterPage} />
                            <Route path="/houses" exact component={HousesPage} />
                            <Route path="/books" exact component={BooksPage} />
                            <Route path="/books/:id" exact component={
                                ({match}) => {
                                    const {id} = match.params;
                                    return (
                                        <BooksItem bookId={id}/>
                                    )
                                }
                            }/>
                            <Route path="*" component={ErrorPage}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};