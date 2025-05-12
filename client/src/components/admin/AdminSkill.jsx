import { useState } from 'react';
import skillService from '../../services/skillService';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminSkill({ skills, onUpdate }) {
  const [error, setError] = useState('');
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
  };

  const handleDeleteSkill = async (id) => {
    try {
      await skillService.deleteSkill(id);
      setError('');
      onUpdate();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className='m-4'>
      <h3 className='font-bold items-center px-6 bg-slate-100 rounded py-4'>My Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{skill.name}</h3>
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{skill.level}% Proficiency</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditSkill(skill)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddSkill} className="mb-8 space-y-4 py-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name </label>
          <input
            required
            placeholder="Skill Name"
            value={skillForm.name}
            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
            className="block w-full border-blue-50 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency </label>
          <input
            required
            type="number"
            min="0"
            max="100"
            value={skillForm.level}
            onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
            className="block w-full border-blue-50 border-2 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Skill' : 'Add Skill'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setSkillForm({
                name: '',
                level: 0,
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