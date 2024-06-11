import React, { useState, useEffect } from 'react'
import Styles from './SidebarFilter.module.css'
import Discipline from './discipline/Discipline';
import DocumentType from './document type/DocumentType';
import Region from './region/Region';
import PublicationDate from './year/PublicationDate';
import { useGetPageFilterData } from '../../services/apiService';

function SidebarFilter() {
  const [filters , setFilters] = useState(null)
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        // Fetch data using the API service function
        const data = useGetPageFilterData("searchResult");
        setFilters(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchFilterData();
  }, []); 
  return (
  <>
    <section className={Styles.sidebar}>
        <div className={Styles.filterHolder}>
          <img className={Styles.filterIcon} src='/filter.svg'/>
          <div className={Styles.filter}>Filters</div>
        </div>
        { filters.disciplines !== null && <Discipline items={filters.disciplines}/> }
        { filters.document_type !== null && <DocumentType items={filters.document_type}/> }
        {/* <Industry items={filters.industry}/> */}
        { filters.document_type !== null && <Region items={filters.region}/> }
        <PublicationDate/>
    </section>
  </>
  );
};

export default SidebarFilter;
