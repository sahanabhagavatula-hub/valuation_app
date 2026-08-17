import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicCard, Banner } from '../components/Curriculum';
import SyllabusIndex from '../components/SyllabusIndex';
import Breadcrumb from '../components/Breadcrumb';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function CategoryPage({
  title,
  pillLabel,
  caption,
  topics,
  backPath,
  comingSoonMentionsTool = false,
  heroImage,
  heroTint,
  heroAccent,
  beforeTopics,
  topicsLayout = 'grid',
  syllabusHeadline,
  children,
}) {
  const navigate = useNavigate();
  const [comingSoonTopic, setComingSoonTopic] = useState(null);
  useScrollReveal();

  function handleClick(topic) {
    if (topic.path) {
      navigate(topic.path);
    } else {
      setComingSoonTopic(topic.title);
    }
  }

  const heroStyle = { '--scene-image': `url("${heroImage}")`, '--scene-tint': heroTint };

  return (
    <div className="valufin-container">
      {beforeTopics ? (
        <div className="valufin-category-hero-wrap" style={heroStyle}>
          <div className="valufin-scene-bg" />
          <div className="valufin-scene-overlay valufin-scene-overlay-extended" />

          <div className="valufin-category-hero-inner">
            <div className="valufin-hero-topbar">
              <div className="valufin-hero-topbar-inner">
                <Breadcrumb items={[{ label: 'Home', path: backPath }, { label: title }]} />
              </div>
            </div>
            <div className="valufin-category-hero-content scroll-element-once">
              <div className="valufin-scene-panel">
                <h1 className="valufin-category-hero-title">{title}</h1>
                <p className="valufin-hero-sub">{caption}</p>
              </div>
            </div>
            <div className="valufin-hero-scroll-hint">
              <span>Scroll for topics</span>
              <i className="ti ti-arrow-down" />
            </div>
          </div>

          <div className="valufin-category-hero-extra valufin-pin-freeze">
            {beforeTopics}
          </div>
        </div>
      ) : (
        <div className="valufin-category-hero" style={heroStyle}>
          <div className="valufin-scene-bg" />
          <div className="valufin-scene-overlay" />
          <div className="valufin-hero-topbar">
            <div className="valufin-hero-topbar-inner">
              <Breadcrumb items={[{ label: 'Home', path: backPath }, { label: title }]} />
            </div>
          </div>
          <div className="valufin-category-hero-content scroll-element-once">
            <div className="valufin-scene-panel">
              <h1 className="valufin-category-hero-title">{title}</h1>
              <p className="valufin-hero-sub">{caption}</p>
            </div>
          </div>
          <div className="valufin-hero-scroll-hint">
            <span>Scroll for topics</span>
            <i className="ti ti-arrow-down" />
          </div>
        </div>
      )}

      {topicsLayout === 'syllabus' ? (
        <div className={beforeTopics ? 'valufin-pin-cover' : 'scroll-element-once'}>
          <div className={beforeTopics ? 'valufin-pin-cover-inner' : undefined}>
            <SyllabusIndex headline={syllabusHeadline} topics={topics} onTopicClick={handleClick} />
          </div>
        </div>
      ) : (
        <>
          <p className="valufin-section-label">Topics — tap any to start learning</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {topics.map((topic) => (
              <div className="scroll-element-once" key={topic.title}>
                <TopicCard
                  tag={topic.tag}
                  title={topic.title}
                  description={topic.description}
                  onClick={() => handleClick(topic)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {comingSoonTopic && (
        <Banner type="info">
          <strong>{comingSoonTopic}</strong> is coming soon — this topic's AI tool hasn't been
          built yet.{comingSoonMentionsTool ? ' DCF valuation is ready to try now.' : ''}
        </Banner>
      )}

      {children}
    </div>
  );
}
