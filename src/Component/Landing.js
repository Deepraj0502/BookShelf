import "./Landing.css";
import { useEffect, useState } from "react";
import "./Tabs.css";
import Navbar from "./Navbar";

export default function Landing() {
  const [localData, setLocalData] = useState([]);
  const [bookData, setBookData] = useState({});
  const [loading, setLoading] = useState(true);
  const initialData = () => {
    fetch("https://openlibrary.org/search.json?q=random&limit=10&page=1")
      .then((response) => response.json())
      .then((actualData) => {
        setBookData(actualData);

        setLoading(false);
      });
  };
  useEffect(() => {
    console.log(window.localStorage.getItem("bookData"));
    if (window.localStorage.getItem("bookData") === null) {
      window.localStorage.setItem("bookData", JSON.stringify([]));
    } else {
      setLocalData(JSON.parse(window.localStorage.getItem("bookData")));
    }
    initialData();
  }, []);
  const handleSearch = (e) => {
    if (e.target.value !== "") {
      fetch(
        "https://openlibrary.org/search.json?q=" +
          e.target.value +
          "&limit=10&page=1"
      )
        .then((response) => response.json())
        .then((actualData) => {
          setBookData(actualData);
        });
    } else {
      initialData();
    }
  };
  const handleAdd = (title, edition_count) => {
    var data = JSON.parse(window.localStorage.getItem("bookData"));
    setTimeout(() => {
      data.push({
        title: title,
        edition_count: edition_count,
      });
      setLocalData(data);
      window.localStorage.setItem("bookData", JSON.stringify(data));
    }, 1000);
  };

  return (
    <>
      {loading && (
        <div className="loading-outer">
          <div>
            <img
              className="loading-gif"
              src="https://i.pinimg.com/originals/b9/1e/11/b91e1131ca20f6369aa68d21cb3a8960.gif"
              alt=""
            />
            <p style={{ position: "relative", top: "-130px" }}>
              Fetching data....
            </p>
          </div>
        </div>
      )}
      {!loading && (
        <>
          {false && (
            <div className="loading-background">
              <div className="custom-loader"></div>
            </div>
          )}

          {true && (
            <>
              <Navbar />
              <div className="landing-outer-div">
                <div className="front-page-info  ">
                  <h1 className="linear-wipe">Personal Bookshelf</h1>
                  <div className="front-page-subheading">
                    Maintain your digital bookshelf
                  </div>
                </div>

                <form className="search-container" id="form">
                  <input
                    required
                    type="text"
                    id="search-bar"
                    placeholder="Search books.."
                    onChange={handleSearch}
                    autoComplete="off"
                  />
                  <a href="/#" className="search-anchor-tag">
                    <svg
                      className="mr-2 h-3 w-3 search-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.4145 20.5913L18.7695 15.9463C20.1838 13.8291 20.7601 11.2616 20.3862 8.74311C20.0123 6.22462 18.715 3.93524 16.7466 2.32029C14.7782 0.705331 12.2795 -0.119724 9.73651 0.00560621C7.19351 0.130936 4.78803 1.19769 2.98799 2.99837C1.18795 4.79905 0.122047 7.2049 -0.00238424 9.74795C-0.126815 12.291 0.699123 14.7894 2.31477 16.7572C3.93042 18.725 6.22026 20.0215 8.73889 20.3945C11.2575 20.7675 13.8248 20.1903 15.9415 18.7753L20.5865 23.4193C20.9647 23.7882 21.4721 23.9947 22.0005 23.9947C22.5288 23.9947 23.0363 23.7882 23.4145 23.4193C23.7894 23.0442 24 22.5356 24 22.0053C24 21.4749 23.7894 20.9663 23.4145 20.5913ZM10.2505 3.00527C11.6844 3.00527 13.0861 3.43047 14.2784 4.22711C15.4706 5.02375 16.3999 6.15605 16.9486 7.48081C17.4973 8.80558 17.6409 10.2633 17.3612 11.6697C17.0814 13.076 16.3909 14.3679 15.377 15.3818C14.3631 16.3957 13.0712 17.0862 11.6649 17.366C10.2585 17.6457 8.80078 17.5021 7.47602 16.9534C6.15125 16.4047 5.01896 15.4754 4.22232 14.2832C3.42568 13.0909 3.00047 11.6892 3.00047 10.2553C3.00259 8.3331 3.7671 6.49026 5.12628 5.13108C6.48546 3.7719 8.3283 3.00739 10.2505 3.00527Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <div className="search-box" id="search-box"></div>
                </form>
                <div
                  className="card-tab-outer-outer"
                  style={{ display: "flex" }}
                >
                  {bookData.docs.map((e) => {
                    return (
                      <div className="card">
                        <div className="header">
                          <span className="title">Title</span>
                          <span className="price">{e.title}</span>
                        </div>
                        <p className="desc">
                          Edition count: <span>{e.edition_count}</span>
                        </p>

                        {localData !== 3 &&
                          localData.filter((d) => d.title === e.title)
                            .length === 1 && (
                            <button
                              type="button"
                              className="action"
                              style={{ background: "green", color: "white" }}
                              onClick={() =>
                                handleAdd(e.title, e.edition_count)
                              }
                            >
                              Added to Bookshelf
                            </button>
                          )}
                        {localData !== 3 &&
                          localData.filter((d) => d.title === e.title)
                            .length === 0 && (
                            <button
                              type="button"
                              className="action"
                              onClick={() =>
                                handleAdd(e.title, e.edition_count)
                              }
                            >
                              Add to Bookshelf
                            </button>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
