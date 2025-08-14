import React, { useState } from 'react';

const AllocateMaterial = () => {
    const [formData, setFormData] = useState({
        projectId: '12345', // Auto-filled example
        projectName: 'Project Alpha', // Auto-filled example
        date: '',
        hasEnoughMaterial: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAllocate = () => {
        console.log('Material Allocated:', formData);
    };

    const handleContactManager = () => {
        console.log('Contacting Project Manager for:', formData.projectName);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Allocate Materials & Equipment</h2>
            <form>
                <div>
                    <label>Project ID:</label>
                    <input type="text" name="projectId" value={formData.projectId} disabled />
                </div>
                <div>
                    <label>Project Name:</label>
                    <input type="text" name="projectName" value={formData.projectName} disabled />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Have Enough Material?</label>
                    <input
                        type="checkbox"
                        checked={formData.hasEnoughMaterial}
                        onChange={() => setFormData({ ...formData, hasEnoughMaterial: !formData.hasEnoughMaterial })}
                    />
                    <span style={{ marginLeft: '8px' }}>Allocate</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    {formData.hasEnoughMaterial ? (
                        <button type="button" onClick={handleAllocate} style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Allocate
                        </button>
                    ) : (
                        <div>
                            <p style={{ color: '#dc3545', fontWeight: 'bold' }}>Low inventory?</p>
                            <button type="button" onClick={handleContactManager} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Contact Project Manager
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AllocateMaterial;
