import WebSocket, { WebSocketServer } from 'ws';

interface Client {
  id: string;
  socket: WebSocket;
}

const clients: Map<string, WebSocket> = new Map();

// Initialize the WebSocket server on port 8080
const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', (ws: WebSocket, req) => {
  const urlParams = new URLSearchParams(req.url?.split('?')[1]);
  const userId = urlParams.get('userId');
  
  if (!userId) {
    ws.close();
    return;
  }

  // Add the client to the clients map
  clients.set(userId, ws);
  console.log(`User ${userId} connected.`);

  ws.on('close', () => {
    clients.delete(userId);
    console.log(`User ${userId} disconnected.`);
  });
});

// Function to send a balance update to a specific user
export function notifyBalanceUpdate(userId: string, newBalance: { amount: number; locked: number }) {
  const clientSocket = clients.get(userId);

  // Check if the clientSocket exists and is open
  if (clientSocket) {
    if (clientSocket.readyState === WebSocket.OPEN) {
      try {
        // Send the balance update message
        clientSocket.send(JSON.stringify({ type: 'balanceUpdate', balance: newBalance }));
        console.log(`Balance updated for user ${userId}:`, newBalance);
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
      }
    } else {
      console.warn(`WebSocket for user ${userId} is not open. Ready state: ${clientSocket.readyState}`);
    }
  } else {
    console.warn(`No WebSocket connection found for user ${userId}`);
  }
}

