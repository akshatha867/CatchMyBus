import "./ChatBot.css";
import { useEffect, useRef, useState } from "react";

function formatTime(timeString) {
  const [hourStr, minuteStr] = timeString.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const period = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${period}`;
}

const GREETINGS = ["hi", "hii", "hiii", "hello", "hey", "heyy", "hola"];
const THANKS = ["thanks", "thank you", "thankyou", "thanx", "tq"];
const FAREWELLS = ["bye", "goodbye", "see you", "cya"];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [allDestinations, setAllDestinations] = useState([]);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi. How can I help you today?" }
  ]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/destinations")
      .then(res => res.json())
      .then(data => setAllDestinations(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (text, options) => {
    setMessages((prev) => [...prev, { type: "bot", text, options }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
  };

  const showTimingsFor = async (destinationName) => {
    try {
      const results = await fetch(
        `http://localhost:5000/search?destination=${encodeURIComponent(destinationName)}`
      ).then(res => res.json());

      if (results.length === 0) {
        addBotMessage(`No upcoming buses to ${destinationName} today.`);
        return;
      }

      const times = results.slice(0, 3).map(r => formatTime(r.departure_time));
      addBotMessage(`Next buses to ${destinationName}\n${times.join(" · ")}`);
    } catch (err) {
      console.error(err);
      addBotMessage("Couldn't fetch timings right now. Try again shortly.");
    }
  };

  const handleQuickButton = (question) => {
    if (question === "destinations") {
      addUserMessage("Destinations");
      const topFive = allDestinations.slice(0, 5).map(d => d.destination_name);
      addBotMessage(
        allDestinations.length > 5
          ? "Here are some destinations we cover. Tap one, or type a name."
          : "Here are the destinations we cover.",
        topFive
      );
    } else if (question === "timings") {
      addUserMessage("Bus timings");
      addBotMessage("Which destination?", allDestinations.slice(0, 5).map(d => d.destination_name));
    } else if (question === "office") {
      addUserMessage("Transport office");
      addBotMessage("For transport office assistance, contact the local transport office.");
    }
  };

  const handleDestinationSelect = (destinationName) => {
    addUserMessage(destinationName);
    showTimingsFor(destinationName);
  };

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    addUserMessage(trimmed);
    setInputText("");

    const lower = trimmed.toLowerCase();

    if (GREETINGS.some(g => lower === g || lower.startsWith(g + " "))) {
      addBotMessage("Hello! How can I help — destinations, timings, or the transport office?");
      return;
    }
    if (THANKS.some(t => lower.includes(t))) {
      addBotMessage("You're welcome! Anything else you'd like to check?");
      return;
    }
    if (FAREWELLS.some(f => lower === f)) {
      addBotMessage("Goodbye! Safe travels.");
      return;
    }

    const match = allDestinations.find(d =>
      d.destination_name.toLowerCase().includes(lower)
    );

    if (match) {
      showTimingsFor(match.destination_name);
    } else {
      addBotMessage(
        "I don't recognize that one. Here are destinations we cover or type a name:",
        allDestinations.slice(0, 5).map(d => d.destination_name)
      );
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <button className="chat-btn" onClick={() => setOpen(!open)}>
        {open ? "✖️" : "💬"}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-profile">
              <div className="bot-avatar">🚌</div>
              <div>
                <h3>Catch My Bus</h3>
                <span>● Online</span>
              </div>
            </div>
            <button className="close-chat" onClick={() => setOpen(false)}>✖️</button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message-row ${message.type}`}>
                {message.type === "bot" && <div className="small-avatar">🚌</div>}

                <div className={message.type === "bot" ? "bot-message" : "user-message"}>
                  {message.text.split("\n").map((line, i) => (
                    <div key={i} className={i === 1 ? "message-subline" : ""}>{line}</div>
                  ))}

                  {message.options && (
                    <div className="chat-pill-row">
                      {message.options.map((option, i) => (
                        <button
                          key={i}
                          className="chat-pill"
                          onClick={() => handleDestinationSelect(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Ask about a destination"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button className="send-btn" onClick={handleSend} aria-label="Send">➤</button>
          </div>

          <div className="quick-section">
            <p>Quick options</p>
            <div className="quick-buttons">
              <button onClick={() => handleQuickButton("destinations")}>📍 Destinations</button>
              <button onClick={() => handleQuickButton("timings")}>⏰ Bus timings</button>
              <button onClick={() => handleQuickButton("office")}>📞 Transport office</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;