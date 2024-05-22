import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import './resultpage.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const fetchData = async () => {
    try {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Query: searchQuery }),
      };

      const response = await fetch("https://bdf9-123-252-210-180.ngrok-free.app/search/", config);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data); // Set the search results
      console.log(SearchResults);
      console.log(data);
      setError(null);
      setPopUpVisible(true); // Show the pop-up window
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
      setError(error.message || "An error occurred");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <Wrapper>
      <SearchBar
        placeholder="Search for festival items..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress}
      />
      {/* {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : 
      (
        <SearchResults>
          {searchResults.map((result) => (
            <SearchResultItem key={result.id}>
              {result.festival_name}
            </SearchResultItem>
          ))}
        </SearchResults>
      )
      } */}
      {isPopUpVisible && (
        <PopUpWindow>
          <PopUpContent>
            <h2>Search Results</h2>
            <OptionsList style={{ display: 'flex', flexDirection: 'column' }}>
              {searchResults.map((result) => (
                <OptionButton style={{ fontSize: '14px', padding: '' }}
                  key={result.id}
                  to={{
                    pathname: "/SearchResultsPage",
                    search: `?festival_name=${result.festival_name}&item=${
                      result.item
                      
                    }&description=${
                      result.description
                    }&imgurl=${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsVs1kKc_-PYYCZcgpT4jGhEFbLlSyh8LeOjwyB76jg&s"}`,
                    // state: result // Pass the festival data as state
                    
                  }}
                >
                  {result.item}
                </OptionButton>
              ))}
            </OptionsList>
          </PopUpContent>
          <CloseButton onClick={() => setPopUpVisible(false)}>
            Close
          </CloseButton>
        </PopUpWindow>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 40px;
  background-color: #f8f9fa;
`;

const SearchBar = styled.input`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 300px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &::placeholder {
    color: #6c757d;
  }

  &:focus {
    border-color: #4d94ff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const SearchResultItem = styled.li`
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;

const PopUpWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;

  width: 600px;
  height: 400px;
  overflow-y: auto;
`;

const PopUpContent = styled.div`
  margin-bottom: 20px;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

// const OptionButton = styled.button`
//   background-color: transparent;
//   border: none;
//   padding: 8px 12px;
//   margin-bottom: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   width: 100%;
//   text-align: left;
//   color: #000; /* Adjust the text color */
//   font-size: 16px; /* Adjust the font size */

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

const OptionButton = styled(Link)`
  text-decoration: none;
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  text-align: left;
  color: #000;
  font-size: 16px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export default Products;
