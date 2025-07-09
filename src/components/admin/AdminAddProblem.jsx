import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddProblem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sno: '',
    title: '',
    difficulty: 'Easy',
    topic: '',
    description: '',
    test_case: '',
    constraints: [''],
    examples: [{ input: '', output: '' }],
    boiler_plate_code: [{ lang: '', code: '' }],
  });

  const inputStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExampleChange = (index, field, value) => {
    const updated = [...formData.examples];
    updated[index][field] = value;
    setFormData({ ...formData, examples: updated });
  };

  const handleConstraintChange = (index, value) => {
    const updated = [...formData.constraints];
    updated[index] = value;
    setFormData({ ...formData, constraints: updated });
  };

  const handleBoilerChange = (index, field, value) => {
    const updated = [...formData.boiler_plate_code];
    updated[index][field] = value;
    setFormData({ ...formData, boiler_plate_code: updated });
  };

  const addField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], value] }));
  };

  const removeField = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/problems/createproblem", formData);
      navigate("/admin/problems");
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  };

  return (
    <div className="w-[80%] p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Add New Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="sno" value={formData.sno} onChange={handleChange} type="number" placeholder="S.No" className={inputStyle} required />
          <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="Title" className={inputStyle} required />
          <input name="topic" value={formData.topic} onChange={handleChange} type="text" placeholder="Topic" className={`${inputStyle} col-span-2`} required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className={`${inputStyle} col-span-2`} rows={4} required />
          <input name="test_case" value={formData.test_case} onChange={handleChange} placeholder="Test Case" className={`${inputStyle} col-span-2`} required />
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={`${inputStyle} col-span-2`} required>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Examples */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Examples</h3>
            <button type="button" className="text-blue-600" onClick={() => addField('examples', { input: '', output: '' })}>+ Add Example</button>
          </div>
          {formData.examples.map((ex, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input type="text" value={ex.input} onChange={(e) => handleExampleChange(index, 'input', e.target.value)} placeholder="Input" className={inputStyle} required />
              <input type="text" value={ex.output} onChange={(e) => handleExampleChange(index, 'output', e.target.value)} placeholder="Output" className={inputStyle} required />
              {formData.examples.length > 1 && (
                <button type="button" onClick={() => removeField('examples', index)} className="text-red-500 font-bold text-xl">&times;</button>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Constraints</h3>
            <button type="button" className="text-blue-600" onClick={() => addField('constraints', '')}>+ Add Constraint</button>
          </div>
          {formData.constraints.map((c, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input type="text" value={c} onChange={(e) => handleConstraintChange(index, e.target.value)} placeholder={`Constraint ${index + 1}`} className={inputStyle} required />
              {formData.constraints.length > 1 && (
                <button type="button" onClick={() => removeField('constraints', index)} className="text-red-500 font-bold text-xl">&times;</button>
              )}
            </div>
          ))}
        </div>

        {/* Boilerplate Code */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Boilerplate Code</h3>
            <button type="button" className="text-blue-600" onClick={() => addField('boiler_plate_code', { lang: '', code: '' })}>+ Add Language</button>
          </div>
          {formData.boiler_plate_code.map((bp, index) => (
            <div key={index} className="mb-4">
              <input type="text" value={bp.lang} placeholder="Language" onChange={(e) => handleBoilerChange(index, 'lang', e.target.value)} className={`${inputStyle} mb-1`} required />
              <textarea value={bp.code} placeholder="Code" onChange={(e) => handleBoilerChange(index, 'code', e.target.value)} className={inputStyle} rows={3} required />
              {formData.boiler_plate_code.length > 1 && (
                <button type="button" onClick={() => removeField('boiler_plate_code', index)} className="text-red-500 text-sm mt-1">Remove</button>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg">
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default AdminAddProblem;
