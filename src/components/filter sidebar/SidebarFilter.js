import React, { useState, useEffect } from 'react'
import Styles from './SidebarFilter.module.css'
import Discipline from './discipline/Discipline';
import DocumentType from './document type/DocumentType';
import Region from './region/Region';
import PublicationDate from './year/PublicationDate';
import { useGetPageFilterData } from '../../services/apiService';
import Publisher from './publisher/Publisher';

function SidebarFilter() {
  const [filters , setFilters] = useState({})
  const loadFilters = Object.keys(filters).length !== 0
  const {data} = useGetPageFilterData("searchResult");

  useEffect(() => {
    if (data) {
      setFilters(data.data);
    }
  }, [data]);
  
  return (
  <>
    <section className={Styles.sidebar}>
        <div className={Styles.filterHolder}>
          <img className={Styles.filterIcon} src='/filter.svg'/>
          <div className={Styles.filter}>Filters</div>
        </div>
      
        {/* { loadFilters && filters.disciplines.length !== 0 && <Discipline items={filters.disciplines}/> }
        { loadFilters && filters.document_type.length !== 0 && <DocumentType items={filters.document_type}/> } */}
        {/* <Industry items={filters.industry}/> */}
        {/* { loadFilters && filters.region.length !== 0 && <Region items={filters.region}/> } */}
        { loadFilters && filters.region.length !== 0 && <Publisher items={filters.publishers}/> }
        {/* <PublicationDate/> */}
    </section>
  </>
  );
};

export default SidebarFilter;
