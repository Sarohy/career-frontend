// import { EmailIcon } from './Icon'
import mycareer from '../../../assets/mycareer.png';
import image from '../../../assets/image.png';
import emailIcon from '../../../assets/emailIcon.svg';

function ForgetPassword () {
    function handleClick (){
       alert('you clicked me')
    }
    return (
      <div className='container' class='h-[600px] w-[90%] flex items-center justify-center  sm:w-[100%]' >
        <div className='leftside' class='h-[560px] w-[45%]  flex flex-col  items-center justify-around sm:h-[600px] sm:w-[100%]' >
            <div className='mycareer' class='h-[100px] w-[90%] flex items-center justify-start ' >
                <img src={mycareer} class='h-auto w-[150px]' />
            </div>
            <div className='forget' class='h-[250px] w-[90%] flex flex-col items-center justify-around  sm:h-[300px]' >
              <h2 class='font-bold text-2xl sm:text-md' >Forget your Password?</h2>
              <p class='text-[#737373] mb-4 ' >Enter the email associated with your <br/>
                account and we'll send an email with <br/>
                instructions to reset your password.</p>
                <div className='input' class=' h-[40px] w-[250px] flex items-center justify-center rounded-md border-solid border-2 border-gray-400' >
                <img src={emailIcon} class='h-[18px]'/>
                <input type='text' name='text' placeholder='Email Address' class='h-[30px] w-[220px] '  />
                </div>
                <button onClick={handleClick} class='h-[40px] w-[250px] bg-[#0575E6] text-white rounded-md ' >Send Request</button>
            </div>
            <div class='h-[120px] w-[90%]  flex items-end sm:h-[100px]' >
                    <p class='text-[#8A8A8A] sm:text-[13px] ' >© 2023 My Career Guidance. All Rights Reserved</p>
                </div>
        </div>
        <div className='rightside' class=' bg-cover    rounded-md sm:hidden' >
         <img src={image} class='h-[560px] w-[100%]' />
        </div>
        
      </div>
    )
  }

export default ForgetPassword