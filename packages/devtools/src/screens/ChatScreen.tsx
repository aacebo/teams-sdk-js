interface ChatScreenProps {
  isConnected: boolean;
}

export default function ChatScreen({ isConnected }: ChatScreenProps) {
  return <div>ChatScreen is {isConnected ? 'connected' : 'disconnected'}</div>;
}
