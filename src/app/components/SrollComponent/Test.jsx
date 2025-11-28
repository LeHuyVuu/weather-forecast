import React from 'react';
import HorizontalScroll from './HorizontalScroll';

function Test() {
  return (
    <div className="App">
      <h1 className=" mb-[200px]">Horizontal Scroll with Custom Content</h1>
      <HorizontalScroll>
        {/* Nội dung bạn muốn cuộn */}
        <div className="item">My Item 1</div>
        <div className="item">My Item 2</div>
        <div className="item">My Item 3</div>
        <div className="item">My Item 4</div>
        <div className="item">My Item 5</div>
        <div className="item">My Item 6</div>
        <div className="item">My Item 1</div>
        <div className="item">My Item 2</div>
        <div className="item">My Item 3</div>
        <div className="item">My Item 4</div>
        <div className="item">My Item 5</div>
        <div className="item">My Item 6</div>
      </HorizontalScroll>
    </div>
  );
}

export default Test;
