interface MessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

const Message = ({ type, message }: MessageProps) => {
  const getMessageStyle = () => {
    return type === 'error' ? { color: 'red' } : { color: 'green' };
  };

  return <div style={getMessageStyle()}>{message}</div>;
};

export default Message;
