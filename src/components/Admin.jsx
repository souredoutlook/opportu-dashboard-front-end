import React, { useState } from 'react';

import CreateUser from './admin/CreateUser';

import './Admin.scss';

export default function Admin() {

  const [activeTab, setActiveTab] = useState(<CreateUser />);

  return (
    <section className="admin">
      <article className="admin--card">
        {activeTab}
      </article>
    </section>
  );
};