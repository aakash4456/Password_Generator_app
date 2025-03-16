import { useState, useCallback, useEffect,useRef } from 'react'
import AnimatedCursor from './Components/Animator.jsx'
import './App.css'


function App() {
  
  const [passWord , setpassWord] = useState("")
  const [length , setLength] = useState(8)
  const [NumbersAllowed, setNUmbersAllowed] = useState(false)
  const [CharAllowed, setCharAllowed] = useState(false)
  const passWordref = useRef(null)

  let inputBox = document.getElementById('inputBox');


  const passwordGenarator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(NumbersAllowed){
      str += "0123456789"
    }
    if(CharAllowed){
      str += "!@#$%^&*?/~`"
    }
    for(let  i= 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setpassWord(pass)
  }, [length, NumbersAllowed, CharAllowed, setpassWord])
  
  useEffect(() => {
    passwordGenarator()
  }, [length ,NumbersAllowed, CharAllowed, passwordGenarator])

  function copyToClipboard(){
    passWordref.current?.select()
    passWordref.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(passWord);
  }

  // passwordGenarator();
  return (
    <>
    <AnimatedCursor />

    {/* #edf7fa #feb300 #fceed1*/}
      <div className='w-full h-full bg-[#ffffff] fixed bottom-0 flex justify-center'>
        <div className='w-[90%] h-[90%] bg-[#101357] fixed bottom-0 rounded-t-4xl flex justify-center items-center' >
          <div className='absolute top-[7rem] border-2 border-[#ff3a22] sm:w-[30rem] w-[80%] rounded-[5px] bg-[#c2dde6] flex flex-col items-center px-4 py-10 gap-4'>
            <p className='text-4xl font-semibold text-center text-[#0e0fed]'>PassWord Generator</p>
            <div className='mt-3 flex gap-5 flex-col sm:flex-row'>
              <input id='inputBox' 
              type='input'
              value={passWord}
              ref={passWordref}
              readOnly
              className='bg-white text-[#00303F] text-center rounded h-8 cursor-pointer font-medium'/>

              <button className=' bg-red-500 px-3 py-1 rounded-2xl text-amber-50 font-bold cursor-pointer drop-shadow-2xl hover:shadow-lg shadow-amber-100'
              onClick={copyToClipboard}>Copy</button>

              <button className=' bg-red-500 px-3 py-1 rounded-2xl text-amber-50 font-bold cursor-pointer drop-shadow-2xl hover:shadow-lg shadow-amber-100'
              onClick={passwordGenarator}>New</button>
            </div>
            <div className='mt-5 flex items-center gap-2 flex-col sm:flex-row'>
              <input 
                type="range"
                min={6}
                max={100}
                onChange={(e) => setLength(e.target.value)}
                id="baar"
              />
              <label className='font-bold'>Length: <span className='font-medium text-pink-950'>{length}</span></label>

              <div className='flex gap-2'>
                <input 
                  type='checkbox'
                  defaultChecked={NumbersAllowed}
                  onChange={() =>{
                    setNUmbersAllowed((prevvalue) => !prevvalue)
                  }}
                />
                <label>Numbers</label>
              </div>

              <div className='flex gap-2'>
                <input 
                  type='checkbox'
                  defaultChecked={CharAllowed}
                  onChange={() =>{
                    setCharAllowed((prevvalue) => !prevvalue)
                  }}
                />
                <label>Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
