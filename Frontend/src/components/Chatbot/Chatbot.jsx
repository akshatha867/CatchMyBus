import "./ChatBot.css";
import { useEffect, useRef, useState } from "react";

function ChatBot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋"
    },
    {
      type: "bot",
      text: "Welcome to Catch My Bus."
    },
    {
      type: "bot",
      text: "How can I help you today?"
    }
  ]);

  // Reference for chat body
  const chatBodyRef = useRef(null);

  // Automatically scroll to latest message
  useEffect(() => {

    if (chatBodyRef.current) {

      chatBodyRef.current.scrollTop =
        chatBodyRef.current.scrollHeight;

    }

  }, [messages]);


  const handleQuickButton = (question) => {

    let userMessage = "";
    let botAnswer = "";

    if (question === "routes") {

      userMessage = "🚌 Bus Routes";

      botAnswer =
        "You can search for available buses from Belthangady by selecting your destination.";

    }

    else if (question === "destinations") {

      userMessage = "📍 Destinations";

      botAnswer =
        "We provide bus information for destinations such as Mangalore, Ujire, Dharmasthala and more.";

    }

    else if (question === "timings") {

      userMessage = "⏰ Bus Timings";

      botAnswer =
        "Select your destination to view the available bus departure timings.";

    }

    else if (question === "office") {

      userMessage = "📞 Transport Office";

      botAnswer =
        "For transport office assistance, please contact the local transport office.";

    }


    // Add user message + bot response
    setMessages((previousMessages) => [

      ...previousMessages,

      {
        type: "user",
        text: userMessage
      },

      {
        type: "bot",
        text: botAnswer
      }

    ]);

  };


  return (
    <>

      {/* =========================
          FLOATING CHAT BUTTON
      ========================= */}

      <button
        className="chat-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "💬"}
      </button>


      {/* =========================
          CHAT WINDOW
      ========================= */}

      {open && (

        <div className="chat-window">

          {/* Header */}

          <div className="chat-header">

            <div className="chat-profile">

              <div className="bot-avatar">
                🚌
              </div>

              <div>

                <h3>Catch My Bus</h3>

                <span>
                  ● Online
                </span>

              </div>

            </div>


            <button
              className="close-chat"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>

          </div>


          {/* =========================
              CHAT BODY
          ========================= */}

          <div
            className="chat-body"
            ref={chatBodyRef}
          >

            {/* Date / welcome separator */}

            <div className="chat-date">
              Today
            </div>


            {messages.map((message, index) => (

              <div
                key={index}
                className={`message-row ${message.type}`}
              >

                {/* Bot Avatar */}

                {message.type === "bot" && (

                  <div className="small-avatar">
                    🚌
                  </div>

                )}


                <div
                  className={
                    message.type === "bot"
                      ? "bot-message"
                      : "user-message"
                  }
                >
                  {message.text}
                </div>

              </div>

            ))}

          </div>


          {/* =========================
              QUICK ACTIONS
          ========================= */}

          <div className="quick-section">

            <p>Quick options</p>

            <div className="quick-buttons">

              <button
                onClick={() =>
                  handleQuickButton("routes")
                }
              >
                🚌 Bus Routes
              </button>

              <button
                onClick={() =>
                  handleQuickButton("destinations")
                }
              >
                📍 Destinations
              </button>

              <button
                onClick={() =>
                  handleQuickButton("timings")
                }
              >
                ⏰ Bus Timings
              </button>

              <button
                onClick={() =>
                  handleQuickButton("office")
                }
              >
                📞 Transport Office
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default ChatBot;