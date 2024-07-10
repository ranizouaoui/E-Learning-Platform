// components/ui/Pagination.tsx

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded ${page === currentPage ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
