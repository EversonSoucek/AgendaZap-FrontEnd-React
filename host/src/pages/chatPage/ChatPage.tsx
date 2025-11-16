"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ChatPage.css";

type MessageType = "user" | "bot" | "system";

type SocketPayload =
  | {
    type: "user_message";
    sender: string;
    from: string;
    body: string;
    timestamp: string;
  }
  | {
    type: "bot_message";
    sender: string;
    to: string;
    body: string;
    timestamp: string;
  }
  | {
    type: "qr_generated";
    qr: string;
  }
  | {
    type: "qr_cleared";
  };

type ChatMessage = {
  id: string;
  author: string;
  body: string;
  timestamp?: string;
  type: MessageType;
};

const WS_ENDPOINT = "ws://localhost:8080";
const QR_ENDPOINT = "http://localhost:3001/qr";
const START_ENDPOINT = "http://localhost:3001/start";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const qrObjectUrlRef = useRef<string | null>(null);

  // Adiciona mensagem
  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const formatTimestamp = useCallback((isoDate?: string) => {
    if (!isoDate) return "";
    try {
      return new Date(isoDate).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }, []);

  // Buscar QR do backend
  const fetchQrImage = useCallback(async () => {
    try {
      const response = await fetch(QR_ENDPOINT, { cache: "no-store" });

      if (!response.ok) {
        appendMessage({
          id: crypto.randomUUID(),
          author: "Sistema",
          body: "QR ainda não disponível. Aguarde...",
          type: "system",
        });
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
        author: "Sistema",
        body: "QR code recebido. Escaneie para autenticar.",
        type: "system",
      });
    } catch (error) {
      console.error("Erro ao buscar QR:", error);
      appendMessage({
        id: crypto.randomUUID(),
        author: "Sistema",
        body: "Erro ao obter QR code.",
        type: "system",
      });
    }
  }, [appendMessage]);

  // Conectando WebSocket
  const connectSocket = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) return;

    setIsConnecting(true);
    setConnectionError(null);

    const socket = new WebSocket(WS_ENDPOINT);
    wsRef.current = socket;

    socket.onopen = () => {
      setIsConnecting(false);
      setIsConnected(true);
      appendMessage({
        id: crypto.randomUUID(),
        author: "Sistema",
        body: "Conectado ao servidor.",
        type: "system",
      });
    };

    socket.onclose = () => {
      setIsConnected(false);
      setIsConnecting(false);
      appendMessage({
        id: crypto.randomUUID(),
        author: "Sistema",
        body: "Conexão encerrada.",
        type: "system",
      });
    };

    socket.onerror = () => {
      setConnectionError("Falha ao conectar ao servidor.");
      setIsConnecting(false);
      setIsConnected(false);
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        const data: SocketPayload = JSON.parse(event.data);

        if (data.type === "user_message") {
          appendMessage({
            id: crypto.randomUUID(),
            author: data.sender,
            body: data.body,
            timestamp: data.timestamp,
            type: "user",
          });
        }

        if (data.type === "bot_message") {
          appendMessage({
            id: crypto.randomUUID(),
            author: "Bot",
            body: data.body,
            timestamp: data.timestamp,
            type: "bot",
          });
        }

        if (data.type === "qr_generated") {
          appendMessage({
            id: crypto.randomUUID(),
            author: "Sistema",
            body: "QR code disponível. Escaneie.",
            type: "system",
          });

          fetchQrImage();
        }

        if (data.type === "qr_cleared") {
          appendMessage({
            id: crypto.randomUUID(),
            author: "Sistema",
            body: "Sessão autenticada! QR removido.",
            type: "system",
          });

          if (qrObjectUrlRef.current) {
            URL.revokeObjectURL(qrObjectUrlRef.current);
            qrObjectUrlRef.current = null;
          }
          setQrImageUrl(null);
        }
      } catch (err) {
        console.error("Erro ao interpretar WS:", err);
      }
    };
  }, [appendMessage, fetchQrImage]);

  // ⛔ BUG ORIGINAL: WS conectava depois do QR ser gerado
  // ✅ AGORA: primeiro conecta o socket, depois inicia WhatsApp
  const handleConnect = useCallback(async () => {
    try {
      // 1) Conectar WebSocket antes de iniciar WhatsApp
      connectSocket();

      appendMessage({
        id: crypto.randomUUID(),
        author: "Sistema",
        body: "Conectando ao WhatsApp...",
        type: "system",
      });

      // 2) Agora iniciamos o WhatsApp
      const response = await fetch(START_ENDPOINT);

      if (!response.ok) {
        appendMessage({
          id: crypto.randomUUID(),
          author: "Sistema",
          body: "Erro ao iniciar WhatsApp.",
          type: "system",
        });
        return;
      }

      appendMessage({
        id: crypto.randomUUID(),
        author: "Sistema",
        body: "WhatsApp iniciado. Aguardando QR...",
        type: "system",
      });

      // 3) Tenta buscar QR imediatamente (caso já exista)
      fetchQrImage();
    } catch (err) {
      appendMessage({
        id: crypto.randomUUID(),
        author: "Sistema",
        body: "Falha ao iniciar servidor WhatsApp.",
        type: "system",
      });
    }
  }, [appendMessage, connectSocket, fetchQrImage]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (qrObjectUrlRef.current) URL.revokeObjectURL(qrObjectUrlRef.current);
    };
  }, []);

  const statusLabel = useMemo(() => {
    if (isConnecting) return "Conectando...";
    if (isConnected) return "Conectado";
    return "Desconectado";
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
            {isConnected ? "Conectado" : isConnecting ? "Conectando..." : "Conectar"}
          </button>

          <span className={`chat-status chat-status--${isConnected ? "online" : "offline"}`}>
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
                Clique em "Conectar" para gerar o QR e iniciar a sessão.
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
              <p>Nenhuma mensagem ainda.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`chat-message chat-message--${message.type}`}>
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
