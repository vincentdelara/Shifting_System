import React, { useState } from 'react';
import logo from './tsu.png';
import './create-acc/createacc.css';



function App() {

  const [selects, setSelects] = useState();

	return (
    <div class = "contain">
      <div class = "create-container">
      <div class="image-container">
					<img src={logo} alt="" width="650px" />
				</div>
        <div class = "input-form">
          <strong>Create Account</strong>

          <form>
             <div class = "input-container">
          <input type="text" 
          class="input-design"
           placeholder="First Name"/>

           <div class = "row">
          <div class = "col">
          <input type="text"
          class="input-design" 
          placeholder="Middle Name"/>
              </div>
            <div class = "col">
          <input type="text"
          class="input-design" 
          placeholder="Last Name"/>
            </div>
            </div>

          <input type="text"
          class="input-design" 
          placeholder="Username"/>

          <input type="text" 
          class="input-design"
          placeholder="Email"/>

          <input type="password" 
          class="input-design"
           placeholder="Password"/>

          <input type="password"
          class="input-design" 
          placeholder="Retype Password"/>
            </div>
            <select>
                          <button type="button">
                            Business Unit
                          </button>
                          <ul class="dropdown-menu">
                           <option><li><a class="dropdown-item" href="#">Dev</a></li></option>
                           <option><li><a class="dropdown-item" href="#">QA</a></li></option>
                           <option><li><a class="dropdown-item" href="#">BA</a></li></option>
                          </ul>
                          <div class="spce"></div>
                          </select>
                          <select>
                          <button class="btn-ch" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                            Position
                          </button>
                          <ul class="dropdown-menu">
                          <option><li><a class="dropdown-item" href="#">JES</a></li></option>
                          <option><li><a class="dropdown-item" href="#">SEM</a></li></option>
                          <option><li><a class="dropdown-item" href="#">SDE</a></li></option>
                          </ul>
                        </select>
          </form>
          </div>
                
                <div class="forgot">
                <div class="form-check">
                          <input class="form-check-input" type="checkbox" value=""/>
                          <label class="form-check-label" for="tncp">
                          By signing up, you agree to our  
                          </label>
                          <a id="tpp" href="#">Terms & Privacy Policy</a>
                  </div>
      
                          <button class="btn" type="button">Sign Up</button>
                          <div class = "acc"><p>Already have an account? <a href="#"> Sign in now</a></p></div>
                </div>
                </div>
        </div>
  );

  }
export default App;
