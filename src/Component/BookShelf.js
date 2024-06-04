import React, { useState } from "react";
import Navbar from "./Navbar";
import "./BookShelf.css";

export default function BookShelf() {
  const [localData, setLocalData] = useState(
    JSON.parse(window.localStorage.getItem("bookData"))
  );

  const handleRemove = (title) => {
    setLocalData(localData.filter((d) => d.title !== title));
    window.localStorage.setItem(
      "bookData",
      JSON.stringify(localData.filter((d) => d.title !== title))
    );
  };
  return (
    <div>
      <>
        <Navbar />
        <div className="landing-outer-div">
          <div className="front-page-info  ">
            <h1 className="linear-wipe">My Bookshelf</h1>
          </div>

          <div className="self-tab-outer-outer" style={{ display: "flex" }}>
            {localData.map((e) => {
              return (
                <div className="card">
                  <div className="header">
                    <span className="title">Title</span>
                    <span className="price">{e.title}</span>
                  </div>
                  <p className="desc">
                    Edition count: <span>{e.edition_count}</span>
                  </p>

                  <button
                    type="button"
                    className="action"
                    style={{ background: "red", color: "white" }}
                    onClick={() => handleRemove(e.title)}
                  >
                    Remove from Bookshelf
                  </button>
                </div>
              );
            })}
            {localData.length === 0 && (
              <div className="shelf-outer">
                <p className="shelf-text">No Books in Shelf</p>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
