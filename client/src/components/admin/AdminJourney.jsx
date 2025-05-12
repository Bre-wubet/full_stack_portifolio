import { useState, useEffect } from 'react';
import journeyService from '../../services/journeyService';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminJourney({ onUpdate }) {
  const [journeys, setJourneys] = useState([]);
  const [error, setError] = useState('');
  const [journeyForm, setJourneyForm] = useState({
    year: '',
    title: '',
    description: '', 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentAchievement, setCurrentAchievement] = useState('');

  const fetchJourneys = async () => {
    try {
      const journeys = await journeyService.getAllJourneys();
      setJourneys(journeys);
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    setError(err.message || 'An error occurred');
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleAddJourney = async (e) => {
    e.preventDefault();
    try {
      const formattedJourney = {
        year: journeyForm.year,
        title: journeyForm.title,
        description: journeyForm.description
      };
      if (isEditing) {
        await journeyService.updateJourney(editingId, formattedJourney);
      } else {
        await journeyService.addJourney(formattedJourney);
      }
      setJourneyForm({
        year: '',
        title: '',
        description: ''
      });
      setIsEditing(false);
      setEditingId(null);
      onUpdate();
      setError('');
      fetchJourneys();
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditJourney = (journey) => {
    setJourneyForm({
      year: journey.year,
      title: journey.title,
      description: journey.description
    });
    setIsEditing(true);
    setEditingId(journey._id);
  };

  const handleDeleteJourney = async (id) => {
    try {
      await journeyService.deleteJourney(id);
      setError('');
      fetchJourneys();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className='m-4'>
      <h3 className='font-bold items-center py-4 px-6 bg-slate-100 rounded'>My Journeys</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
        {journeys.map((journey) => (
          <div key={journey._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{journey.title}</h3>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{journey.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditJourney(journey)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteJourney(journey._id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddJourney} className="mb-8 space-y-4 py-10">
        
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year </label>
          <input
            required
            type="date"
            placeholder="Journey Year"
            value={journeyForm.year}
            onChange={(e) => setJourneyForm({ ...journeyForm, year: e.target.value })}
            className="block w-full border-blue-50 border-2 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title </label>
          <input
            required
            placeholder="Journey Title"
            value={journeyForm.title}
            onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })}
            className="block w-full border-blue-50 border-2 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Journey Description"
            value={journeyForm.description}
            onChange={(e) => setJourneyForm({ ...journeyForm, description: e.target.value })}
            className="block w-full border-blue-50 border-2 rounded p-2 h-32"
          />
        </div>

       <button
          type="submit"
          className="w-full bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Journey' : 'Add Journey'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setJourneyForm({
                year: '',
                title: '',
                description: ''
              });
              setIsEditing(false);
              setEditingId(null);
            }}
            className="w-full mt-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </form>

      
    </div>
  );
}