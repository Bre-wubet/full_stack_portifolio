import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import skillService from '../../services/skillService';

export default function AdminSkill({ skills, onUpdate }) {
  const [error, setError] = useState('');
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 0,
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

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await skillService.updateSkill(editingId, skillForm);
      } else {
        await skillService.addSkill(skillForm);
      }
      setSkillForm({
        name: '',
        level: 0,
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

  const handleEditSkill = (skill) => {
    setSkillForm({
      name: skill.name,
      level: skill.level
    });
    setIsEditing(true);
    setEditingId(skill._id);
    setIsFormVisible(true);
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillService.deleteSkill(id);
        onUpdate();
      } catch (err) {
        handleError(err);
      }
    }
  };

  // Ensure skills is always an array before mapping
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isFormVisible ? 'Cancel' : 'Add New Skill'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isFormVisible && (
        <form onSubmit={handleAddSkill} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
            <input
              type="text"
              value={skillForm.name}
              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level (0-100)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={skillForm.level}
              onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-center text-gray-600">{skillForm.level}%</div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsFormVisible(false);
                setIsEditing(false);
                setEditingId(null);
                setSkillForm({
                  name: '',
                  level: 0,
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
              {isEditing ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeSkills.map((skill) => (
          <div key={skill._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSkill(skill)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteSkill(skill._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {skill.level}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${skill.level}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}