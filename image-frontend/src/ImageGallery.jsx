import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ImageItem from './ImageItem'; 
import debounce from 'lodash/debounce';
import './ImageGallery.css';

export default function ImageGallery() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10;
  const [isLoadingPage, setIsLoadingPage] = useState(false); 


  // const debouncedSyncWithBackend = useCallback(
  //   debounce(async () => {
  //     try {
  //       const apiUrl = 'http://localhost:5600/'; // Your synchronization endpoint
  //       const response = await axios.post(apiUrl, { dataList });
  //       console.log('Data synchronized:', response.data);
  //     } catch (error) {
  //       console.error('Error synchronizing data:', error);
  //     }
  //   }, 30000),
  //   [dataList]
  // );


  const fetchData = useCallback(async (page) => {
    setIsLoadingPage(true);

    try {
      const apiUrl = `http://localhost:5600/api/images?page=${page}&pagesize=${pageSize}`;
      const response = await axios.get(apiUrl);
      const { images, totalPages } = response.data;

      setDataList(images);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingPage(false); 
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);


  // useEffect(() => {
  //   debouncedSyncWithBackend();
  // }, [debouncedSyncWithBackend]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } 
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>AugX Project</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul className="image-grid">
            {dataList?.length ? (
            dataList.map((image, index) => (
              <ImageItem key={image._id} image={image} dataList={dataList} setDataList={setDataList} />
            ))
            ) : (
              <p>No images</p>
            )}
          </ul>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1 || isLoadingPage}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages || isLoadingPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
