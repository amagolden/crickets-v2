import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const QuestionForm = ({ handleAddQuestion }) => {

    const [value, setValue] = useState('');
    const [anon, setAnon] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddQuestion(value, anon);
        setValue('');
        setAnon(false);
    };

    return (
    <form onSubmit={handleSubmit}>
        <Row className="align-items-start">
            <Col className="my-1">
                <Form.Group className="mb-0">
                    <Form.Control 
                        type='text' 
                        id='question-id' 
                        name='question' 
                        onChange={event => setValue(event.target.value)} 
                        value={value} 
                        placeholder='Enter question' />
                    <div className="ml-3 d-flex align-items-center">
                    <Form.Check 
                        type='checkbox' 
                        id='anon-id' 
                        name='anon-check' 
                        onChange={event => setAnon(event.target.checked)} 
                        label='Anonymous'
                        checked={anon}  
                        inline />
                    </div>    
                </Form.Group>
            </Col>
            <Col xs="auto" className="mb-0 mt-1">
                <button 
                    className='form-button btn btn-success'
                    type='submit' 
                    value='Add Question' 
                    >Add
                </button>
            </Col>
        </Row>
    </form>
    );
}

export default QuestionForm;