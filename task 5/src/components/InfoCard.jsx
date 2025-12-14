import "../styles/InfoCard.css";
import { useState } from "react";

function InfoCard({ icon, label, value, editable = false, onSave }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const startEdit = () => {
    setInputValue(value || "");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const saveEdit = () => {
    setEditing(false);
    if (onSave) onSave(inputValue);
  };

  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div className="info-content">
        <p className="info-label">{label}</p>
        {!editing && <p className="info-value">{value}</p>}
        {editing && (
          <div className="edit-row">
            <input
              className="info-edit-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="edit-actions">
              <button className="btn-save" onClick={saveEdit}>حفظ</button>
              <button className="btn-cancel" onClick={cancelEdit}>إلغاء</button>
            </div>
          </div>
        )}
      </div>
      {/* edit toggle removed per user request */}
    </div>
  );
}

export default InfoCard;
