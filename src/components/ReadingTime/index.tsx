
const ReadingTime = ({ content ,className}:{content:string,className?:string}) => {
  // Tính số từ trong nội dung
  const calculateReadingTime = (text:string) => {
    const wordsPerMinute = 200; // Tốc độ đọc trung bình
    const words = text.split(/\s+/).length; // Đếm số từ
    const readingTime = Math.ceil(words / wordsPerMinute); // Thời gian đọc (làm tròn lên)
    return readingTime;
  };

  const readingTime = calculateReadingTime(content);

  return <span className={className}>{readingTime} mintues reading</span>;
};

export default ReadingTime;