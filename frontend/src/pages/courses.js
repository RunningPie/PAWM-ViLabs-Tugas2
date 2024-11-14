import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/courses-style.css'; 

const CoursesPage = () => {
  // Using refs to access DOM elements for carousel functionality
  const carouselRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Arrow click functionality
    const handleArrowClick = (direction) => {
      carousel.scrollLeft += direction === "left" ? -firstCardWidth - 35 : firstCardWidth + 35;
    };

    // Drag start function
    const dragStart = (e) => {
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add("dragging");
    };

    // During drag function
    const dragging = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Increase the scroll speed
      carousel.scrollLeft = scrollLeft - walk;
    };

    // Drag stop function
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    // Event listeners for buttons
    leftBtn.addEventListener("click", () => handleArrowClick("left"));
    rightBtn.addEventListener("click", () => handleArrowClick("right"));

    // Event listeners for dragging
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);

    return () => {
      // Cleanup event listeners on unmount
      leftBtn.removeEventListener("click", () => handleArrowClick("left"));
      rightBtn.removeEventListener("click", () => handleArrowClick("right"));
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      carousel.removeEventListener("mouseup", dragStop);
      carousel.removeEventListener("mouseleave", dragStop);
      carousel.removeEventListener("touchstart", dragStart);
      carousel.removeEventListener("touchmove", dragging);
      carousel.removeEventListener("touchend", dragStop);
    };
  }, []);

  return (
    <div id="content-body" className="courses-page">
      <ul className="accordion">
        {/* Accordion Item 1 */}
        <li>
          <input type="radio" name="accordion" id="first-accordion" defaultChecked />
          <label htmlFor="first-accordion">Basic Concepts of Computational Thinking</label>
          <div className="content">
            <p>
              Computational thinking is the ability to use logic, reason, and problem-solving skills
              to design, develop, and test computer programs. It involves breaking down complex problems
              into smaller, manageable parts, using algorithms to solve them, and creating reliable
              and efficient software. In this course, you will get hands-on experience with concepts
              like problem decomposition, pattern recognition, abstraction, and algorithms.
            </p>
            <br />
            <h3>Click on one of the chapters below to start learning!</h3>
            <div className="card-wrapper">
              <span id="left-btn" ref={leftBtnRef} className="material-symbols-rounded">
                chevron_left
              </span>
              <ul ref={carouselRef} className="carousel">
                <Link to="/decom" className="card" draggable="false">
                  <div className="card-image">
                    <img src="/static/img/decomposition-3.svg" alt="decomposition-3" draggable="false" />
                  </div>
                  <h2>Chapter 1</h2>
                  <span>Decomposition</span>
                </Link>
                <Link to="/comingsoon" className="card" draggable="false">
                  <div className="card-image">
                    <img src="/static/img/pattern-3.svg" alt="pattern" draggable="false" />
                  </div>
                  <h2>Chapter 2</h2>
                  <span>Pattern Recognition</span>
                </Link>
                <Link to="/comingsoon" className="card" draggable="false">
                  <div className="card-image">
                    <img src="/static/img/abstraction-3.svg" alt="abstraction" draggable="false" />
                  </div>
                  <h2>Chapter 3</h2>
                  <span>Abstraction</span>
                </Link>
                <Link to="/comingsoon" className="card" draggable="false">
                  <div className="card-image">
                    <img src="/static/img/algorithm.svg" alt="algorithm" draggable="false" />
                  </div>
                  <h2>Chapter 4</h2>
                  <span>Algorithm</span>
                </Link>
              </ul>
              <span id="right-btn" ref={rightBtnRef} className="material-symbols-rounded">
                chevron_right
              </span>
            </div>
          </div>
        </li>

        {/* Accordion Item 2 */}
        <li>
          <input type="radio" name="accordion" id="empty-accordion" />
          <label htmlFor="empty-accordion">Coming Soon!</label>
          <div className="content">
            <p></p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CoursesPage;
