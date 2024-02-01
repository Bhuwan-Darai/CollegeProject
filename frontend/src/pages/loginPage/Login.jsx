import { useNavigate, Link } from "react-router-dom";
import ImageFront from "../../assets/Imagefront.jpg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../userRoleContext";

const Login = () => {
  const { updatedUserRole } = useUserContext();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth", {
        ...formData,
      });

      if (response && response.data) {
        const { success, message, role } = response.data;
        console.log(response.data);
        if (success && message && role) {
          await updatedUserRole(String(role));

          handleSuccess(message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          handleError(message);
        }
      } else {
        handleError("Invalide response from the server");
      }
    } catch (err) {
      console.error(err);
      handleError("An error occured while logging in ");
    }
    setFormData({
      ...formData,
    });
  };

  return (
    <div>
      <div className="login-template d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container">
                <img src={ImageFront} alt="front img" className="front-img" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-container">
                <form>
                  <h3
                    style={{
                      background: "#224952",
                      textAlign: "center",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      marginBottom: "50px",
                    }}
                  >
                    Login Here
                  </h3>
                  <div className="login-email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className=" form-control"
                      value={email}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="login-pwd">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className=" form-control"
                      value={password}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="backtohomepage">
                    <Button type="submit" onClick={handleSubmit}>
                      Login
                    </Button>

                    <Link to="/" type="Button">
                      Home Page
                    </Link>
                  </div>
                  {/* <Link to="/register" className="btn btn-outline-danger">
                    Register
                  </Link> */}
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
