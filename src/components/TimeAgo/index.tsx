const TimeAgo = ({ timestamp ,className}:{timestamp?:string , className?:string}) => {
    if(!timestamp) return <div></div>
    const getTimeAgo = (timestamp:string) => {
      const now:any = new Date();
      const past :any= new Date(timestamp);
      const diffInSeconds = Math.floor((now - past) / 1000);
  
      const minutes = Math.floor(diffInSeconds / 60);
      const hours = Math.floor(diffInSeconds / 3600);
      const days = Math.floor(diffInSeconds / 86400);
      const weeks = Math.floor(diffInSeconds / 604800);
  
      if (minutes < 1) return 'Immediately';
      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return `${hours} hours ago`;
      if (days < 7) return `${days} day ago`;
      return `${weeks} week ago`;
    };
  
    return <span className={className}>{getTimeAgo(timestamp)}</span>;
  };
  
  export default TimeAgo;