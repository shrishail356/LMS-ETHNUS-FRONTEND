import React, { useRef, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import laptopImage from '../components/laptop.png';
import EnigmaLogo from '../components/14685508.jpg';
// import pxfuel from '../../public/pxfuel.jpg';
import image from '../components/img.jpg';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {  
    const navigate = useNavigate();

    const handleSignIn = () => {
      navigate('/login');
    };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    const formData = {
      firstname: form.current.firstname.value,
      lastname: form.current.lastname.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value,
    };
  
    emailjs
      .send('service_6iw3a5k', 'template_fwwqned', formData, '-HQ_08N7f1ml_-oOK')
      .then(
        (result) => {
          console.log('Message send');
          toast.success('Message sent successfully', { autoClose: 700 });
        },
        (error) => {
          console.log(error.text);
          toast.error('Failed to send message', { autoClose: 700 }); 
        }
      );
  };
  useEffect(() => {
    const inputs = document.querySelectorAll(".contact-input");

    inputs.forEach((ipt) => {
      ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus");
        ipt.parentNode.classList.add("not-empty");
      });
      ipt.addEventListener("blur", () => {
        if (ipt.value === "") {
          ipt.parentNode.classList.remove("not-empty");
        }
        ipt.parentNode.classList.remove("focus");
      });
    });
    return () => {
      inputs.forEach((ipt) => {
        ipt.removeEventListener("focus", () => {
          ipt.parentNode.classList.add("focus");
          ipt.parentNode.classList.add("not-empty");
        });
        ipt.removeEventListener("blur", () => {
          if (ipt.value === "") {
            ipt.parentNode.classList.remove("not-empty");
          }
          ipt.parentNode.classList.remove("focus");
        });
      });
    }
  }, []); 
  return (
    <div className="wrapper">
      <header id="Home" className="header">
        <div className="header-left">
          <img src={EnigmaLogo} height="60px" width="80px" alt="Logo"/>
          <h1>EnigmaEd</h1>
        </div>
        <div className="header-right">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>
        </div>
      </header>

      <main className="main">
        <h1>Welcome to the EnigmaEd Community</h1>

        <div className="content">
          <div>
            <p>Unlock the Secrets of Learning with EnigmaEd - Where Education Meets Mystery! At EnigmaEd, we believe in transforming education into an exciting journey of discovery.</p>
            <p>Sign up for EnigmaEd today and embark on a learning adventure like never before. Uncover the mysteries of education and unlock a world of possibilities.</p>
            <button className="btn" onClick={handleSignIn}>SIGN IN</button>
          </div>

          <div className="laptop">
            <img src={laptopImage} height="380px" width="550px" alt="Laptop" />
          </div>
        </div>
      </main>

      <section id="Contact" class="contact">
            <div class="container">
                <div class="left">
                    <div class="form-wrapper">
                        <div class="contact-heading">
                            <h1>Let's work together<span>.</span></h1>
                            <p class="text">Or reach us via: <a href="mailto:EnigmaEd@mail
                                .com">EnigmaEd@mail.com</a></p>
                        </div>

                        <form  ref={form} class="contact-form" onSubmit={sendEmail}>
                            <div class="input-wrap">
                                <input class="contact-input" autocomplete="off" name="firstname"
                                type="text" required/>
                                <label>First Name</label>
                                <i class="icon fa-solid fa-address-card"></i>
                            </div>

                            <div class="input-wrap">
                                <input class="contact-input" autocomplete="off" name="lastname"
                                type="text" required/>
                                <label>Last Name</label>
                                <i class="icon fa-solid fa-address-card"></i>
                            </div>

                            <div class="input-wrap w-100">
                                <input class="contact-input" autocomplete="off" name="user_email"
                                type="email" required/>
                                <label>Email</label>
                                <i class="icon fa-solid fa-envelope"></i>
                            </div>

                            <div class="input-wrap textarea w-100">
                                <textarea name="message" autocomplete="off" 
                                class="contact-input" required></textarea>
                                <label>Message</label>
                                <i class="icon fa-solid fa-inbox"></i>
                            </div>

                            <div class="contact-buttons">
                                <button class="button upload">
                                    <span>
                                        <i class="fa-solid fa-paperclip"></i>
                                        Add attachment
                                    </span>
                                    <input type="file" name="attachment"/>
                                </button>
                                <button class="button upload">
                                <span>
                                      <i class="fa-solid fa-paperclip"></i>
                                        Send message
                                    </span>
                                  <input type="submit" value="Send message" class="button"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="right">
                    <div class="image-wrapper">
                        <img src={image} class="img"/>
                        <div class="wave-wrap">
                            <svg class="wave" viewBox="0 0 783 1536" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="wave" d="M236.705 1356.18C200.542 1483.72 64.5004 1528.54 1 1535V1H770.538C793.858 63.1213 797.23 196.197 624.165 231.531C407.833 275.698 274.374 331.715 450.884 568.709C627.393 805.704 510.079 815.399 347.561 939.282C185.043 1063.17 281.908 1196.74 236.705 1356.18Z"/>
                                </svg>                            
                        </div>
                        <svg class="dashed-wave" viewBox="0 0 345 877" fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path id="dashed-wave" d="M0.5 876C25.6667 836.167 73.2 739.8 62 
                            673C48 589.5 35.5 499.5 125.5 462C215.5 424.5 150 365 87 333.5C24 
                            302 44 237.5 125.5 213.5C207 189.5 307 138.5 246 87C185 35.5 297 1 344.5 1"/>
                        </svg>                            
                    </div>
                </div>
            </div>
        </section>

      {/* footer */}
      <div className="footer">
        <div class="uppercontent">
          <div className="footerhead">
            EnigmaEd
          </div>

          <div class="leftportion">
            <div class="lpm">
              <p>Menu</p>
              <ul>
                <li><a href="#Home">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#Contact">Contact</a></li>
              </ul>
            </div>
            
            <div class="lps">
              <p>Services</p>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
          </div>

          <div class="rightportion">
            <p>Get in Touch</p>
            <a href="mailto:EnigmaEd@mail.com">Email: EnigmaEd@mail.com</a>
          </div>
        </div>
        

        <div class="lowercontent">
          Copyright © EnigmaEd Technologies Pvt. Limited | All Right Reserved
          </div>
      </div>
    </div>
  );
};

export default Homepage;