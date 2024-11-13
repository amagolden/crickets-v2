//import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { BsHandThumbsUpFill, BsFillHandThumbsDownFill } from "react-icons/bs";


const QuestionCard = ({ id, question, votes, handleUpVote, handleDownVote, submitter, isAnon }) => {
    
    //const [value, setValue] = useState(question);
    
    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column align-items-start">
                        <Card.Text className="mb-0">
                            {question}
                        </Card.Text>
                        <small className="mt-2 small-text">
                            {isAnon ? 'Submitted by: Anonymous' : `Submitted by: ${submitter}`}
                        </small>
                    </div>
                <div className="vote-buttons">
                    <div className="d-flex mb-2">
                        <button onClick={() => handleUpVote(id)}><BsHandThumbsUpFill /></button>
                        <button onClick={() => handleDownVote(id)}><BsFillHandThumbsDownFill /></button>
                    </div>
                    <small className='mt-2 small-text'>Votes: {votes}</small>
                </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default QuestionCard;