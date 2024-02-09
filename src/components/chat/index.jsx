import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const API_KEY = "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"; 

function Chat() {
  const [messageOut, setMessageOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    amount: "",
    dues: "",
    interest: "",
  });
  
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    const newInterest = parseFloat(e.target.value);
    setData({ ...data, interest: newInterest });
  };
  
  const handleClear = () =>{
    setData({
      amount: "",
      dues: "",
      interest: "",
    });
    setMessageOut("")
  }
  
  const isDisabled = !(data.amount && data.dues && data.interest);
  
  // AI results are sometimes not accurate
  // los resultados de la IA a veces no son exactos
  async function callOpenAIAPI() {
    setLoading(true);
    console.log("Calling the OpenAI API");

    const messages = [
      {"role": "system", "content": `You are gpt-3.5-turbo. Analyze the following mathematical operation that I'm about to provide and compute the operation. I am a bank manager, and I want to provide the installment payment amount. Currently, we calculate the installment payment amount based on the principal amount, number of installments, and interest rates. For example: "(1000/12) + ((1000/12)*0.013) = $84.41". You are a mathematics specialist with over 20 years of experience. Provide me with the result of the operation as a calculator, where divisions are calculated first, followed by multiplications, then additions, and subtractions. Use a direct tone.`},
      {"role": "user", "content": `Using these data for the operation: "(${data.amount}/${data.dues})+((${data.amount}/${data.dues})*${data.interest})" = ?.`}
    ];

    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": messages,
      "temperature": 0,
      "max_tokens": 95,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) {
        throw new Error('Error in the Calling OpenAI API');
      }
      const responseData = await response.json();
      setMessageOut(responseData.choices[0].message.content);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="position-absolute top-0 p-5">
      <div>
        <h5>Know the value of your fee to pay</h5>
      </div>
      <div className='d-flex flex-column gap-1 mb-3'>

        <label htmlFor="amount">Amount $</label>
        <input type="number" id="amount" value={data.amount} onChange={handleInputChange} placeholder='$ Amount' className='rounded-3 border-0 ps-2'/>

        <label htmlFor="dues">Dues (months)</label>
        <select id="dues" value={data.dues} onChange={handleInputChange} className='rounded-3 border-0 ps-2'>
          <option value="">Select Dues</option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>

        <label htmlFor="interest">Type of interest</label>
        <select id="interest" value={data.interest} onChange={handleSelectChange} className='rounded-3 border-0 ps-2'>
          <option value="">Select type of interest</option>
          <option value="0.025">Free investment 2.5%</option>
          <option value="0.013">Housing 1.3%</option>
        </select>
      </div>
      <div className=''>
        <div className='d-flex justify-content-between'>
          <button className='btn btn-secondary' onClick={handleClear}>Clear</button>
          
          <button disabled={isDisabled} className='btn btn-success' onClick={callOpenAIAPI}>
            {loading ? (
              <CircularProgress className='text-light' style={{width:25, height:25}}/>
            ): (<>Get to know it</>)}</button>
        </div>
        {messageOut !== "" ?
            <h6 className='position-absolute bg-primary text-light border p-2 me-3' style={{top:"8%", left:"5%"}}>{messageOut}</h6>  
            :
            null
        }
        
      </div>
    </div>
  )
}

export default Chat;
