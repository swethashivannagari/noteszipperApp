import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../components/MainScreen.css'
const MainScreen = ({ title, children }) => {
    return (
        <div className='mainback'>
            <Container>
                <Row>
                    <div className='page'>
                        {title && (
                            <>
                                <h1 className='heading'>{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default MainScreen;
