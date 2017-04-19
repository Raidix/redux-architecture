import React from 'react';
import Multiple from 'containers/multiple';

const MultiplePage = () => (
  <div>
    <h2>Multiple page</h2>

    <Multiple componentId="first" />

    <br />
    <Multiple componentId="second" />

    <br />
    <Multiple componentId="third" />
  </div>
);

export default MultiplePage;
