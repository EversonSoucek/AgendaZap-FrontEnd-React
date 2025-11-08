import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './ChatPage.css';

type MessageType = 'user' | 'bot' | 'system';

type SocketPayload =
  | {
      type: 'user_message';
      sender: string;
      from: string;
      body: string;
      timestamp: string;
    }
  | {
      type: 'bot_message';
      sender: string;
      to: string;
      body: string;
      timestamp: string;
    }
  | {
      type: 'qr_generated';
      qr: string;
    }
  | {
      type: 'qr_cleared';
    };

type ChatMessage = {
  id: string;
  author: string;
  body: string;
  timestamp?: string;
  type: MessageType;
};

const WS_ENDPOINT = 'ws://localhost:8080';
const QR_ENDPOINT = 'http://localhost:3000/qr';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const qrObjectUrlRef = useRef<string | null>(null);

  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const formatTimestamp = useCallback((isoDate?: string) => {
    if (!isoDate) {
      return '';
    }
    try {
      return new Date(isoDate).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  }, []);

  const fetchQrImage = useCallback(async () => {
    try {
      const response = await fetch(QR_ENDPOINT, {
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 404) {
          appendMessage({
            id: crypto.randomUUID(),
            author: 'Sistema',
            body: 'QR code ainda não está disponível. Aguarde alguns instantes e tente novamente.',
            type: 'system'
          });
        } else {
          appendMessage({
            id: crypto.randomUUID(),
            author: 'Sistema',
            body: `Não foi possível obter o QR code (erro ${response.status}).`,
            type: 'system'
          });
        }
        return;
      }

      const blob = await response.blob();
      if (qrObjectUrlRef.current) {
        URL.revokeObjectURL(qrObjectUrlRef.current);
      }
      const objectUrl = URL.createObjectURL(blob);
      qrObjectUrlRef.current = objectUrl;
      setQrImageUrl(objectUrl);
      appendMessage({
        id: crypto.randomUUID(),
        author: 'Sistema',
        body: 'QR code recebido. Escaneie para autenticar a sessão.',
        type: 'system'
      });
    } catch (error) {
      console.error('Erro ao buscar QR code:', error);
      appendMessage({
        id: crypto.randomUUID(),
        author: 'Sistema',
        body: 'Erro de conexão ao solicitar o QR code.',
        type: 'system'
      });
    }
  }, [appendMessage]);

  const connectSocket = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);

    try {
      const socket = new WebSocket(WS_ENDPOINT);
      wsRef.current = socket;

      socket.onopen = () => {
        setIsConnecting(false);
        setIsConnected(true);
        appendMessage({
          id: crypto.randomUUID(),
          author: 'Sistema',
          body: 'Conectado ao servidor de mensagens.',
          type: 'system'
        });
      };

      socket.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        appendMessage({
          id: crypto.randomUUID(),
          author: 'Sistema',
          body: 'Conexão encerrada.',
          type: 'system'
        });
      };

      socket.onerror = () => {
        setConnectionError('Não foi possível conectar ao servidor de mensagens.');
        setIsConnecting(false);
        setIsConnected(false);
      };

      socket.onmessage = (event: MessageEvent<string>) => {
        try {
          const data: SocketPayload = JSON.parse(event.data);

          if (data.type === 'user_message') {
            appendMessage({
              id: crypto.randomUUID(),
              author: data.sender,
              body: data.body,
              timestamp: data.timestamp,
              type: 'user'
            });
            return;
          }

          if (data.type === 'bot_message') {
            appendMessage({
              id: crypto.randomUUID(),
              author: 'Bot',
              body: data.body,
              timestamp: data.timestamp,
              type: 'bot'
            });
            return;
          }

          if (data.type === 'qr_generated') {
            appendMessage({
              id: crypto.randomUUID(),
              author: 'Sistema',
              body: 'Novo QR code disponível. Faça a leitura para continuar.',
              type: 'system'
            });
            fetchQrImage();
            return;
          }

          if (data.type === 'qr_cleared') {
            appendMessage({
              id: crypto.randomUUID(),
              author: 'Sistema',
              body: 'QR code não é mais necessário. Sessão autenticada.',
              type: 'system'
            });
            if (qrObjectUrlRef.current) {
              URL.revokeObjectURL(qrObjectUrlRef.current);
              qrObjectUrlRef.current = null;
            }
            setQrImageUrl(null);
          }
        } catch (err) {
          console.error('Erro ao interpretar mensagem do WebSocket:', err);
        }
      };
    } catch (error) {
      console.error('Erro ao iniciar WebSocket:', error);
      setConnectionError('Não foi possível iniciar a conexão com o servidor.');
      setIsConnecting(false);
    }
  }, [appendMessage, fetchQrImage]);

  const handleConnect = useCallback(async () => {
    await fetchQrImage();
    connectSocket();
  }, [connectSocket, fetchQrImage]);

  useEffect(() => {
    const mainElement = document.querySelector<HTMLElement>('.dashboard-layout__main');
    if (mainElement) {
      mainElement.classList.add('dashboard-layout__main--chat');
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (qrObjectUrlRef.current) {
        URL.revokeObjectURL(qrObjectUrlRef.current);
        qrObjectUrlRef.current = null;
      }
      if (mainElement) {
        mainElement.classList.remove('dashboard-layout__main--chat');
      }
    };
  }, []);

  useEffect(() => {
    if (isConnected && qrObjectUrlRef.current) {
      URL.revokeObjectURL(qrObjectUrlRef.current);
      qrObjectUrlRef.current = null;
      setQrImageUrl(null);
    }
  }, [isConnected]);

  const statusLabel = useMemo(() => {
    if (isConnecting) {
      return 'Conectando...';
    }
    if (isConnected) {
      return 'Conectado';
    }
    return 'Desconectado';
  }, [isConnected, isConnecting]);

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <header className="chat-sidebar__header">
          <h1>Central de Mensagens</h1>
          <p>Acompanhe as mensagens recebidas e enviadas pelo bot.</p>
        </header>

        <div className="chat-sidebar__actions">
          <button
            type="button"
            className="chat-button"
            onClick={handleConnect}
            disabled={isConnecting || isConnected}
          >
            {isConnected ? 'Conectado' : isConnecting ? 'Conectando...' : 'Conectar'}
          </button>
          <span className={`chat-status chat-status--${isConnected ? 'online' : 'offline'}`}>
            Status: {statusLabel}
          </span>
          {connectionError && <p className="chat-error">{connectionError}</p>}
        </div>

        {!isConnected && (
          <section className="chat-sidebar__qr">
            <h2>QR Code</h2>
            {qrImageUrl ? (
              <img src={qrImageUrl} alt="QR code para autenticação" />
            ) : (
              <p className="chat-sidebar__qr-empty">
                Clique em "Conectar" para solicitar o QR code e estabelecer a sessão.
              </p>
            )}
          </section>
        )}
      </div>

      <main className="chat-content">
        <header className="chat-content__header">
          <h2>Mensagens</h2>
        </header>
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-messages__empty">
              <p>Nenhuma mensagem ainda. Assim que novas mensagens chegarem, elas aparecerão aqui.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message chat-message--${message.type}`}
              >
                <div className="chat-message__meta">
                  <span className="chat-message__author">{message.author}</span>
                  {message.timestamp && (
                    <time className="chat-message__time">
                      {formatTimestamp(message.timestamp)}
                    </time>
                  )}
                </div>
                <p className="chat-message__body">{message.body}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
