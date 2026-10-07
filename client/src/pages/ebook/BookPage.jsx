import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import BookCard from "./BookCard";
import Loading from "../loadingPage/Loading";
import { useNavigate } from "react-router-dom";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/books/get-books?page=1&limit=18`);
      setBooks(res.data);
    } catch (err) {
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6 bg-white shadow p-4 rounded-lg border text-sm font-medium">
        <button onClick={() => navigate("/")} className="text-blue-600 hover:underline">
          Home
        </button>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="text-gray-700">Our Books</span>
      </div>

      {loading ? (
        <Loading type="books" />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(BookPage);