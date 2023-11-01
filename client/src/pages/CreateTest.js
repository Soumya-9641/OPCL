import React,{useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const CreateTest = () => {
  const navigate=useNavigate();
    const {username} = useAuth();
    const [title, setTitle] = useState('Sample2');
    const [questions, setQuestions] = useState([
        {
          text: '',
          options: ['', '', '', ''],
          correctAnswerIndex: 0,
        },
      ]);
      const [organizer, setOrganizer] = useState('admin@gmail.com');
      const [timeLimit, setTimeLimit] = useState(1800);
      const handleQuestionChange = (e, questionIndex,optionIndex) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex][name] = value;
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
      };
      const handleCorrectAnswerChange = (questionIndex, correctAnswerIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswerIndex = correctAnswerIndex;
        setQuestions(updatedQuestions);
      };
      const handleAddQuestion = () => {
        // Add a new question with default values to the list of questions
        const newQuestion = {
          text: '',
          options: ['', '', '', ''],
          correctAnswerIndex: 0,
        };
        setQuestions([...questions, newQuestion]);
      };
      const handleClick=async()=>{
        const dataToSend = {
          title,
          questions,
          organizer,
          timeLimit,
        };
       // console.log(dataToSend)
        if(username){
          let token= username.token
          try {

            const response = await fetch('http://localhost:5000/test/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
              body: JSON.stringify(dataToSend),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // Handle the response from the backend as needed
            const responseData = await response.json();
            console.log(responseData)
            console.log('Response from the backend:', responseData);
            navigate("/")
          } catch (error) {
            console.error(error);
          }
        }
       
      }

  return (
    <section class="text-gray-600 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Test Creation</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
    </div>
    <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Title</label>
            <input value={title}
              onChange={(e) => setTitle(e.target.value)} type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
    {/* <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Option 1</label>
            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Option 2</label>
            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Option 3</label>
            <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Option 4</label>
            <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">Question</label>
            <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        
      
      </div>
    </div> */}
     {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="w-full">
            <div className="relative">
              <label className="leading-7 text-sm text-gray-600">Question {questionIndex + 1}</label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(e, questionIndex)}
                name="text"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus-ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <label className="leading-7 text-sm text-gray-600">
                 Correct Answer index
                </label>
         <input
                  type="text"
                  value={question.correctAnswerIndex}
                  onChange={(e) => handleCorrectAnswerChange(questionIndex, parseInt(e.target.value, 10))}
                  
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  Option {optionIndex + 1}
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleQuestionChange(e, questionIndex,optionIndex)}
                  name={`options[${optionIndex}]`}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            ))}
          </div>
          
        ))}
         
         <button
            onClick={handleAddQuestion}
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Add Question
          </button>
    {/* <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <h1 className='leading-7 text-sm text-gray-600'>
                Question 2
        </h1>
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Option 1</label>
            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Option 2</label>
            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Option 3</label>
            <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Option 4</label>
            <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">Question</label>
            <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        </div>
      
      </div>
    </div> */}
  </div>
  <div class="p-2 w-full">
          <button onClick={handleClick} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit Test</button>
        </div>
</section>
  )
}

export default CreateTest