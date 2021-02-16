import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class  App extends Component {
    state = {
        showRandomChar: true
    }

    hideRandomChar = () => {
        this.setState({
            showRandomChar: !this.state.showRandomChar
        })
    }

    render() {
        const {showRandomChar} = this.state;

        return (
            <> 
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};