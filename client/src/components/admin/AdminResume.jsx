import { useState, useEffect } from 'react';
import { FaFileUpload, FaTrash, FaDownload } from 'react-icons/fa';
import resumeService from '../../services/resumeService';

export default function AdminResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await resumeService.getResume();
      setResume(data);
      setError('');
    } catch (err) {
      if (err.message === 'No resume found') {
        setResume(null);
        setError('');
      } else {
        const errorMessage = err.message || err.error || 'Failed to load resume';
        setError(errorMessage);
        console.error('Error fetching resume:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      await resumeService.uploadResume(file);
      await fetchResume();
    } catch (err) {
      const errorMessage = err.message || err.error || 'Failed to upload resume';
      setError(errorMessage);
      console.error('Error uploading resume:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete the current resume?')) {
      return;
    }

    try {
      await resumeService.deleteResume();
      setResume(null);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete resume');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Resume Management</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Current Resume Section */}
          {resume ? (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FaFileUpload className="text-blue-500 text-2xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Current Resume</h3>
                    <p className="text-sm text-gray-600">
                      Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FaDownload className="text-xl" />
                  </a>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-gray-600 text-center">No resume uploaded yet</p>
            </div>
          )}

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                disabled={uploading}
              />
              <label
                htmlFor="resume-upload"
                className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer
                  ${uploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
              >
                <FaFileUpload className="mr-2" />
                {uploading ? 'Uploading...' : 'Upload New Resume'}
              </label>
              <p className="mt-2 text-sm text-gray-600">
                Only PDF files up to 5MB are allowed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 