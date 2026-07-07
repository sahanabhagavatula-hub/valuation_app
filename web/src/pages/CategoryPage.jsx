import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { CategoryHeader, TopicCard, Banner } from '../components/Curriculum';
import { Button } from '../components/Widgets';

export default function CategoryPage({ icon, title, pillLabel, caption, topics, backLabel, backPath, comingSoonMentionsTool = false }) {
  const navigate = useNavigate();
  const [comingSoonTopic, setComingSoonTopic] = useState(null);

  function handleClick(topic) {
    if (topic.path) {
      navigate(topic.path);
    } else {
      setComingSoonTopic(topic.title);
    }
  }

  return (
    <div className="valufin-container">
      <Topbar />
      <Button variant="secondary" onClick={() => navigate(backPath)}>{backLabel}</Button>

      <CategoryHeader icon={icon} title={title} pillLabel={pillLabel} />
      <p className="valufin-caption">{caption}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.title}
            tag={topic.tag}
            title={topic.title}
            description={topic.description}
            onClick={() => handleClick(topic)}
          />
        ))}
      </div>

      {comingSoonTopic && (
        <Banner type="info">
          <strong>{comingSoonTopic}</strong> is coming soon — this topic's AI tool hasn't been
          built yet.{comingSoonMentionsTool ? ' DCF valuation is ready to try now.' : ''}
        </Banner>
      )}
    </div>
  );
}
