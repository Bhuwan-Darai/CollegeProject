// import admin from "../assets/admin.png";
import Header from "../../components/header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IoCalendarNumber } from "react-icons/io5";

// import moment from "moment";
// import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const handleMyProfileClick = () => {
    //This will navigate to the MYProfile page.
    window.location.href = "/profile";
  };
  const handleFeeStructureClick = () => {
    // This will navigate to the Fee Structure page.
    window.location.href = "/FeeStructure";
  };

  // const handleCalendarClick = () => {
  //   // This will navigate to the Calendar page.
  //   window.location.href = "/Calendar";
  // };

  //   const currentDate = moment().format("MMMM Do, YYYY"); // Get the current date using moment.js

  //for bardiagram below.............................................
  // const chartData = {
  //   labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
  //   datasets: [
  //     {
  //       label: "Chart Data",
  //       data: [20, 40, 30, 10, 50], // Example data for the chart
  //       backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
  //       borderColor: "rgba(75, 192, 192, 1)", // Border color
  //       borderWidth: 1, // Border width
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <>
      {/*..............top nav bars................*/}
      <div className="top-nav">
        <Header />
      </div>
      {/*...............Rest of the content...........*/}
      <div>
        <div
          className="container"
          style={{ marginTop: "40px", marginLeft: "130px" }}
        >
          <div className="row ">
            <div className="col-md-4">
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "20px",
                  padding: "30px 30px",
                  marginRight: "30px",
                  borderRadius: "5px",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
                onClick={handleMyProfileClick}
              >
                <FaIcons.FaUserGraduate style={{ marginRight: "5px" }} />
                My Profile
              </button>
            </div>
            <div className="col-md-4 ">
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  fontSize: "20px",
                  padding: "30px 30px",
                  marginRight: "30px",
                  borderRadius: "5px",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
                onClick={handleFeeStructureClick}
              >
                <AiIcons.AiOutlineTable style={{ marginRight: "5px" }} />
                Fee Structure
              </button>
            </div>
            <div className="col-md-4 ">
              <button
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  fontSize: "20px",
                  padding: "30px 30px",
                  marginRight: "30px",
                  borderRadius: "5px",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
                // onClick={handleCalenderClick}
              >
                <IoCalendarNumber style={{ marginRight: "5px" }} />
                Calender
              </button>
            </div>
            {/* <div className="col-md-4 d-flex justify-content-around">
              <button
                className="p-4 rounded fs-4 text-white "
                style={{
                  backgroundColor: "#9768D9",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleCalendarClick}
              >
                <FaIcons.FaRegCalendarAlt style={{ marginRight: "10px" }} />
                Calendar - {currentDate}
              </button>
            </div> */}
          </div>
        </div>

        {/* <div className="bardiagram"> 
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div> */}
      </div>
      <h5
        style={{
          marginTop: "100px",
          padding: "15px",
          borderRadius: "5px",
          background: "#224952",
          color: "white",
        }}
      >
        WELCOME
      </h5>
      <i>
        PayEase is an efficient online platform designed for students to easily
        manage and complete fee payments. It simplifies the process of paying
        fees for educational institutions, offering a convenient and
        user-friendly solution. With PayEase, students can securely make their
        tuition and other fee payments electronically, saving time and effort.
        This system streamlines the payment process, ensuring that students can
        handle their financial obligations with ease and accuracy, enhancing the
        overall experience of fee management in educational settings.
      </i>
    </>
  );
};
export default Dashboard;
