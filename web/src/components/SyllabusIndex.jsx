import FlipReveal from './FlipText';

const TAG_CLASS = {
  'must know': 'valufin-syllabus-tag-must-know',
  'high value': 'valufin-syllabus-tag-high-value',
  'good to have': 'valufin-syllabus-tag-good-to-have',
};

export default function SyllabusIndex({ eyebrow = 'THE SYLLABUS', headline, topics, onTopicClick }) {
  const totalLessons = topics.reduce((sum, t) => sum + (t.lessons || 0), 0);
  const totalMinutes = topics.reduce((sum, t) => sum + (t.minutes || 0), 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
  const resolvedHeadline = headline || `${topics.length} topics, ranked by what interviews test.`;

  return (
    <div className="valufin-syllabus">
      <div className="valufin-syllabus-head">
        <div>
          <p className="valufin-syllabus-eyebrow">[ {eyebrow} ]</p>
          <h2 className="valufin-syllabus-headline">{resolvedHeadline}</h2>
        </div>
        <p className="valufin-syllabus-summary">~{totalHours} hrs · {totalLessons} lessons</p>
      </div>

      <div className="valufin-syllabus-list">
        {topics.map((topic, i) => {
          const tagClass = TAG_CLASS[topic.tag?.toLowerCase()] || 'valufin-syllabus-tag-good-to-have';
          return (
            <div key={topic.title} className="valufin-syllabus-row" onClick={() => onTopicClick(topic)}>
              <div className="valufin-syllabus-row-num">
                <div className="valufin-syllabus-row-icon"><i className={`ti ti-${topic.icon}`} /></div>
                <span className="valufin-syllabus-row-index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="valufin-syllabus-row-main">
                <div className="valufin-syllabus-row-title-line">
                  <h3 className="valufin-syllabus-row-title"><FlipReveal text={topic.title} /></h3>
                  <span className={`valufin-syllabus-tag ${tagClass}`}>{topic.tag}</span>
                  {topic.path && (
                    <span className="valufin-syllabus-row-interactive">
                      <span className="dot" /> Interactive
                    </span>
                  )}
                </div>
                <p className="valufin-syllabus-row-desc">{topic.description}</p>
              </div>
              <div className="valufin-syllabus-row-meta">
                <span className="valufin-syllabus-row-time">{topic.lessons} lessons · {topic.minutes} min</span>
                <i className="ti ti-arrow-right" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
