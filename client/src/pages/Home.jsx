import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();
  const { username } = useAuth();
 
//console.log(token)
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null);
  useEffect(() => {
    // Use a try-catch block to handle errors
    if(username){
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/test/alltest');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setQuestions(data.data);
          console.log(data)
          setLoading(false); // Set loading to false
        } catch (error) {
          setError(error.message);
          setLoading(false); // Set loading to false
        }
      };
      fetchData();
    }else{
      console.error(error);
      setLoading(false);
    }
    

    
  }, [username]);
  const handleTakeTest = (testId) => {
    navigate(`/test/${testId}`);
  };
  const handleDeleteTest = async (testId) => {
    if(username){
      let token= username.token
      try {
        const response = await fetch(`http://localhost:5000/test/delete/${testId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`, // Add your authentication token
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        // Remove the deleted test from the questions state
        setQuestions(questions.filter((question) => question._id !== testId));
      } catch (error) {
        console.error(error);
      }
    }

    
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleClick=()=>{
    navigate("/createTest")
  }
  
  return (
    <>
    <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      {username && username.isAdmin==='admin' && <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">hello Admin{username.admin.email}</h2>}
      {username && username.isUser==='user' && <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">hello USER{username.user.email}</h2>}
      {username && username.isUser==='user'?(<div className="p-4 lg:w-1/3">
      {questions.map((question) => (
        <div key={question._id} className="container px-5 py-24 mx-auto">
          <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {question.organizer}
            </h2>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
              {question.title}
            </h1>
            <p className="leading-relaxed mb-3">{question.description}</p>
            <button key={question._id}
              onClick={() => handleTakeTest(question._id)}
              className="text-indigo-500 inline-flex items-center"
            >
              Take test
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>):(<div className="p-4 lg:w-1/3">
      {questions.map((question) => (
        <div key={question._id} className=" ">
          <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative mb-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {question.organizer}
            </h2>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
              {question.title}
            </h1>
            <p className="leading-relaxed mb-3">{question.description}</p>
            <button key={question._id}
              onClick={() => handleDeleteTest(question._id)}
              className="text-red-500 inline-flex items-center"
            >
              Delete Test
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
      <button onClick={handleClick} class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Test</button>
    </div>)}
      
    
    </div>
  </div>
</section>
    </>
  )
}

export default Home