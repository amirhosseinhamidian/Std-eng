import React from 'react'
import Styles from './SidebarFilter.module.css'
import Discipline from './discipline/Discipline';
import DocumentType from './document type/DocumentType';
import Industry from './industry/Industry';
import Region from './region/Region';
import PublicationDate from './year/PublicationDate';


function SidebarFilter() {
  const lis = ["Computer Science", "Process Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
"Chemical Engineering" ]
  return (
  <>
    <section className={Styles.sidebar}>
        <Discipline items={lis}/>
        <DocumentType items={lis}/>
        <Industry items={lis}/>
        <Region items={lis}/>
        <PublicationDate/>
    </section>
  </>
  );
};

export default SidebarFilter;
