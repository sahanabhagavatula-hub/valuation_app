const MAC_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro", "Helvetica Neue", sans-serif';

function MacTrafficLights() {
  const dot = (bg) => (
    <div style={{ width: 15, height: 15, borderRadius: '50%', background: bg, border: '0.5px solid rgba(0,0,0,0.1)' }} />
  );
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      {dot('#ff5f57')}{dot('#febc2e')}{dot('#28c840')}
    </div>
  );
}

export default function MacWindow({ width = 780, height = 460, title = 'Window', children }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 20px 50px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: MAC_FONT,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '14px 18px',
          background: 'linear-gradient(180deg, #ebebeb, #dedede)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <MacTrafficLights />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 600,
            color: 'rgba(0,0,0,0.55)',
            pointerEvents: 'none',
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', position: 'relative' }}>{children}</div>
    </div>
  );
}
