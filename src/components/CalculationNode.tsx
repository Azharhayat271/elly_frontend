import React, { useState } from 'react';
import { Calculation, OperationType } from '../types';
import { calculationsAPI } from '../api';
import { useAuth } from '../AuthContext';

interface CalculationNodeProps {
  calculation: Calculation;
  onCalculationAdded: () => void;
  isRoot?: boolean;
}

const CalculationNode: React.FC<CalculationNodeProps> = ({ 
  calculation, 
  onCalculationAdded,
  isRoot = false,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [operation, setOperation] = useState<OperationType>(OperationType.ADD);
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const numValue = parseFloat(number);
      if (isNaN(numValue)) {
        setError('Please enter a valid number');
        return;
      }

      await calculationsAPI.create({
        parentId: calculation.id,
        operation,
        number: numValue,
      });

      setNumber('');
      setShowForm(false);
      onCalculationAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add calculation');
    } finally {
      setLoading(false);
    }
  };

  const getOperationEmoji = (op: OperationType | null): string => {
    switch (op) {
      case OperationType.ADD: return '➕';
      case OperationType.SUBTRACT: return '➖';
      case OperationType.MULTIPLY: return '✖️';
      case OperationType.DIVIDE: return '➗';
      default: return '';
    }
  };

  const getInitials = (username: string): string => {
    return username.slice(0, 2).toUpperCase();
  };

  const getGradient = (username: string): string => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-green-400 to-green-600',
      'from-pink-400 to-pink-600',
      'from-orange-400 to-orange-600',
      'from-teal-400 to-teal-600',
    ];
    const index = username.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className={isRoot ? '' : 'border-l-2 border-blue/20 ml-6 pl-6 mt-4'}>
      <div className="hover:bg-hover/50 transition-colors rounded-lg p-4">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getGradient(calculation.username)} flex items-center justify-center text-white font-bold text-sm`}>
              {getInitials(calculation.username)}
            </div>
            <div>
              <div className="font-semibold text-primary text-sm">{calculation.username}</div>
              <div className="text-xs text-secondary">
                {new Date(calculation.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          {calculation.operation ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-secondary font-mono text-xl">{getOperationEmoji(calculation.operation)}</span>
                <span className="font-bold text-primary text-xl">{calculation.number}</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue/10 to-purple/10 px-6 py-2 rounded-lg">
                <span className="text-secondary font-bold">=</span>
                <span className="text-3xl font-bold text-primary">{calculation.result}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-green bg-green/10 px-3 py-1 rounded-full">Starting number</div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green/10 to-blue/10 px-6 py-3 rounded-lg">
                <span className="text-secondary font-bold">=</span>
                <span className="text-4xl font-bold text-primary">{calculation.result}</span>
              </div>
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="flex gap-4 text-sm">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="text-secondary hover:text-blue transition-colors font-medium"
            >
              💬 Reply
            </button>
          </div>
        )}

        {showForm && isAuthenticated && (
          <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex gap-2 mb-3">
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as OperationType)}
                className="px-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-blue text-sm"
              >
                <option value={OperationType.ADD}>➕ Add</option>
                <option value={OperationType.SUBTRACT}>➖ Subtract</option>
                <option value={OperationType.MULTIPLY}>✖️ Multiply</option>
                <option value={OperationType.DIVIDE}>➗ Divide</option>
              </select>
              <input
                type="number"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter number"
                required
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-blue text-sm"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="px-4 py-2 bg-blue text-white rounded-full font-semibold hover:bg-blue-hover disabled:bg-gray-300 disabled:text-gray-500 transition-colors text-sm"
              >
                {loading ? '...' : 'Reply'}
              </button>
            </div>
            {error && (
              <div className="text-red text-xs bg-red/5 border border-red/20 px-3 py-2 rounded">
                {error}
              </div>
            )}
          </form>
        )}
      </div>

      {calculation.children && calculation.children.length > 0 && (
        <div className="mt-2">
          {calculation.children.map((child) => (
            <CalculationNode
              key={child.id}
              calculation={child}
              onCalculationAdded={onCalculationAdded}
              isRoot={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CalculationNode;
