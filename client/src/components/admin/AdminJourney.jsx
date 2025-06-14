import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import journeyService from '../../services/journeyService';

export default function AdminJourney({ journeys, onUpdate }) {
  const [error, setError] = useState('');
  const [journeyForm, setJourneyForm] = useState({
    title: '',
    description: '',
    date: '',
    type: 'education', // education or experience
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    setError(err.message || 'An error occurred');
  };

  const handleAddJourney = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await journeyService.updateJourney(editingId, journeyForm);
      } else {
        await journeyService.addJourney(journeyForm);
      }
      setJourneyForm({
        title: '',
        description: '',
        date: '',
        type: 'education',
      });
      setIsEditing(false);
      setEditingId(null);
      setError('');
      setIsFormVisible(false);
      onUpdate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditJourney = (journey) => {
    setJourneyForm({
      title: journey.title,
      description: journey.description,
      date: journey.date,
      type: journey.type,
    });
    setIsEditing(true);
    setEditingId(journey._id);
    setIsFormVisible(true);
  };

  const handleDeleteJourney = async (id) => {
    if (window.confirm('Are you sure you want to delete this journey entry?')) {
      try {
        await journeyService.deleteJourney(id);
        onUpdate();
      } catch (err) {
        handleError(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Journey</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isFormVisible ? 'Cancel' : 'Add New Entry'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isFormVisible && (
        <form onSubmit={handleAddJourney} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={journeyForm.title}
              onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={journeyForm.description}
              onChange={(e) => setJourneyForm({ ...journeyForm, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={journeyForm.date}
              onChange={(e) => setJourneyForm({ ...journeyForm, date: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={journeyForm.type}
              onChange={(e) => setJourneyForm({ ...journeyForm, type: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="education">Education</option>
              <option value="experience">Experience</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsFormVisible(false);
                setIsEditing(false);
                setEditingId(null);
                setJourneyForm({
                  title: '',
                  description: '',
                  date: '',
                  type: 'education',
                });
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Update Entry' : 'Add Entry'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {journeys.map((journey) => (
          <div key={journey._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{journey.title}</h3>
                <p className="text-sm text-gray-600">{new Date(journey.date).toLocaleDateString()}</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                  (journey.type || 'education') === 'education' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {(journey.type || 'education').split('').map((char, index) => 
                    index === 0 ? char.toUpperCase() : char
                  ).join('')}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditJourney(journey)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteJourney(journey._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{journey.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}