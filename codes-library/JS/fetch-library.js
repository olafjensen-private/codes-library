const fetchLibrary = {
    /**
     * Fetch data from a given URL and log the response.
     * @param {string} url - The URL to fetch data from.
     * @param {object} options - Optional configurations (method, headers, etc.).
     * @returns {Promise} - Resolves with the response or rejects with an error.
     */
    fetchData: function (url, options = {}) {
      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => console.error('Error fetching data:', error));
    },
  
    /**
     * Fetch data from multiple URLs and log the responses.
     * @param {Array<string>} urls - The array of URLs to fetch data from.
     * @param {object} options - Optional configurations (method, headers, etc.).
     */
    fetchMultiple: function (urls, options = {}) {
      urls.forEach(url => {
        this.fetchData(url, options)
          .then(data => console.log('Fetched data from:', url, data))
          .catch(error => console.error('Error fetching data from', url, error));
      });
    },
  
    /**
     * Fetch data from an array of URLs and process the results.
     * @param {Array<string>} urls - The array of URLs to fetch data from.
     * @param {Function} callback - Callback function to process the response data.
     * @param {object} options - Optional configurations (method, headers, etc.).
     */
    fetchAndProcess: function (urls, callback, options = {}) {
      urls.forEach(url => {
        this.fetchData(url, options)
          .then(data => callback(data, url))
          .catch(error => console.error('Error processing data from', url, error));
      });
    },
  
    /**
     * Fetch data from multiple URLs and wait until all are resolved.
     * @param {Array<string>} urls - The array of URLs to fetch data from.
     * @param {object} options - Optional configurations (method, headers, etc.).
     * @returns {Promise} - Resolves with an array of responses or rejects with an error.
     */
    fetchMultipleWait: function (urls, options = {}) {
      return Promise.all(urls.map(url => this.fetchData(url, options)))
        .then(responses => {
          console.log('All responses:', responses);
          return responses;
        })
        .catch(error => console.error('Error fetching multiple URLs:', error));
    },
  };
  
  // Example Usage:
  
  // Fetch data from a single URL
  fetchLibrary.fetchData('https://api.example.com/data')
    .then(data => console.log(data));
  
  // Fetch data from multiple URLs
  fetchLibrary.fetchMultiple(
    ['https://api.example.com/data1', 'https://api.example.com/data2']
  );
  
  // Fetch data from multiple URLs and process each response
  fetchLibrary.fetchAndProcess(
    ['https://api.example.com/data1', 'https://api.example.com/data2'],
    (data, url) => console.log(`Processed data from ${url}:`, data)
  );
  
  // Fetch data from multiple URLs and wait for all promises to resolve
  fetchLibrary.fetchMultipleWait(
    ['https://api.example.com/data1', 'https://api.example.com/data2']
  ).then(responses => {
    console.log('Processed all responses:', responses);
  });