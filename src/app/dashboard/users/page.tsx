'use client';

import { useState, useMemo } from 'react';
import { useUsers } from '@/src/hooks/useUsers';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const USERS_PER_PAGE = 6;

export default function UsersPage() {
  const { filteredUsers, loading, error } = useUsers();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const searchedUsers = useMemo(() => {
    return filteredUsers
      .filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredUsers, search]);

  const totalPages = Math.ceil(searchedUsers.length / USERS_PER_PAGE);

  const paginatedUsers = searchedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  if (loading) {
    return <div className="text-white text-xl">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Failed to load users</div>;
  }

  return (
    <div className="space-y-10">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Users</h1>

        <div className="relative w-72">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#131415] border border-white/10 rounded-xl
            pl-10 pr-4 py-2 text-white focus:outline-none
            focus:border-purple-500 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="cursor-pointer bg-[#1c1f26] border border-white/10 rounded-2xl p-6
            hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(128,84,255,0.25)]
            transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full
              bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
              flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>

              <div>
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-gray-400 text-sm">@{user.username}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-2">{user.email}</p>

            <div className="mt-4">
              <p className="text-xs text-gray-500 uppercase">Company</p>
              <p className="text-white text-sm">{user.company.name}</p>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              {user.address.city}, {user.address.street}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-lg border border-white/20
            text-white disabled:opacity-40 hover:bg-white/5 transition"
          >
            Previous
          </button>

          <span className="text-gray-400">
            Page <span className="text-white">{currentPage}</span> of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 rounded-lg border border-white/20
            text-white disabled:opacity-40 hover:bg-white/5 transition"
          >
            Next
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="bg-[#1c1f26] border border-white/10 rounded-2xl w-[600px] max-w-[95%] p-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-full
                bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
                flex items-center justify-center text-white text-lg font-bold">
                  {selectedUser.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {selectedUser.name}
                  </h2>
                  <p className="text-gray-400">@{selectedUser.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">

                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-white">{selectedUser.email}</p>
                </div>

                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-white">{selectedUser.phone}</p>
                </div>

                <div>
                  <p className="text-gray-500">Website</p>
                  <p className="text-purple-400">{selectedUser.website}</p>
                </div>

                <div>
                  <p className="text-gray-500">Company</p>
                  <p className="text-white">{selectedUser.company.name}</p>
                  <p className="text-gray-400 text-xs">
                    {selectedUser.company.catchPhrase}
                  </p>
                </div>

              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-500 mb-2">Address</p>
                <p className="text-white">
                  {selectedUser.address.suite}, {selectedUser.address.street}
                </p>
                <p className="text-gray-400">
                  {selectedUser.address.city}, {selectedUser.address.zipcode}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
