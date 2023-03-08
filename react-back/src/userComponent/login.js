import React, { useState } from 'react';
import Footer from './footer';
import Header from './header';


function Login() {
    const [showNotification, setShowNotification] = useState(false);
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);

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
                body: JSON.stringify({
                    email,
                    password,
                    last_name,
                    first_name,
                    gender,
                    role,
                    date_of_birth,
                    phone_number,
                    address,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            // handle response
            console.log(res);
            setShowNotification(true);
            setShowVerifyEmail(true);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <body>
            <Header />
            <main>
                <div class="container">

                    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div class="d-flex justify-content-center py-4">
                                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                                            <img src="assets/img/logo.png" alt="" />
                                            <span class="d-none d-lg-block">Assurini</span>
                                        </a>
                                    </div>

                                    <div class="card mb-3">

                                        <div class="card-body">

                                            <div class="pt-4 pb-2">
                                                <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p class="text-center small">Enter your username & password to login</p>
                                            </div>

                                            <form class="row g-3 needs-validation" novalidate>

                                                <div class="col-12">
                                                    <label for="yourUsername" class="form-label">Username</label>
                                                    <div class="input-group has-validation">
                                                        <input type="text" name="username" class="form-control" id="yourUsername" required />
                                                        <div class="invalid-feedback">Please enter your username.</div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <label for="yourPassword" class="form-label">Password</label>
                                                    <input type="password" name="password" class="form-control" id="yourPassword" required />
                                                    <div class="invalid-feedback">Please enter your password!</div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                        <label class="form-check-label" for="rememberMe">Remember me</label>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div class="col-12">
                                                    <p class="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
            <Footer />
        </body>
    );
}

export default Login;