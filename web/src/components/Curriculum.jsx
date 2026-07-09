import { Button } from './Widgets';

const TAG_CLASS = {
  'must know': 'valufin-tag-must-know',
  'high value': 'valufin-tag-high-value',
  'good to have': 'valufin-tag-good-to-have',
};

export function TopicCard({ tag, title, description, onClick }) {
  const tagClass = TAG_CLASS[tag.toLowerCase()] || 'valufin-tag-good-to-have';
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="valufin-topic-card">
        <span className={`valufin-tag-pill ${tagClass}`}>{tag}</span>
        <p className="valufin-topic-title">{title}</p>
        <p className="valufin-topic-desc">{description}</p>
        <Button variant="secondary" onClick={onClick}>Learn this</Button>
      </div>
    </div>
  );
}

export function IntroCard({ children }) {
  return <div className="valufin-intro-card">{children}</div>;
}

export function Banner({ type = 'info', children }) {
  return <div className={`valufin-banner valufin-banner-${type}`}>{children}</div>;
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="valufin-modal-backdrop" onClick={onClose}>
      <div className="valufin-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="valufin-modal-close" onClick={onClose} aria-label="Close">✕</button>
        {title && <h3 style={{ marginBottom: 12 }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export function ChatBubble({ role, label, children }) {
  return (
    <div className={role === 'ai' ? 'valufin-chat-ai' : 'valufin-chat-user'}>
      <p className="valufin-chat-label">{label}</p>
      <p className="valufin-chat-text">{children}</p>
    </div>
  );
}

export function FeedbackBox({ children }) {
  return (
    <div className="valufin-feedback-box">
      <p className="valufin-feedback-label">Feedback</p>
      <p className="valufin-feedback-text">{children}</p>
    </div>
  );
}

export function SummaryCard({ label, children }) {
  return (
    <div className="valufin-summary-card">
      <p className="valufin-summary-label">{label}</p>
      <p className="valufin-feedback-text" style={{ fontSize: 14, lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}

export function ProgressRow({ total, step }) {
  return (
    <div className="valufin-progress-row">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`valufin-progress-step ${i < step ? 'done' : i === step ? 'active' : ''}`} />
      ))}
    </div>
  );
}

export function ExampleBox({ children }) {
  return (
    <div className="valufin-example-box">
      <p className="valufin-example-title">Example</p>
      <p className="valufin-example-text">{children}</p>
    </div>
  );
}
