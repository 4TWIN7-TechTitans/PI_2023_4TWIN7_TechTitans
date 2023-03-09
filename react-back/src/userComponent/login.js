import React, { useState } from "react";
import Footer from "./footer";
import Header from "./header";

function Login() {
const [showNotification, setShowNotification] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
const form = e.target;
const email = form.email.value;
const password = form.password.value;
try {
const res = await fetch("http://127.0.0.1:5000/login", {
method: "POST",
body: JSON.stringify({
email,
password,
}),
headers: { "Content-Type": "application/json" },
});
// handle response
if (res.ok) {
setShowNotification(true);
} else {
console.log("Error:", res.statusText);
}
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
<a
                   href="index.html"
                   class="logo d-flex align-items-center w-auto"
                 >
<img src="assets/img/logo.png" alt="" />
<span class="d-none d-lg-block">Assurini</span>
</a>
</div>
<div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p class="text-center small">
                      Enter your Email & Password to login
                    </p>
                  </div>

                  <form className="row g-3" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      required
                    />
                    <div className="email error"></div>
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      required/>
                    <div className="password error"></div>

                    <div className="d-grid gap-2 col-12 mt-4">
                      <button className="btn btn-primary" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {showNotification && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  Login successful!
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShowNotification(false)}
                  ></button>
                </div>
              )}
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