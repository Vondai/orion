import "./NotificationModal.css";
function NotificationModal({ message }) {
  function clickHandler(e) {
    e.currentTarget.style.display = 'none';
  }
  if (!message) return null;
  return (
    <div className="notification-wrapper" onClick={clickHandler}>
      <p className="notification-content">{message}</p>
    </div>
  );
}

export default NotificationModal;
