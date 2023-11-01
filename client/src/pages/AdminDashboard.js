import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    const navigate= useNavigate()
    const { username } = useAuth();
    const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (username) {
      
    // Make a request to the backend to fetch all test results
    const fetchTestResults = async () => {
        try {
          const response = await fetch('http://localhost:5000/response/userdashboard');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
    
          // Filter data to show only the results for the currently logged-in user
          //const userTestResults = data.filter((result) => result.candidate === username.user.email);
    
          setTestResults(data);
          console.log(data)
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
    
      fetchTestResults();}else {
        setLoading(false);
      }
  }, [username]);
  const handleClick=()=>{
            navigate("/login")
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>

   
    {username  ? ( <div class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">USERNAME {username.admin.username}</h2>
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">List Of All Test Score</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Consistency is the key of success.</p>
      </div>
      {testResults.map((result,index)=>(
         <div key={index} class="flex flex-wrap">
         <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
         <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">USER :{result.candidate}</h2>
           <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">TestNAme :{result.test}</h2>
           <p class="leading-relaxed text-base mb-4">SCORE :{result.score}</p>
           
         </div>
        
         
        
       </div>
      ))

}
    </div>
  </div>):(
        <div>
            <button onClick={handleClick} class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Please LOgin</button>
        </div>
  )}
    </div>
  )
}

export default AdminDashboard