import { useState } from 'react';
import skillService from '../../services/skillService';

export default function AdminSkill() {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 0,
  });

  const fetchSkills = async () => {
    try {
      const skills = await skillService.getAllSkills();
      setSkills(skills);
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

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await skillService.addSkill(skillForm);
      setSkillForm({
        name: '',
        level: 0,
      });
      setError('');
      fetchSkills();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await skillService.deleteSkill(id);
      setError('');
      fetchSkills();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className='m-4'>
      <form onSubmit={handleAddSkill} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            required
            placeholder="Skill Name"
            value={skillForm.name}
            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
            className="block w-full border-blue-50 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency *</label>
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
          Add Skill
        </button>
      </form>

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
            <button
              onClick={() => handleDeleteSkill(skill._id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}