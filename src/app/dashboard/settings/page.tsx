'use client';

import { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-white">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <div className="bg-[#1c1f26] border border-white/10 rounded-2xl p-8">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-white">
                Profile Information
              </h2>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm rounded-lg
                  bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
                  text-white hover:opacity-90 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center bg-[#131415] border border-white/10 rounded-xl px-4">
                    <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent py-3 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center bg-[#131415] border border-white/10 rounded-xl px-4">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent py-3 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg
                    bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
                    text-white hover:opacity-90 transition"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                      });
                    }}
                    className="px-6 py-2 rounded-lg
                    border border-white/20 text-gray-300
                    hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            ) : (
              <div className="space-y-6">

                <div>
                  <p className="text-sm text-gray-400">
                    Full Name
                  </p>
                  <p className="text-white text-lg">
                    {user?.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>
                  <p className="text-white text-lg">
                    {user?.email}
                  </p>
                </div>

              </div>
            )}

          </div>
        </div>

        <div>

          <div className="bg-[#1c1f26] border border-white/10 rounded-2xl p-8">

            <h2 className="text-xl font-semibold text-white mb-8">
              Preferences
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-400 mb-3">
                  Notifications
                </p>

                <label className="flex items-center justify-between
                bg-[#131415] border border-white/10 rounded-xl px-5 py-4 cursor-pointer
                hover:border-white/20 transition">

                  <span className="text-white">
                    Email Notifications
                  </span>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 accent-purple-500"
                  />
                </label>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
