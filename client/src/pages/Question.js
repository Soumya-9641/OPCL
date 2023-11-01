import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Ques from '../components/Ques';
const Question = () => {
  const navigate= useNavigate()
  const { username } = useAuth();
  console.log(username)
  let token = username.token;
  console.log(token)
  const { testId } = useParams(); 
  console.log("here")
  console.log(testId)// Get the testId from the URL
  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/test/getOne/${testId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
       
        setQuestions(data.questions);
        console.log(data.title)
        setLoading(false);
        setTotal(data.title)
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    console.log(total)

    fetchTestDetails();
  }, []);
  const handleResponseChange = (questionId, answerIndex) => {
    // Update user responses as the user selects an answer
    const newResponses = [...userResponses];
    const index = newResponses.findIndex((response) => response.questionId === questionId);
    if (index !== -1) {
      newResponses[index].answerIndex = answerIndex;
    } else {
      newResponses.push({ questionId, answerIndex });
    }
    setUserResponses(newResponses);
    //console.log(userResponses)
  };
  console.log(userResponses)
  const handleSubmit = async () => {
    // Construct a payload with user responses and send it to the backend
    const payload = {
      testId:total,
      candidateId: username.user.email,
      responses: userResponses,
    };

    try {
     
      const response = await fetch('http://localhost:5000/response/taketest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response from the backend as needed
      const data = await response.json();
      console.log('Response from the backend:', data);
      navigate("/userdashboard")
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className='text-gray-600 body-font'>
      <h2>Test Questions for Test {testId}</h2>
      {questions.map((question, index) => (
        <div key={question._id}>
          <Ques key={index} question={question} questionId={question._id} index={index}  onAnswerChange={handleResponseChange} />
        </div>
      ))}
      <button  onClick={handleSubmit} class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
      {/* Add UI for answering questions and handling user responses */}
    </div>
  );
};

export default Question;