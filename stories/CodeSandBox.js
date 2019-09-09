import React from 'react';

const CodeSandBox = ({ src, title }) => (
  <iframe
    src={src}
    title={title}
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute'
    }}
  />
);

export default CodeSandBox;
