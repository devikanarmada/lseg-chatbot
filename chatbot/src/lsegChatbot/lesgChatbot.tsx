import React, { useState, useRef, useEffect } from "react";
import stockDataRaw from "../mockData/stockData.json";
import ChatbotHeader from "../chatbotHeader/chatbotHeader.tsx";
import "./lesgChatbot.scss";

const LsegChatbot = () => {
  const bottomRef = useRef(null);
  const [selectedStockEx, setSelectedStockEx] = useState("");
  const [selectedStock, setselectedStock] = useState("");
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedStockEx, selectedStock]);

  useEffect(() => {
    try {
      // Basic validation of the imported data
      if (!Array.isArray(stockDataRaw)) {
        setError("Invalid stock data format.");
      } else if(stockDataRaw.length === 0) {
        setError("Failed to load stock data.");
      }
      setStockData(stockDataRaw);
    } catch (err) {
      console.error("Failed to load stock data:", err);
      setError("Oops! Something went wrong while loading stock data.");
    }
  }, []);

  const reset = () => {
    setSelectedStockEx("");
    setselectedStock("");
  };

  const renderStockExchange = () => {
    if (!stockData.length) return null;
    return (
      <div className="home-menu">
        {/* <Chatbot /> */}
        <div className="menu">
          <div className="main-menu-title">Please select a Stock Exchange.</div>

          <ul>
            {stockData.map((exchange) => (
              <li
                key={exchange.code}
                onClick={() => {
                  setSelectedStockEx(exchange);
                  setselectedStock("");
                }}
              >
                {exchange.stockExchange}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderStock = () => {
    if (!selectedStockEx?.topStocks?.length) return null;
    return (
      <div className="home-menu">
        {/* <Chatbot /> */}
        <div className="menu">
          <div className="stock-title">Please select a stock.</div>
          <ul>
            {selectedStockEx.topStocks.map((stock) => (
              <li key={stock.code} onClick={() => setselectedStock(stock)}>
                {stock.stockName} ({stock.code})
              </li>
            ))}
            <li
              onClick={() => {
                reset();
              }}
              className="actionButton"
            >
              Main Menu
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderStockPrice = () => {
    if (!selectedStock?.stockName || !selectedStock?.price) return null;
    return (
      <div className="home-menu">
        {/* <Chatbot /> */}
        <div className="menu">
          <div className="stock-price">
            Stock Price of {selectedStock.stockName} ({selectedStock.code}) is $
            {selectedStock.price}. Please select an option.
          </div>
          <ul>
            <li
              onClick={() => {
                reset();
              }}
              className="actionButton"
            >
              Main Menu
            </li>
            <li onClick={() => setselectedStock("")} className="actionButton">
              Go Back
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="chatbot-ui">
      <ChatbotHeader />
      <div className="chatbot-content">
        <div className="greeting">
          Hello! Welcome to LSEG. I'm here to help you.
        </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {renderStockExchange()}

            {selectedStockEx?.stockExchange && (
              <div className="selected-exchange">
                {selectedStockEx.stockExchange}
              </div>
            )}

            {selectedStockEx?.topStocks?.length > 0 && (
              <>
                {renderStock()}
                {selectedStock?.stockName && (
                  <div className="selected-stock">
                    {selectedStock.stockName} ({selectedStock.code})
                  </div>
                )}
              </>
            )}

            {selectedStock?.stockName && renderStockPrice()}
          </>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default LsegChatbot;
