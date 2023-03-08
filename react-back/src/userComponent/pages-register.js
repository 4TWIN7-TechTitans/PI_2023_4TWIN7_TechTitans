import React from 'react';
import Header from './header';
function Signup()  {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const last_name = form.last_name.value;
        const first_name = form.first_name.value;
        const gender = form.gender.value;
        const role = form.role.value;
        const date_of_birth = form.date_of_birth.value;
        const phone_number = form.phone_number.value;
        const address = form.address.value;
        try {
          const res = await fetch('http://127.0.0.1:5000/signup', { 
            method: 'POST', 
            body: JSON.stringify({ email, password, last_name , first_name , gender, role, date_of_birth, phone_number, address}),
            headers: {'Content-Type': 'application/json'}
          });
          // handle response
          console.log(res);
        }
        catch (err) {
          console.log(err);
        }
      }
    return(
        <div>
            <Header/>
<body>
        <main>
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="d-flex justify-content-center py-4">
                                <a href="index.html" className="logo d-flex align-items-center w-auto">

                                    <span className="d-none d-lg-block">Assurini</span>
                                </a>
                            </div>

                            <div className="card mb-3">

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Create new account</h5>
                                            <p className="text-center small">signup</p>
                                        </div>
                                        <form className="row g-3" onSubmit={handleSubmit}>

                                            <label className="form-label" for="email">Email</label>
                                            <input className="form-control" type="text" name="email" required />
                                            <div className="email error"></div>
                                            <label className="form-label" for="password">Password</label>
                                            <input className="form-control" type="password" name="password" required />
                                            <div className="password error"></div>
                                            <label className="form-label" for="last_name">Last Name</label>
                                            <input className="form-control" type="text" name="last_name" required />
                                            <div className="last_name error"></div>
                                            <label className="form-label" for="first_name">First Name</label>
                                            <input className="form-control" type="text" name="first_name" required />
                                            <div className="dropdown-menu" class="first_name error"></div>
                                            <label className="form-label" for="gender">Gender</label>
                                            <select name="gender">
                                                <option value="" disabled selected>Choose Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <div className="dropdown-menu" class="gender error"></div>
                                            <label className="form-label" for="role">Role</label>
                                            <select name="role">
                                                <option value="" disabled selected>Choose Role</option>
                                                <option value="Admin" >Admin</option>
                                                <option value="Expert" >Expert</option>
                                                <option value="Agence" >Agence</option>
                                                <option value="Client" >Client</option>
                                            </select>
                                            <div className="role error"></div>

                                            <label className="form-label" for="date_of_birth">Date of Birth</label>
                                            <input className="form-control" type="date" name="date_of_birth" required />
                                            <div className="date_of_birth error"></div>
                                            <label className="form-label" for="phone_number">Phone Number</label>
                                            <input className="form-control" type="text" name="phone_number" required />
                                            <div className="phone_number error"></div>
                                            <label className="form-label" for="address">Address</label>
                                            <input className="form-control" type="text" name="address" required />
                                            <div className="address error"></div>
                                            <button className="btn btn-primary w-100">Sign up</button>

                                            <div className="col-12">
                                                <p className="small mb-0">already have account <a href="pages-login.html">Login</a></p>
                                            </div>
                                        </form>
                                        <div id="notification"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </main>
        </body>
        </div>
    );
    }

export default Signup;