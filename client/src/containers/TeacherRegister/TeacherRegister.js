import React, { useState, useEffect } from "react";
import './TeacherRegister.scss'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset, register } from "../../features/auth/authSlice";
import { CgInsertAfter } from "react-icons/cg";
const TeacherRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        image: "",
    });
    const { name, email, password, password2, image } = formData; // Use lowercase variable names
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            if (user) {
                toast.success("successful login");
            }
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        if (e.target.type == "file") {
            const file = e.target.files[0];
            //  console.log("this is the value ", file);
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
                image: file,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            const formData = new FormData();
            formData.append("name", name); // Append name field
            formData.append("email", email); // Append email field
            formData.append("password", password); // Append password field
            formData.append("image", image); // Append image field
            formData.append("role", "teacher"); // Append image field
            console.log(formData.get("image"));
            dispatch(register(formData));
        }
    };
    return (
        <div>
            <section class="form-container">
                <form onSubmit={onSubmit}>
                    <h3>Become A Great Teacher</h3>
                    <p>
                        Your Name <span>*</span>
                    </p>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                            maxLength="50"
                            className="box"
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <p>
                        Your Email <span>*</span>
                    </p>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            maxLength="50"
                            className="box"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <p>
                        Your Password <span>*</span>
                    </p>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            maxLength="20"
                            className="box"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <p>
                        Confirm Password <span>*</span>
                    </p>
                    <div>
                        <input
                            type="password"
                            name="password2"
                            placeholder="Confirm your password"
                            required
                            maxLength="20"
                            className="box"
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <p>
                        Select Profile <span>*</span>
                    </p>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            required
                            className="box"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Register New
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default TeacherRegister