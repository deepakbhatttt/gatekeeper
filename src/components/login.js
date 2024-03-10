import React from 'react';

const LoginForm = () => {
    return (
        <div className="login-form text-center rounded bg-white shadow overflow-hidden" style={{ position: 'absolute', top: '50%', left: '50%', width: '500px', transform: 'translate(-50%, -50%)' }}>
            <form method="POST" action="">
                <h4 className="bg-dark text-white py-3">ADMIN LOGIN PANEL</h4>
                <div className="p-4">
                    <div className="mb-3">
                        <input name="admin_name" type="text" className="form-control shadow-none text-center" placeholder="Admin Name" />
                    </div>
                    <div className="mb-4">
                        <input name="admin_pass" required type="password" className="form-control shadow-none text-center" placeholder="Password" />
                    </div>
                    <button name="login" required type="submit" className="btn bg-dark text-white shadow-none text">LOGIN</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
