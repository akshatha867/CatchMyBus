import { useState, useEffect, useRef } from "react";
import "./NotifyBus.css";
/**
 * NotifyButton
 *
 * Lets a user opt in to a browser notification 10 minutes and 5 minutes
 * before a bus's scheduled departure_time. Uses the browser Notification API
 * with setTimeout — works while the tab is open (including minimized /
 * backgrounded), but not if the browser is fully closed.
 *
 * Props:
 *   departureTime: string — the bus's departure time, in "HH:MM:SS" (24hr) format,
 *                  matching what your backend already returns for departure_time.
 *   busName: string — display name, used in the notification body text.
 */
function NotifyButton({ departureTime, busName }) {
  const [status, setStatus] = useState(() => {
  const saved = localStorage.getItem(`notified-${departureTime}-${busName}`);
  return saved === "scheduled" ? "scheduled" : "idle";
}); // idle | scheduled | departed | denied
  const timers = useRef([]); // keep track of setTimeout ids so we can clean up

  // Clear any pending timers if the component unmounts (e.g. user navigates away)
  useEffect(() => {
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  useEffect(() => {
  if (status === "scheduled") {
    const departureDate = getDepartureDate(departureTime);
    const now = new Date();
    if (departureDate > now) {
      scheduleNotification(10, departureDate, "10-min");
      scheduleNotification(6, departureDate, "6-min");
    }
  }
}, []);

  // Converts today's date + a "HH:MM:SS" departure_time into a real Date object.
  function getDepartureDate(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const departure = new Date();
    departure.setHours(hours, minutes, seconds || 0, 0);
    return departure;
  }

  function scheduleNotification(minutesBefore, departureDate, label) {
    const fireAt = new Date(departureDate.getTime() - minutesBefore * 60 * 1000);
    const delay = fireAt.getTime() - Date.now();

    // Skip if that notification point has already passed
    if (delay <= 0) return;

    const id = setTimeout(() => {
      new Notification("Bus arriving soon", {
        body: `${busName} departs in ${minutesBefore} minutes`,
        icon: "/bus-icon.png", // optional — remove if you don't have one, or point to a real asset
          tag: `${busName}-${departureDate.getTime()}-${minutesBefore}`,
      });
    }, delay);

    timers.current.push(id);
  }

  async function handleNotifyClick() {
    if (!("Notification" in window)) {
      alert("Notifications aren't supported in this browser.");
      return;
    }

    let permission = Notification.permission;

    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      setStatus("denied");
      return;
    }

    const departureDate = getDepartureDate(departureTime);
    const now = new Date();

    if (departureDate <= now) {
      setStatus("departed");
      return;
    }

    scheduleNotification(10, departureDate, "10-min");
    scheduleNotification(5, departureDate, "5-min");
    setStatus("scheduled");
    localStorage.setItem(`notified-${departureTime}-${busName}`,"scheduled");
  }

  if (status === "scheduled") {
    return (
      <button className="notify-btn notify-btn--active" disabled>
        🔔 Notifications set
      </button>
    );
  }

  if (status === "departed") {
    return (
      <button className="notify-btn notify-btn--disabled" disabled>
        Bus already departed
      </button>
    );
  }

  if (status === "denied") {
    return (
      <button className="notify-btn notify-btn--disabled" disabled title="Notifications blocked in browser settings">
        Notifications blocked
      </button>
    );
  }

  return (
    <button className="notify-btn" onClick={handleNotifyClick}>
      🔔 Notify me
    </button>
  );
}

export default NotifyButton;