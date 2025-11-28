import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Mũi tên từ react-icons
import './HorizontalScroll.css';

const HorizontalScroll = ({ children }) => {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);  // Xác định liệu có thể cuộn sang trái
  const [canScrollRight, setCanScrollRight] = useState(true); // Xác định liệu có thể cuộn sang phải

  // Hàm để cuộn về bên trái
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200, // Di chuyển về bên trái 200px
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  // Hàm để cuộn về bên phải
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200, // Di chuyển về bên phải 200px
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  // Kiểm tra khi cuộn và cập nhật trạng thái mũi tên
  const checkScroll = () => {
    const scrollPosition = scrollRef.current.scrollLeft;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    setCanScrollLeft(scrollPosition > 0); // Có thể cuộn sang trái nếu không ở đầu
    setCanScrollRight(scrollPosition < maxScroll); // Có thể cuộn sang phải nếu không ở cuối
  };

  // Sử dụng useEffect để kiểm tra cuộn mỗi khi nội dung thay đổi
  useEffect(() => {
    checkScroll();
  }, [children]);  // Khi có sự thay đổi về nội dung

  return (
    <div className="scroll-container">
      <button 
        className="arrow left" 
        onClick={scrollLeft} 
        disabled={!canScrollLeft}  // Nếu không thể cuộn trái, vô hiệu hóa nút
      >
        <FaChevronLeft size={30} />
      </button>
      <div className="scroll-content" ref={scrollRef} onScroll={checkScroll}>
        {children}
      </div>
      <button 
        className="arrow right" 
        onClick={scrollRight} 
        disabled={!canScrollRight}  // Nếu không thể cuộn phải, vô hiệu hóa nút
      >
        <FaChevronRight size={30} />
      </button>
    </div>
  );
};

export default HorizontalScroll;
