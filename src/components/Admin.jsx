import React, { useState } from 'react';

import TabSelector from './admin/TabSelector';

import './Admin.scss';

export default function Admin() {

  const [activeTab, setActiveTab] = useState();

  return (
    <section className="admin">
      <article className="admin--card">
        <TabSelector 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab}
      </article>
    </section>
  );
};