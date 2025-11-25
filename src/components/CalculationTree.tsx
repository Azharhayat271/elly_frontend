import React, { useState, useEffect } from 'react';
import { calculationsAPI } from '../api';
import { Calculation } from '../types';
import { useAuth } from '../AuthContext';
import CalculationNode from './CalculationNode';

const CalculationTree: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStartForm, setShowStartForm] = useState(false);
  const [startNumber, setStartNumber] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchCalculations = async () => {
    try {
      const data = await calculationsAPI.getAll();
      setCalculations(data);
      setError('');
    } catch (err) {
      setError('Failed to load calculations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, []);

  const handleStartNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitLoading(true);

    try {
      const numValue = parseFloat(startNumber);
      if (isNaN(numValue)) {
        setError('Please enter a valid number');
        return;
      }

      await calculationsAPI.create({ number: numValue });
      setStartNumber('');
      setShowStartForm(false);
      await fetchCalculations();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create starting number');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-secondary">
        Loading calculations...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <div className="px-6 py-6 bg-white border-b border-border">
          <button 
            onClick={() => setShowStartForm(!showStartForm)}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors text-sm shadow-sm"
          >
            {showStartForm ? 'Cancel' : '+ Start New Discussion'}
          </button>

          {showStartForm && (
            <form onSubmit={handleStartNumber} className="flex gap-3 mt-4 max-w-lg">
              <input
                type="number"
                step="any"
                value={startNumber}
                onChange={(e) => setStartNumber(e.target.value)}
                placeholder="Enter starting number"
                required
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
              />
              <button 
                type="submit" 
                disabled={submitLoading}
                className="px-6 py-3 bg-blue text-white rounded-full font-bold hover:bg-blue-hover disabled:bg-gray-300 disabled:text-gray-500 transition-colors text-sm shadow-sm"
              >
                {submitLoading ? 'Creating...' : 'Create'}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 text-red bg-red/5 border border-red/20 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-6">
        {!isAuthenticated && (
          <div className="mb-6 text-center py-4 bg-blue/5 border border-blue/20 rounded-lg">
            <p className="text-secondary text-sm">
              You are viewing in read-only mode. Please login to create discussions.
            </p>
          </div>
        )}
        {calculations.length === 0 ? (
          <div className="text-center py-16 text-secondary bg-white border border-border rounded-xl shadow-sm">
            <p className="text-lg">No discussions yet. Start a new one!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {calculations.map((calc, index) => {
              return (
                <div key={calc.id} className="bg-white border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-r from-blue/5 to-purple/5 border-b border-border px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary">Discussion #{index + 1}</h3>
                          <p className="text-xs text-secondary">Started by {calc.username} • {new Date(calc.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <CalculationNode
                      calculation={calc}
                      onCalculationAdded={fetchCalculations}
                      isRoot={true}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationTree;
